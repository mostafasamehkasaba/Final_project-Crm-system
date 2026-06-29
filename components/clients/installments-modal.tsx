"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Clock, Calendar, BadgeDollarSign } from "lucide-react";
import { Client, Installment } from "@/interfaces/client.interface";
import { updateInstallmentStatus } from "@/services/client.service";

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

  const handleStatusToggle = async (installment: Installment) => {
    setUpdatingId(installment._id);
    setModalError(null);
    
    // عكس الحالة الحالية
    const newStatus = installment.status === "PAID" ? "PENDING" : "PAID";

    try {
      await updateInstallmentStatus(client._id, installment._id, newStatus);
      onRefresh(); // إعادة جلب البيانات لتحديث الصفحة والعدادات والكرت الرئيسي
    } catch (err: unknown) {
      setModalError(err instanceof Error ? err.message : "فشل في تحديث حالة القسط");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-900">
              جدول أقساط: {client.user_id?.name ?? "عميل غير معروف"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              عقار: {client.property_id?.title ?? "غير محدد"} | المتبقي المطلوب: {(client.totalPrice - client.downPayment).toLocaleString("ar-EG")} ج.م
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {modalError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
              {modalError}
            </p>
          )}

          {client.installments.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <BadgeDollarSign className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-medium">لم يتم إدراج خطة أقساط لهذا العقد بعد.</p>
            </div>
          ) : (
            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-right border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
                    <th className="p-3">مبلغ القسط</th>
                    <th className="p-3">تاريخ الاستحقاق</th>
                    <th className="p-3 text-center">الحالة</th>
                    <th className="p-3 text-center">الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {client.installments.map((inst, index) => {
                    const isPaid = inst.status === "PAID";
                    return (
                      <tr key={inst._id} className="border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors">
                        <td className="p-3 font-semibold text-gray-800">
                          {inst.amount.toLocaleString("ar-EG")} ج.م
                        </td>
                        <td className="p-3 text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {new Date(inst.dueDate).toLocaleDateString("ar-EG", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              isPaid
                                ? "bg-green-50 text-green-700 border-green-100"
                                : "bg-amber-50 text-amber-700 border-amber-100"
                            }`}
                          >
                            {isPaid ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {isPaid ? "مدفوع" : "قيد الانتظار"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            disabled={updatingId === inst._id}
                            onClick={() => handleStatusToggle(inst)}
                            className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors shadow-sm disabled:opacity-50 ${
                              isPaid
                                ? "bg-white text-amber-600 border-amber-200 hover:bg-amber-50"
                                : "bg-green-600 text-white border-transparent hover:bg-green-700"
                            }`}
                          >
                            {updatingId === inst._id ? (
                              <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : isPaid ? (
                              "تحويل لقيد الانتظار"
                            ) : (
                              "تعيين كمدفوع"
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-2xl flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-medium px-4 py-2 rounded-xl text-sm transition-colors shadow-sm"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
}