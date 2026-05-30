import Image from "next/image";
import { Heart, Star, MapPin } from "lucide-react";
import { IProperty } from "@/interfaces/property.interface";

function PropertyDetailsCard({ property }: { property: IProperty }) {
  return (
    <section className="py-10 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-[350px] lg:h-full">
            <Image
              src={property.imageCover}
              alt={property.title}
              fill
              className="object-cover"
            />

            <button className="absolute top-5 right-5 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow">
              <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              {/* Title */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="text-3xl font-bold text-gray-900">
                  {property.title}
                </h1>

                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-sm">
                    {property.ratingsAverage}
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-500 mb-6">
                <MapPin className="w-4 h-4" />
                <span>Cairo, Egypt</span>
              </div>

              {/* Price */}
              <h2 className="text-4xl font-bold text-orange-500 mb-8">
                ${property.price.toLocaleString()}
              </h2>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Description</h3>

                <p className="text-gray-600 leading-7">
                  {property.description}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold transition">
                Contact Agent
              </button>

              <button className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 rounded-2xl font-semibold transition">
                Schedule Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyDetailsCard;
