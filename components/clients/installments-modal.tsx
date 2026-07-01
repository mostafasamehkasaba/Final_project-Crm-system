import { Client } from '@/interfaces/client.interface';
import { X } from 'lucide-react';
import Cookies from 'js-cookie';
import { useState } from 'react';

interface InstallmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
  onRefresh: () => void;
}

export default function InstallmentsModal({
  isOpen,
  onClose,
  client,
  onRefresh,
}: InstallmentsModalProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  if (!isOpen || !client) return null;

  const installments = client.installments || [];

  // دالة إغلاق المودال مع تنظيف الأخطاء
  const handleClose = () => {
    setModalError(null);
    onClose();
  };

  const handlePayInstallment = async (installmentId: string) => {
    setUpdatingId(installmentId);
    setModalError(null);

    try {
      const token = Cookies.get('admin_token');

      const response = await fetch(
        `https://back-end-crm-project.vercel.app/api/clients/${client._id}/installments/${installmentId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: 'PAID' }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'فشل في تحديث حالة القسط');
      }

      // تحديث البيانات بعد النجاح
      await onRefresh();
    } catch (error) {
      console.error(error);
      setModalError(
        error instanceof Error ? error.message : 'حدث خطأ أثناء تحصيل القسط، يرجى المحاولة مرة أخرى'
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* الرأس */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold text-gray-800 truncate">
            {client.user_id?.name || 'عميل غير معروف'} –{' '}
            {client.property_id?.title || 'عقار غير محدد'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* الجسم */}
        <div className="overflow-y-auto p-6 flex-1">
          {/* عرض الخطأ إن وجد */}
          {modalError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm mb-4">
              {modalError}
            </div>
          )}

          {installments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              لا توجد أقساط مسجلة لهذا العقد
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-right text-gray-500 border-b border-gray-100">
                    <th className="pb-3 font-medium">القسط</th>
                    <th className="pb-3 font-medium">المبلغ</th>
                    <th className="pb-3 font-medium">تاريخ الاستحقاق</th>
                    <th className="pb-3 font-medium">الحالة</th>
                    <th className="pb-3 font-medium">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {installments.map((installment, index) => {
                    const isPaid = installment.status === 'PAID';
                    const isUpdating = updatingId === installment._id;

                    const statusBadge = isPaid
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200';

                    const statusText = isPaid ? 'مدفوع' : 'غير مدفوع';

                    return (
                      <tr
                        key={installment._id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-3 font-medium text-gray-800">
                          قسط رقم {index + 1}
                        </td>
                        <td className="py-3 text-gray-800">
                          {installment.amount.toLocaleString()} ج.م
                        </td>
                        <td className="py-3 text-gray-600">
                          {new Date(installment.dueDate).toLocaleDateString(
                            'ar-EG'
                          )}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusBadge}`}
                          >
                            {statusText}
                          </span>
                        </td>
                        <td className="py-3">
                          {!isPaid ? (
                            <button
                              onClick={() =>
                                handlePayInstallment(installment._id!)
                              }
                              disabled={isUpdating}
                              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
                            >
                              {isUpdating ? 'جاري التحصيل...' : 'تحصيل القسط'}
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs">مكتمل</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* التذييل */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-2xl flex justify-end shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-medium px-4 py-2 rounded-xl text-sm transition-colors shadow-sm"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
}