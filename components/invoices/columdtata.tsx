"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { IInvoice } from "@/interfaces/invoice"; // التايب الموحد الجديد

export const columns: ColumnDef<IInvoice>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "رقم الفاتورة",
    cell: ({ row }) => (
      <span className="font-bold text-green-600">
        {row.getValue("invoiceNumber") || "---"}
      </span>
    ),
  },
{
    accessorKey: "customerName", // هنسيب الـ key ده للـ Column ID
    header: "العميل",
    cell: ({ row }) => {
      const invoice = row.original as any; 
      
      // محاولة قراءة الاسم بأكثر من طريقة حسب الـ Populate اللي راجع من الـ API
      const name = 
        invoice.customer_id?.name || 
        invoice.customer_id?.user_id?.name || 
        invoice.customerName || 
        "عميل غير معرف";

      const firstLetter = name ? name.charAt(0) : "ع";
      
      return (
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
            {firstLetter}
          </span>
          <span className="text-gray-700 font-medium">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: "الإجمالي",
    cell: ({ row }) => {
      const total = Number(row.getValue("total")) || 0;
      return <span className="font-medium text-gray-800">{total.toLocaleString()} ج.م</span>;
    },
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => {
      const status = (row.getValue("status") as string || "").toUpperCase(); // تحويلها لكابيتال للأمان
      
      // التوافق التام مع الـ Schema والـ Database
      const config: Record<string, { label: string; css: string }> = {
        PAID: { label: "مدفوعة", css: "bg-green-50 text-green-600 border border-green-100" },
        PARTIAL: { label: "جزئية", css: "bg-orange-50 text-orange-600 border border-orange-100" },
        UNPAID: { label: "معلقة / غير مدفوعة", css: "bg-red-50 text-red-600 border border-red-100" },
        OVERDUE: { label: "متأخرة", css: "bg-red-50 text-red-600 border border-red-100" },
      };

      // حل أزمة الـ undefined: لو الحالة مش متسجلة يديله شكل رمادي افتراضي ميكسرش الصفحة
      const current = config[status] || { label: status || "غير محدد", css: "bg-gray-50 text-gray-600 border border-gray-100" };
      
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${current.css}`}>
          {current.label}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "إجراءات",
    cell: () => (
      <button className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded hover:bg-gray-50 transition-colors">
        <MoreHorizontal size={18} />
      </button>
    ),
  },
];