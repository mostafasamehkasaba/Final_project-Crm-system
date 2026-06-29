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
      {/* Image Section */}
      <div className="relative">
        <Link href={`/products/${property._id}`}>
          <Image
            src={property.images[0]}
            alt={property.title}
            width={300}
            height={220}
            className="
              w-full
              object-cover
              group-hover:scale-110
              transition-transform
              duration-700
            "
          />
          {/* Premium overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* تم الحفاظ على زر المفضلة والـ Logic الخاص بك هنا بالكامل */}
        <button
          type="button"
          aria-label="Save to wishlist"
          onClick={handleFavoriteButtonClick}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow hover:bg-white transition-colors"
        >
          <Heart
            className={
              propertyIsFavorite
                ? "w-4 h-4 text-red-500 fill-red-500 transition-colors"
                : "w-4 h-4 text-gray-500 hover:text-red-500 transition-colors"
            }
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5">
        {/* Title + Rating */}
        <div className="flex items-center justify-between mb-1">
          <Link href={`/products/${property._id}`}>
            <h3 className="font-bold text-lg text-slate-800 line-clamp-1">
              {property.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">
              {property.ratingsAverage}
            </span>
          </div>
        </div>

        {/* Price */}
        <p className="text-2xl font-bold text-orange-500 mt-3">
          ${property.price.toLocaleString()}
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
              mt-5
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
            احجز وحدتك
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
