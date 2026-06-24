"use client";

import { useState, useMemo } from "react";
import { properties } from "@/data/properites";
import { Filters } from "@/interfaces/filters";
import SearchBar from "@/components/Residential apartments/searchBar";
import PropertyList from "@/components/Residential apartments/propertyList";
import Pagenation from "@/components/pagenation";

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

      // Some property objects may not have a `beds` field; check safely
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
  };

  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      <div className="w-full flex flex-col gap-3 justify-center items-center font-bold h-[150px]">
        <h3 className="text-2xl">ابحث عن شقة أحلامك هنا</h3>
        <p className="w-full text-amber-950 text-center">
          لأنك تستحق المساحة التي تمنحك الراحة والأمان، وفرنا لك تشكيلة واسعة من
          الشقق المميزة
        </p>
      </div>

      {/* Divider */}
      <div className="w-full max-w-7xl mx-auto px-6 my-4">
        <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent w-full" />
      </div>

      {/* Search */}
      <SearchBar
        filters={filters}
        setFilters={setFilters}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {/* List */}
      <PropertyList properties={paginatedProperties} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagenation
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
