"use client"
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { InvoiceData } from "../../interfaces/invoice";


export const columns : ColumnDef<InvoiceData>[] =[
    {
        accessorKey :"invoiceNumber",
        header :"رقم الفاتوره",
        cell: ({ row }) => <span className="font-bold text-green-600">{row.getValue("invoiceNumber")}</span>,

    },
    {
    accessorKey: "customerName",
    header: "العميل",
    cell: ({ row }) => {
      const name = row.getValue("customerName") as string;
      const firstLetter = name.charAt(0);
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
    cell: ({ row }) => <span>{Number(row.getValue("total")).toLocaleString()} ر.س</span>,
  },
{
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const config: Record<string, { label: string; css: string }> = {
        paid: { label: "مدفوعة", css: "bg-green-50 text-green-600 border border-green-100" },
        partial: { label: "جزئية", css: "bg-orange-50 text-orange-600 border border-orange-100" },
        overdue: { label: "معلقة", css: "bg-blue-50 text-blue-600 border border-blue-100" },
      };
      const current = config[status] || { label: status, css: "bg-gray-50 text-gray-600" };
      return <span className={`px-3 py-1 rounded-full text-xs font-medium ${current.css}`}>{current.label}</span>;
    },
  },
  {
    id: "actions",
    header: "إجراءات",
    cell: () => <button className="text-gray-400 hover:text-gray-600 cursor-pointer"><MoreHorizontal size={18} /></button>,
  },

]