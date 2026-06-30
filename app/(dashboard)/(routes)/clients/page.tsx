"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Plus,
  X,
  Trash2,
  Eye,
  Users,
  DollarSign,
  Clock,
  Coins,
  HandCoins,
  AlertCircle,
} from "lucide-react";
import TableFilters from "@/components/clients/table-filters";
import InstallmentsModal from "@/components/clients/installments-modal";
import {
  getClients,
  createClient,
  deleteClient,
} from "@/services/client.service";
import {
  Client,
  ClientFilterTab,
  ClientFormState,
  InstallmentInput,
  EMPTY_CLIENT_FORM,
  InstallmentStatus,
} from "@/interfaces/client.interface";

// ─── Local Types ─────────────────────────────────────────────────────────────

interface InstallmentRow {
  amount: string;
  dueDate: string;
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function ClientsPage() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<ClientFilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isInstallmentsModalOpen, setIsInstallmentsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [formData, setFormData] = useState<ClientFormState>(EMPTY_CLIENT_FORM);
  const [formInstallments, setFormInstallments] = useState<InstallmentRow[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);

  // ── Data Fetching ──────────────────────────────────────────────────────────

  const fetchClients = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      setError(null);
      try {
        const result = await getClients(activeTab, signal);
        setClients(result);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(
          err instanceof Error
            ? err.message
            : "حدث خطأ غير متوقع أثناء جلب البيانات"
        );
        setClients([]);
      } finally {
        setLoading(false);
      }
    },
    [activeTab]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchClients(controller.signal);
    return () => controller.abort();
  }, [fetchClients]);

  // ── Derived State ──────────────────────────────────────────────────────────

  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return clients;
    const query = searchQuery.trim().toLowerCase();
    return clients.filter((client) => {
      const name = client.user_id?.name?.toLowerCase() ?? "";
      const title = client.property_id?.title?.toLowerCase() ?? "";
      return name.includes(query) || title.includes(query);
    });
  }, [clients, searchQuery]);

  const stats = useMemo(
    () => ({
      total: filteredClients.length,
      contracts: filteredClients.reduce(
        (sum, c) => sum + (c.totalPrice ?? 0),
        0
      ),
      remaining: filteredClients.reduce(
        (sum, c) => sum + ((c.totalPrice ?? 0) - (c.downPayment ?? 0)),
        0
      ),
    }),
    [filteredClients]
  );

  // ── Modal Handlers ─────────────────────────────────────────────────────────

  const handleOpenInstallments = (client: Client) => {
    setSelectedClient(client);
    setIsInstallmentsModalOpen(true);
  };

  const handleCloseInstallments = () => {
    setIsInstallmentsModalOpen(false);
    setSelectedClient(null);
  };

  // ── Form Handlers ──────────────────────────────────────────────────────────

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInstallmentChange = (
    index: number,
    field: keyof InstallmentRow,
    value: string
  ) => {
    setFormInstallments((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addInstallmentRow = () => {
    setFormInstallments((prev) => [...prev, { amount: "", dueDate: "" }]);
  };

  const removeInstallmentRow = (index: number) => {
    setFormInstallments((prev) => prev.filter((_, i) => i !== index));
  };

  const resetCreateForm = () => {
    setFormData(EMPTY_CLIENT_FORM);
    setFormInstallments([]);
    setError(null);
  };

  // ── Create Client ──────────────────────────────────────────────────────────

  const handleCreateClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const totalPrice = Number(formData.totalPrice);
    const downPayment = Number(formData.downPayment);

    if (!formData.user_id.trim() || !formData.property_id.trim()) {
      setError("يرجى إدخال معرف العميل ومعرف العقار");
      return;
    }
    if (isNaN(totalPrice) || totalPrice <= 0) {
      setError("يرجى إدخال إجمالي قيمة عقد صحيحة");
      return;
    }
    if (downPayment < 0 || downPayment > totalPrice) {
      setError("المقدم لا يمكن أن يتجاوز إجمالي قيمة العقد");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const installments: InstallmentInput[] = formInstallments.map((inst) => ({
        amount: Number(inst.amount),
        dueDate: inst.dueDate,
        status: "PENDING" as InstallmentStatus,
        paidAt: null,
      }));

      // ✅ استخدام النوع الصحيح مباشرة (تم إزالة as any)
      await createClient({
        user_id: formData.user_id,
        property_id: formData.property_id,
        totalPrice,
        downPayment,
        notes: formData.notes,
        installments,
      });

      setIsCreateModalOpen(false);
      resetCreateForm();
      await fetchClients();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "فشل في إضافة العميل، يرجى المحاولة مرة أخرى"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete Client ──────────────────────────────────────────────────────────

  const handleDeleteClient = async (clientId: string) => {
    const confirmed = window.confirm(
      "هل أنت متأكد من حذف هذا العميل وجميع أقساطه؟"
    );
    if (!confirmed) return;

    setDeleteLoadingId(clientId);
    setError(null);

    try {
      await deleteClient(clientId);
      await fetchClients();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "فشل في حذف العميل");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  return (
    <div className="p-6 space-y-7 bg-gray-50/50 min-h-screen" dir="rtl">
      {/* Page Header */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            إدارة عقود العملاء
          </h1>
          <p className="text-sm text-gray-500">
            لوحة تحكم ذكية لمتابعة التدفقات المالية وحالات الأقساط.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          إضافة عميل جديد
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between gap-3"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700 shrink-0"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <TableFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={(tab) => setActiveTab(tab as ClientFilterTab)}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          icon={<Users className="w-6 h-6" />}
          iconBg="bg-blue-50 text-blue-600"
          label="إجمالي العقود المجلوبة"
          value={stats.total.toString()}
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6" />}
          iconBg="bg-emerald-50 text-emerald-600"
          label="قيمة التعاقدات الحالية"
          value={`${stats.contracts.toLocaleString("ar-EG")} ج.م`}
          valueColor="text-emerald-600"
        />
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          iconBg="bg-amber-50 text-amber-600"
          label="مستحقات قيد التحصيل"
          value={`${stats.remaining.toLocaleString("ar-EG")} ج.م`}
          valueColor="text-amber-600"
        />
      </div>

      {/* Client Cards Grid */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-72 gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-emerald-600 border-t-transparent" />
          <p className="text-sm text-gray-400 font-medium animate-pulse">
            جاري تحديث البيانات المباشرة...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredClients.map((client) => (
            <ClientCard
              key={client._id}
              client={client}
              isDebtRoute={activeTab === "debt"}
              onViewInstallments={handleOpenInstallments}
              onDelete={handleDeleteClient}
              isDeleting={deleteLoadingId === client._id}
            />
          ))}

          {filteredClients.length === 0 && (
            <div className="col-span-full bg-white rounded-xl border border-dashed border-gray-200 text-center py-16 flex flex-col justify-center items-center gap-2">
              <p className="text-gray-400 font-medium text-sm">
                لا توجد عقود مطابقة في هذه القائمة حالياً
              </p>
            </div>
          )}
        </div>
      )}

      {/* Installments Modal */}
      <InstallmentsModal
        isOpen={isInstallmentsModalOpen}
        onClose={handleCloseInstallments}
        client={selectedClient}
        onRefresh={fetchClients}
      />

      {/* Create Client Modal */}
      {isCreateModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => {
            setIsCreateModalOpen(false);
            resetCreateForm();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-modal-title"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
              <h2 id="create-modal-title" className="text-xl font-bold text-gray-800">
                إضافة عميل جديد
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  resetCreateForm();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="إغلاق النافذة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateClient} className="p-6 space-y-4 overflow-y-auto">
              <FormField label="معرف العميل" required>
                <input
                  type="text"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 text-sm"
                  placeholder="أدخل معرف العميل"
                  required
                />
              </FormField>

              <FormField label="معرف العقار" required>
                <input
                  type="text"
                  name="property_id"
                  value={formData.property_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 text-sm"
                  placeholder="أدخل معرف العقار"
                  required
                />
              </FormField>

              <FormField label="إجمالي قيمة العقد" required>
                <input
                  type="number"
                  name="totalPrice"
                  value={formData.totalPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 text-sm"
                  placeholder="مثال: 500000"
                  min={1}
                  required
                />
              </FormField>

              <FormField label="المقدم المدفوع">
                <input
                  type="number"
                  name="downPayment"
                  value={formData.downPayment}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 text-sm"
                  placeholder="مثال: 100000"
                  min={0}
                />
              </FormField>

              <FormField label="ملاحظات (اختياري)">
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 text-sm resize-none"
                  rows={2}
                  placeholder="أي ملاحظات إضافية..."
                />
              </FormField>

              {/* Installments Section */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">الأقساط</label>
                  <button
                    type="button"
                    onClick={addInstallmentRow}
                    className="text-sm bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-lg transition-colors"
                  >
                    + إضافة قسط
                  </button>
                </div>

                {formInstallments.length === 0 ? (
                  <p className="text-sm text-gray-400">لا توجد أقساط مضافة بعد</p>
                ) : (
                  <div className="space-y-2">
                    {formInstallments.map((inst, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="المبلغ"
                          value={inst.amount}
                          onChange={(e) => handleInstallmentChange(index, "amount", e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 text-sm"
                          min={1}
                          required
                        />
                        <input
                          type="date"
                          value={inst.dueDate}
                          onChange={(e) => handleInstallmentChange(index, "dueDate", e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 text-sm"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => removeInstallmentRow(index)}
                          className="text-red-500 hover:text-red-700 p-2 transition-colors shrink-0"
                          aria-label="حذف القسط"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors mt-4"
              >
                {submitting ? "جاري الإضافة..." : "إضافة العميل"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-Components ───────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  valueColor?: string;
}

function StatCard({
  icon,
  iconBg,
  label,
  value,
  valueColor = "text-gray-800",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 flex items-center gap-4 hover:border-gray-200 transition-all">
      <div className={`p-3 rounded-lg shrink-0 ${iconBg}`}>{icon}</div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider truncate">{label}</p>
        <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
      </div>
    </div>
  );
}

interface ClientCardProps {
  client: Client;
  isDebtRoute: boolean;
  onViewInstallments: (client: Client) => void;
  onDelete: (clientId: string) => void;
  isDeleting: boolean;
}

function ClientCard({
  client,
  isDebtRoute,
  onViewInstallments,
  onDelete,
  isDeleting,
}: ClientCardProps) {
  const installments = client.installments ?? [];
  const hasUnpaid = installments.some((inst) => inst.status === "PENDING");
  const allPaid = installments.length > 0 && installments.every((inst) => inst.status === "PAID");

  let badgeColor = "bg-amber-50 text-amber-700 border-amber-100";
  let badgeText = "متبقي أقساط";

  if (allPaid) {
    badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-100";
    badgeText = "ملتزم بالكامل";
  } else if (isDebtRoute || hasUnpaid) {
    badgeColor = "bg-rose-50 text-rose-700 border-rose-100";
    badgeText = "متعثر في السداد";
  }

  const remaining = (client.totalPrice ?? 0) - (client.downPayment ?? 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
      <div className="flex justify-between items-start border-b border-gray-50 pb-3 gap-2">
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors truncate">
            {client.user_id?.name ?? "اسم غير معروف"}
          </span>
          <span className="text-xs text-gray-500 truncate">
            {client.property_id?.title ?? "عقار غير محدد"}
          </span>
        </div>
        <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md border shrink-0 ${badgeColor}`}>
          {badgeText}
        </span>
      </div>

      <div className="space-y-3 py-3">
        <FinanceRow
          icon={<Coins className="w-3.5 h-3.5" />}
          label="إجمالي قيمة العقد"
          value={`${(client.totalPrice ?? 0).toLocaleString("ar-EG")} ج.م`}
          valueClass="font-semibold text-gray-700"
        />
        <FinanceRow
          icon={<HandCoins className="w-3.5 h-3.5" />}
          label="المقدم المدفوع"
          value={`+${(client.downPayment ?? 0).toLocaleString("ar-EG")} ج.م`}
          valueClass="font-medium text-emerald-600"
        />
        <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-100">
          <span className="text-gray-500 font-medium text-xs flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            المتبقي المطلوب
          </span>
          <span className={`font-bold ${remaining > 0 ? "text-rose-600" : "text-emerald-600"}`}>
            {remaining.toLocaleString("ar-EG")} ج.م
          </span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onViewInstallments(client)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium text-xs py-2.5 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5 active:scale-[0.98]"
        >
          <Eye className="w-3.5 h-3.5" />
          تفاصيل الأقساط
        </button>

        <button
          type="button"
          onClick={() => onDelete(client._id)}
          disabled={isDeleting}
          className="px-4 py-2.5 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          title="حذف العميل"
        >
          {isDeleting ? (
            <span className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Trash2 className="w-3.5 h-3.5" />
          )}
          حذف
        </button>
      </div>
    </div>
  );
}

interface FinanceRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass: string;
}

function FinanceRow({ icon, label, value, valueClass }: FinanceRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400 text-xs flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

function FormField({ label, required, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 mr-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}