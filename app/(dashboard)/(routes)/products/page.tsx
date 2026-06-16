//

"use client";

import React, { useState } from "react";
import PropertyList from "@/components/produsts/PropertyList";
import { properties } from "@/data/properites";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentData = properties.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="space-y-10">
      <button className="px-4 cursor-pointer py-2 mb-0 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800">
        <Link href={"products/create"}> اضافه عقار جديد</Link>
      </button>

      {/* LIST */}
      <PropertyList properties={currentData} />

      {/* PAGINATION */}
      <Pagination>
        <PaginationContent>
          {/* Prev */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(currentPage - 1)}
              className="cursor-pointer"
            />
          </PaginationItem>

          {/* Pages */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => goToPage(page)}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={() => goToPage(currentPage + 1)}
              className="cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
