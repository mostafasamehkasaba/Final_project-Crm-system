"use client";

import PropertyForm from "@/components/produsts/PropertyForm";
import { properties } from "@/data/properites";
import { useParams } from "next/navigation";

export default function UpdatePage() {
  const { id } = useParams();

  const property = properties.find((item) => item.id === Number(id));

  if (!property) return <div>Property not found</div>;

  return <PropertyForm property={property} />;
}
