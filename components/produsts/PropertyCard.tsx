import { MapPin, Bath, BedDouble, Maximize2 } from "lucide-react";
import Image from "next/image";
import { Property } from "@/types/properites";
import Link from "next/link";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="  rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-56 w-full">
        <Image
          src={property.image}
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
            {property.area} متر
          </span>
          <span className="flex items-center gap-1">
            <BedDouble className="w-3.5 h-3.5" />
            {property.beds}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-3.5 h-3.5" />
            {property.baths}
          </span>
        </div>
        <h3 className="font-semibold text-lg text-neutral-900">
          {property.title.split(" ").slice(0, 2).join(" ")}
        </h3>
        <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
          {property.description}
        </p>
        <p className="mt-3 font-semibold text-neutral-900">
          {property.price.toLocaleString()} جنيه
        </p>
        <div className="mt-5 cursor-pointer ps-4 py-1 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-2xl">
          <Link href={`products/${property.id}`}>تفاصيل العقار</Link>
        </div>
        <div className="mt-2 cursor-pointer ps-4 py-1 bg-yellow-700 hover:bg-yellow-800 text-white font-semibold rounded-2xl">
          <Link href={`products/update/${property.id}`}>تعديل العقار</Link>
        </div>
      </div>
    </div>
  );
}
