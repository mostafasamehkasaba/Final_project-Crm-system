"use client";
import Image from "next/image";
import { Property } from "@/types/properites";
import { Bath, BedDouble, MapPin, Maximize2 } from "lucide-react";

export default function PropertyCard({ property }: { property: Property }) {
  const area = property.features?.find(f => f.filterName === 'المساحة')?.value;
  const beds = property.features?.find(f => f.filterName === 'عدد الغرف')?.value;
  const baths = property.features?.find(f => f.filterName === 'عدد الحمامات')?.value;

  return (
    <div className="w-80 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-56 w-full">
        <Image
          src={property.images?.[0] || '/placeholder.jpg'}
          alt={property.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-3 right-3 bg-white/90 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {property.location}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-4 text-sm text-neutral-500 mb-2">
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5" />
            {area} متر
          </span>
          <span className="flex items-center gap-1">
            <BedDouble className="w-3.5 h-3.5" />
            {beds}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-3.5 h-3.5" />
            {baths}
          </span>
        </div>
        <h3 className="font-semibold text-lg text-neutral-900">{property.title}</h3>
        <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{property.description}</p>
        <p className="mt-3 font-semibold text-neutral-900">{property.price.toLocaleString()} جنيه</p>
      </div>
    </div>
  );
}