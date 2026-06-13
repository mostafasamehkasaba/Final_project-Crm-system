"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Download,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import InvoiceTable from "@/components/invoices/InvoiceTable";

type InvoiceStatus = "paid" | "partial" | "overdue";

type Invoice = {
  id: string;
  invoiceNumber: string;
  date: string;
  customerName: string;
  total: number;
  paid: number;
  remaining: number;
  status: InvoiceStatus;
};

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    date: "2024/04/15",
    customerName: "شركة الأفق للتقنية",
    total: 12500,
    paid: 12500,
    remaining: 0,
    status: "paid",
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    date: "2024/04/18",
    customerName: "مؤسسة النور التجارية",
    total: 8750,
    paid: 4000,
    remaining: 4750,
    status: "partial",
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-003",
    date: "2024/04/20",
    customerName: "متجر الرياض الإلكتروني",
    total: 33200,
    paid: 0,
    remaining: 33200,
    status: "overdue",
  },
  {
    id: "4",
    invoiceNumber: "INV-2024-004",
    date: "2024/04/22",
    customerName: "مكتبة ومطبعة النجاح",
    total: 1500,
    paid: 1500,
    remaining: 0,
    status: "paid",
  },
];

export default function InvoicesList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");

  const statuses = [
    { label: "الكل", value: "all", count: mockInvoices.length },
    {
      label: "مدفوعة",
      value: "paid",
      count: mockInvoices.filter((i) => i.status === "paid").length,
    },
    {
      label: "جزئية",
      value: "partial",
      count: mockInvoices.filter((i) => i.status === "partial").length,
    },
    {
      label: "متأخرة",
      value: "overdue",
      count: mockInvoices.filter((i) => i.status === "overdue").length,
    },
  ];

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesStatus =
      activeStatus === "all" || invoice.status === activeStatus;

    const query = searchQuery.toLowerCase();

    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(query) ||
      invoice.customerName.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  return (
    <div dir="rtl" className="p-6 bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">الفواتير</h1>
          <p className="text-gray-500">إدارة وتتبع جميع فواتير المبيعات</p>
        </div>

        <Link
          href="/invoices/newinvoices"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium"
        >
          <Plus size={20} />
          إنشاء فاتورة جديدة
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="إجمالي الفواتير"
          value={mockInvoices.length.toString()}
          icon={<FileText className="text-blue-500" />}
        />

        <StatCard
          title="مدفوعة"
          value={
            statuses.find((s) => s.value === "paid")?.count.toString() || "0"
          }
          icon={<CheckCircle2 className="text-green-500" />}
          color="bg-green-50"
        />

        <StatCard
          title="جزئية"
          value={
            statuses.find((s) => s.value === "partial")?.count.toString() ||
            "0"
          }
          icon={<Clock className="text-orange-500" />}
          color="bg-orange-50"
        />

        <StatCard
          title="متأخرة"
          value={
            statuses.find((s) => s.value === "overdue")?.count.toString() ||
            "0"
          }
          icon={<AlertCircle className="text-red-500" />}
          color="bg-red-50"
        />
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-t-xl border-x border-t border-gray-100">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex border-b md:border-none overflow-x-auto">
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => setActiveStatus(status.value)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                  status.value === activeStatus
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {status.label}
                <span className="mr-1 text-xs bg-gray-100 px-1.5 py-0.5 rounded-full text-gray-500">
                  {status.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="relative group">
              <Search
                className="absolute right-3 top-2.5 text-gray-400 group-focus-within:text-green-600 transition-colors"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث برقم الفاتورة أو العميل..."
                className="pr-10 pl-4 py-2 border rounded-lg outline-none focus:border-green-600 w-64 text-sm"
              />
            </div>

            <button className="p-2 border rounded-lg hover:bg-gray-50 text-gray-600 flex items-center gap-2 cursor-pointer">
              <Download size={18} />
              <span className="hidden md:inline text-sm">تصدير</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-b-xl shadow-sm">
        {filteredInvoices.length > 0 ? (
          <InvoiceTable data={filteredInvoices} />
        ) : (
          <div className="min-h-[300px] flex flex-col items-center justify-center text-gray-400 p-8 border-x border-b border-gray-100 rounded-b-xl">
            <div className="p-6 border-2 border-dashed border-gray-100 rounded-full mb-4">
              <FileText size={40} className="opacity-20" />
            </div>
            <p className="text-sm">
              لا توجد فواتير تطابق خيارات البحث الحالية
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* Stat Card */
function StatCard({
  title,
  value,
  icon,
  color = "bg-white",
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: string;
}) {
  return (
    <div className={`${color} p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between`}>
      <div>
        <p className="text-gray-500 text-sm mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className="p-3 bg-white rounded-lg shadow-inner">{icon}</div>
    </div>
  );
}
