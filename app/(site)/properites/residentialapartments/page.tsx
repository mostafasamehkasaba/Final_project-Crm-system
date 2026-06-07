"use client";
import { useState } from "react";
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

const filtered = properties.filter((p) => {
  const matchType     = filters.type === "الكل"     || p.type === filters.type;
  const matchBeds     = filters.beds === "الكل"     || p.beds === filters.beds;
  const matchLocation = filters.location === "الكل" || p.location.trim() === filters.location.trim();
  const matchBook     = filters.bookType === "الكل" || p.bookType === filters.bookType;
  const matchSearch   = searchText === ""            ||
    p.title.includes(searchText) ||
    p.location.includes(searchText);

  return matchType && matchBeds && matchLocation && matchBook && matchSearch;
});

  return (
    <div className='w-full min-h-screen'>

      
      <div className='w-full flex flex-col gap-3 justify-center items-center font-bold h-[150px]'>
        <h3 className='text-2xl'>ابحث عن شقة أحلامك هنا</h3>
        <p className='w-full text-amber-950 text-center'>
          لأنك تستحق المساحة التي تمنحك الراحة والأمان، وفرنا لك تشكيلة واسعة من الشقق المميزة
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 my-4">
        <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent w-full" />
      </div>

      <SearchBar
        filters={filters}
        setFilters={handleSetFilters}        
        searchText={searchText}
        setSearchText={handleSetSearchText}  
      />

  
      <PropertyList properties={filtered} />

    </div>
  );
}
