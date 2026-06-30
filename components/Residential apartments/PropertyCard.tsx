"use client";
import Image from "next/image";
import { Property } from "@/types/properites";
import { Bath, BedDouble, MapPin, Maximize2 } from "lucide-react";

export default function PropertyCard({ property }: { property: Property }) {
  const area = property.features?.find(f => f.filterName === 'المساحة')?.value;
  const beds = property.features?.find(f => f.filterName === 'عدد الغرف')?.value;
  const baths = property.features?.find(f => f.filterName === 'عدد الحمامات')?.value;

  return (
    // 🟢 تم استبدال w-80 بـ w-full ليكون مرناً و Responsive بالكامل
    <div className="w-full rounded-2xl overflow-hidden bg-white border border-zinc-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="relative h-56 w-full bg-zinc-100">
        <Image
          src={property.images?.[0] || '/placeholder.jpg'}
          alt={property.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-xs text-zinc-800">
          <MapPin className="w-3 h-3 text-orange-500" />
          {property.location}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 mb-2">
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-zinc-400" />
              {area} متر
            </span>
            <span className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-zinc-400" />
              {beds} غرف
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-zinc-400" />
              {baths} حمام
            </span>
          </div>
          <h3 className="font-bold text-base text-zinc-900 line-clamp-1">{property.title}</h3>
          <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">{property.description}</p>
        </div>
        
        {/* السعر في الأسفل مع تظبيطة ألوان خفيفة */}
        <p className="mt-2 font-black text-orange-500 text-sm">
          {property.price.toLocaleString()} جنيه
        </p>
      </div>
    </div>
  );
}