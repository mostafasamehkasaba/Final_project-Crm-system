"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";

import { IProperty } from "@/interfaces/property.interface";
import { useFavorites } from "@/app/(site)/favorites/(FavoritesContext)/FavoritesContext";

interface PropertyCardProps {
  property: IProperty;
}

function PropertyCard({ property }: PropertyCardProps) {
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useFavorites();

  const propertyIsFavorite = isFavorite(property._id);

  const handleFavoriteButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    event.stopPropagation();

    if (propertyIsFavorite) {
      removeFromFavorites(property._id);
      return;
    }

    addToFavorites(property);
  };

  return (
    <div
      className="
        group
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-sm
        hover:shadow-[0_20px_60px_-12px_rgba(249,115,22,0.12)]
        transition-all
        duration-500
        w-full
        border
        border-zinc-100
        hover:border-orange-200/40
      "
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <Link href={`/products/${property._id}`}>
          <Image
            src={property.imageCover}
            alt={property.title}
            width={300}
            height={220}
            className="
              w-full
              aspect-[4/3]
              object-cover
              group-hover:scale-110
              transition-transform
              duration-700
              ease-out
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
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <Heart
            className={
              propertyIsFavorite
                ? "w-4 h-4 text-red-500 fill-red-500 transition-colors duration-200"
                : "w-4 h-4 text-zinc-400 hover:text-red-500 transition-colors duration-200"
            }
          />
        </button>

        {/* Rating badge overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-semibold text-white tabular-nums">
            {property.ratingsAverage}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 pt-4">
        {/* Title */}
        <Link href={`/products/${property._id}`}>
          <h3 className="font-bold text-lg text-zinc-800 line-clamp-1 group-hover:text-orange-600 transition-colors duration-300">
            {property.title}
          </h3>
        </Link>

        {/* Price with gradient styling */}
        <div className="mt-3 flex items-baseline gap-1">
          <p className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
            ${property.price.toLocaleString()}
          </p>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-200 to-transparent my-4" />

        {/* CTA Button */}
        <Link href={`/products/${property._id}`}>
          <button
            className="
              group/cta
              relative
              w-full
              overflow-hidden
              bg-zinc-900
              hover:bg-gradient-to-r
              hover:from-orange-500
              hover:to-amber-600
              text-white
              py-3.5
              rounded-2xl
              font-semibold
              transition-all
              duration-300
              shadow-sm
              hover:shadow-[0_8px_24px_-4px_rgba(249,115,22,0.3)]
            "
          >
            <span className="relative z-10">احجز وحدتك</span>
            {/* Shimmer sweep on hover */}
            <span className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;