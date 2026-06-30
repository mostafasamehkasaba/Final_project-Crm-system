import React from "react";
import { Property } from "@/types/properites";
import PropertyCard from "./PropertyCard";

export default function PropertyList({
  properties,
}: {
  properties: Property[];
}) {
  if (properties.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center mt-20 gap-3">
        <p className="text-neutral-400 text-lg">لا توجد نتائج</p>
      </div>
    );
  }

  return (
    // 🟢 التعديل هنا: أضفنا w-full و max-w-7xl مع mx-auto عشان يمسك الشاشة صح
    // الـ grid-cols متقسمة لكل الشاشات: موبايل (1)، تابلت (2)، شاشات متوسطة (3)، شاشات كبيرة (4)
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 py-5">
      {properties.map((p, idx) => (
        <PropertyCard key={idx} property={p} />
      ))}
    </div>
  );
}