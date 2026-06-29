import PropertyDetailsCard from "@/components/homeComponent/propertyDetailsCard";
import { getPropertyById } from "@/services/getProperties.services";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);

  return <PropertyDetailsCard property={property} />;
}
