"use client";

import { useState, useMemo } from "react";
import { properties } from "@/data/properites";
import { Filters } from "@/interfaces/filters";
import SearchBar from "@/components/Residential apartments/searchBar";
import PropertyList from "@/components/Residential apartments/propertyList";
import Pagenation from "@/components/pagenation";
import { Building2, Sparkles } from "lucide-react";

export default function ResidentialApartments() {
  const [filters, setFilters] = useState<Filters>({
    type: "الكل",
    beds: "الكل",
    location: "الكل",
    price: "الكل",
    bookType: "الكل",
  });

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 🔍 Filtering
  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchType = filters.type === "الكل" || p.type === filters.type;

      const propBeds = (p as any).beds ?? (p as any).bedrooms;
      const matchBeds = filters.beds === "الكل" || propBeds === filters.beds;

      const matchLocation =
        filters.location === "الكل" ||
        p.location.trim() === filters.location.trim();

      const matchBook =
        filters.bookType === "الكل" || p.bookType === filters.bookType;

      const matchSearch =
        searchText === "" ||
        p.title.includes(searchText) ||
        p.location.includes(searchText);

      return (
        matchType && matchBeds && matchLocation && matchBook && matchSearch
      );
    });
  }, [filters, searchText]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filtered.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    // سكرول ناعم لأعلى الصفحة عند الانتقال
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // 🟢 جعلنا الخلفية فاتحة راقية متناسقة تماماً مع الثيم الجديد
    <div className="w-full min-h-screen bg-zinc-50/60 text-zinc-900 pb-16 selection:bg-orange-500/10">
      
      {/* Header Section */}
      <div className="w-full max-w-7xl mx-auto pt-32 pb-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Badge ديكوري فوق العنوان */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-medium mb-4">
          <Sparkles className="size-3.5" />
          <span>الشقق السكنية المتاحة</span>
        </div>

        {/* العنوان الرئيسي بخط عريض ونظيف */}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 leading-tight">
          ابحث عن <span className="text-orange-500">شقة أحلامك</span> هنا
        </h1>
        
        {/* الوصف بلون مريح للعين بديل للبني */}
        <p className="mt-3 text-sm sm:text-base text-zinc-500 max-w-2xl leading-relaxed font-medium">
          لأنك تستحق المساحة التي تمنحك الراحة والأمان، وفرنا لك تشكيلة واسعة من الشقق المميزة والمصممة خصيصاً لتناسب تطلعاتك.
        </p>

        {/* تأثير توهج خلفي خفيف جداً يضيف لمسة جمالية */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-400/5 blur-3xl -z-10 pointer-events-none" />
      </div>

      {/* Divider راقي ناعم جداً */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent w-full" />
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Search Bar Wrapper */}
        {/* ملحوظة: تأكد من تعديل الألوان داخل مكوّن SearchBar ليتماشى مع الخلفية البيضاء والبوردر الـ zinc-200 */}
        <div className="w-full">
          <SearchBar
            filters={filters}
            setFilters={setFilters}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </div>

        {/* Property List Section */}
        <div className="pt-4">
          <PropertyList properties={paginatedProperties} />
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-6">
            <Pagenation
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </main>
    </div>
  );
}