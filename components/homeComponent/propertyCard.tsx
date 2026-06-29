"use client";

import Image from "next/image";
import Link from "next/link";

import { MapPin } from "lucide-react";

import { IProperty } from "@/interfaces/property.interface";

interface PropertyCardProps {
  property: IProperty;
}

function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div
      className="
      group
      bg-white
      rounded-3xl
      overflow-hidden
      shadow-sm
      hover:shadow-2xl
      transition-all
      duration-500
      w-full
    "
    >
      {/* Image */}
      <div className="relative">
        <Link key={property._id} href={`/properties/${property._id}`}>
          <Image
            src={property.images[0]}
            alt={property.title}
            width={400}
            height={260}
            className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </Link>

        {/* Status */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold text-white ${
            property.status === "sold" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {property.status === "sold" ? "تم البيع" : "متاح"}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Title */}
        <Link key={property._id} href={`/properties/${property._id}`}>
          <h3 className="text-xl font-bold text-slate-800 line-clamp-1 hover:text-orange-500 transition">
            {property.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-500 mt-2 line-clamp-2">
          {property.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 mt-3 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>
            {property.location}, {property.region}
          </span>
        </div>

        {/* Price */}
        <p className="text-2xl font-bold text-orange-500 mt-4">
          {property.price.toLocaleString()} جنيه
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mt-4">
          {property.features.map((feature) => (
            <span
              key={feature._id}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {feature.filterName}: {feature.value}
            </span>
          ))}
        </div>

        {/* Button */}
        <Link key={property._id} href={`/properties/${property._id}`}>
          <button
            className="
            w-full
            mt-6
            bg-slate-900
            hover:bg-orange-500
            text-white
            py-3
            rounded-2xl
            font-semibold
            transition-all
            duration-300
          "
          >
            عرض التفاصيل
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
