"use client";
import { properties } from "@/data/properites";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function PropertyDetailsPage() {
  const { productID } = useParams();
  // replace by API
  const property = properties.find((item) => item.id === Number(productID));

  if (!property) {
    return (
      <div className="p-10 text-center text-gray-500">Property not found</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* IMAGE HERO */}
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>

      {/* MAIN INFO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{property.title}</h1>

            <p className="text-gray-500 mt-2">📍 {property.location}</p>
          </div>

          {/* BADGES */}
          <div className="flex gap-3">
            <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
              {property.bookType}
            </span>

            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {property.area} m²
            </span>

            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              🛁 {property.baths} Baths
            </span>

            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              🛏 {property.beds}
            </span>
          </div>

          {/* DESCRIPTION */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>

            <p className="text-gray-600 leading-relaxed">
              {property.description}
            </p>
          </div>
        </div>

        {/* RIGHT - PRICE CARD */}
        <div className="border rounded-2xl p-5 shadow-sm h-fit sticky top-6">
          <p className="text-2xl font-bold">
            {property.price.toLocaleString()} EGP
          </p>

          <p className="text-sm text-gray-500 mt-1">per {property.bookType}</p>

          {/* <button className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
            Book Now
          </button>

          <button className="w-full mt-3 border py-3 rounded-xl hover:bg-gray-50">
            ❤️ Save
          </button> */}
          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p>✔ Instant confirmation</p>
            <p>✔ Free cancellation</p>
            <p>✔ Verified property</p>
          </div>
        </div>
      </div>
    </div>
  );
}
