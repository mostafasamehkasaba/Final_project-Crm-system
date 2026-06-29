"use client";

import React from "react";
import { Search, ListFilter, AlertTriangle } from "lucide-react";
import { ClientFilterTab } from "@/interfaces/client.interface";

interface TableFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: ClientFilterTab;
  setActiveTab: (tab: ClientFilterTab) => void;
}

export default function TableFilters({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
}: TableFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center w-full" dir="rtl">
      {/* Tabs Navigation */}
      <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all w-full sm:w-auto justify-center ${
            activeTab === "all"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <ListFilter className="w-4 h-4" />
          كل العقود
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("debt")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all w-full sm:w-auto justify-center ${
            activeTab === "debt"
              ? "bg-white text-red-600 shadow-sm"
              : "text-gray-500 hover:text-red-600"
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          قائمة الديون
        </button>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-72">
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث باسم العميل أو العقار..."
          className="w-full pr-9 pl-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white focus:border-transparent transition-all"
        />
      </div>
    </div>
  );
}