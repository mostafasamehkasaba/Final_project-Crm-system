"use client";

import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import { IProperty } from "@/interfaces/property.interface";

export default function PropertyDetailsCard({
  property,
}: {
  property: IProperty;
}) {
  return (
    <section className="py-10 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden grid lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative h-[500px]">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
            />

            <button className="absolute top-5 right-5 bg-white rounded-full p-3 shadow">
              <Heart className="w-5 h-5" />
            </button>

            <span
              className={`absolute left-5 top-5 px-4 py-2 rounded-full text-white ${
                property.status === "sold" ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {property.status === "sold" ? "تم البيع" : "متاح"}
            </span>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold">{property.title}</h1>

              <div className="flex items-center gap-2 text-gray-500 mt-3">
                <MapPin size={18} />
                <span>
                  {property.location} - {property.region}
                </span>
              </div>

              <h2 className="text-4xl font-bold text-orange-500 mt-8">
                {property.price.toLocaleString()} جنيه
              </h2>

              <div className="mt-8">
                <h3 className="font-bold text-2xl mb-3">الوصف</h3>

                <p className="text-gray-600 leading-8">
                  {property.description}
                </p>
              </div>

              <div className="mt-10">
                <h3 className="font-bold text-2xl mb-5">المواصفات</h3>

                <div className="grid grid-cols-2 gap-4">
                  {property.features.map((feature) => (
                    <div key={feature._id} className="border rounded-xl p-4">
                      <p className="text-sm text-gray-500">
                        {feature.filterName}
                      </p>

                      <p className="font-bold text-lg">{feature.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button className="flex-1 bg-orange-500 text-white py-3 rounded-xl">
                تواصل معنا
              </button>

              <button className="flex-1 border rounded-xl py-3">واتساب</button>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {property.images.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {property.images.map((image, index) => (
              <div
                key={index}
                className="relative h-40 rounded-xl overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${property.title}-${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
