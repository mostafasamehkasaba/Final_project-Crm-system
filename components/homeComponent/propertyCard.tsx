import Image from "next/image";

import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { IProperty } from "@/interfaces/property.interface";

function PropertyCard({ property }: { property: IProperty }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md w-full max-w-[280px]">
      {/* Image Section */}
      <div className="relative">
        <Link href={`/products/${property._id}`}>
          <Image
            src={property.imageCover}
            alt={property.title}
            width={280}
            height={200}
            loading="lazy"
            className="w-full h-[180px] object-cover"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          aria-label="Save to wishlist"
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow hover:bg-white transition-colors"
        >
          <Heart className="w-4 h-4 text-gray-500 hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Title + Rating */}
        <div className="flex items-center justify-between mb-1">
          <Link href={`/products/${property._id}`}>
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
              {property.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold text-gray-700">
              {property.ratingsAverage}
            </span>
          </div>
        </div>

        {/* Price */}
        <p className="text-orange-500 font-bold text-lg mb-3">
          ${property.price.toLocaleString()}
        </p>

        {/* CTA Button */}
        <Link href={`/products/${property._id}`}>
          <button className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
            Details
            <span aria-hidden="true">→</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
