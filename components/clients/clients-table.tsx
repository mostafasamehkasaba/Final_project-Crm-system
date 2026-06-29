"use client";

import React from "react";
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Client } from "@/interfaces/client.interface";

interface ClientsTableProps {
  data: Client[];
  onViewInstallments: (client: Client) => void;
  onEdit?: (client: Client) => void;
  onDelete?: (clientId: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function ClientsTable({
  data,
  onViewInstallments,
  onEdit,
  onDelete,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: ClientsTableProps) {
  return (
    <div className="space-y-4" dir="rtl">
      <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b text-sm font-medium text-muted-foreground bg-gray-50">
              <th className="p-3 text-right">العميل</th>
              <th className="p-3 text-right">العقار</th>
              <th className="p-3 text-right">السعر الإجمالي</th>
              <th className="p-3 text-right">المقدم</th>
              <th className="p-3 text-center">الإجراءات</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-8 text-muted-foreground bg-white"
                >
                  لا توجد بيانات متاحة لعرضها.
                </td>
              </tr>
            ) : (
              data.map((client) => (
                <tr
                  key={client._id}
                  className="border-b hover:bg-muted/40 transition-colors bg-white"
                >
                  {/* Client Name + Email */}
                  <td className="p-3 font-medium">
                    <div className="flex flex-col">
                      <span className="text-gray-900">{client.user_id?.name ?? "اسم غير معروف"}</span>
                      <span className="text-xs text-muted-foreground font-normal text-gray-500">
                        {client.user_id?.email ?? "لا يوجد بريد إلكتروني"}
                      </span>
                    </div>
                  </td>

                  {/* Property Title + Base Price */}
                  <td className="p-3 text-muted-foreground">
                    <div className="flex flex-col">
                      <span className="text-foreground font-medium text-gray-900">
                        {client.property_id?.title ?? "عقار غير محدد"}
                      </span>
                      <span className="text-xs text-gray-500">
                        السعر الأساسي:{" "}
                        {client.property_id?.price?.toLocaleString("ar-EG") ?? 0}{" "}
                        ج.م
                      </span>
                    </div>
                  </td>

                  {/* Total Price */}
                  <td className="p-3 font-semibold text-gray-900">
                    {client.totalPrice.toLocaleString("ar-EG")} ج.م
                  </td>

                  {/* Down Payment */}
                  <td className="p-3 text-gray-700">
                    {client.downPayment.toLocaleString("ar-EG")} ج.م
                  </td>

                  {/* Actions */}
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onViewInstallments(client)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="عرض الأقساط"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(client)}
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                          title="تعديل"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(client._id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Row */}
      <div className="flex justify-between items-center text-sm text-muted-foreground px-1">
        <span>عرض {data.length} عملاء</span>
        <div className="flex gap-1">
          <button
            type="button"
            disabled={currentPage <= 1 || !onPageChange}
            onClick={() => onPageChange?.(currentPage - 1)}
            className="p-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-50 transition-colors"
            aria-label="الصفحة السابقة"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <span className="flex items-center px-3 border rounded-md bg-white font-medium text-gray-700">
            {currentPage} من {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages || !onPageChange}
            onClick={() => onPageChange?.(currentPage + 1)}
            className="p-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-50 transition-colors"
            aria-label="الصفحة التالية"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}