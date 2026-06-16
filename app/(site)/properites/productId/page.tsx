export const dynamic = "force-dynamic";

import getPropertyById from "@/services/getPropertyById.services";
import Image from "next/image";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const { data: property } = await getPropertyById(productId);
  console.log(property);
  return (
    <main className="container mx-auto px-4 py-10 space-y-10">
      {/* الصور والمعلومات الأساسية */}
      <section className="grid lg:grid-cols-2 gap-8">
        {/* الصورة */}
        <div>
          <Image
            src={property.category.image}
            alt={property.category.name}
            width={350}
            height={350}
          />
        </div>

        {/* المعلومات */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold">{property.title}</h1>

            <p className="text-gray-500 mt-2">
              القاهرة الجديدة - التجمع الخامس
            </p>
          </div>

          <h2 className="text-3xl font-bold text-green-700">
            {property.price}
          </h2>

          {/* المواصفات */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-xl p-4 text-center">
              🛏 ٤ غرف نوم
            </div>

            <div className="border rounded-xl p-4 text-center">🛁 ٣ حمامات</div>

            <div className="border rounded-xl p-4 text-center">📐 ٢٨٠ متر²</div>

            <div className="border rounded-xl p-4 text-center">🏡 فيلا</div>
          </div>

          <div className="flex gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-xl">
              تواصل معنا
            </button>

            <button className="border px-6 py-3 rounded-xl">واتساب</button>
          </div>
        </div>
      </section>

      {/* الوصف */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">نبذة عن العقار</h2>

        <p className="text-gray-600 leading-8">{property.description}</p>
      </section>

      {/* المميزات */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">المميزات والخدمات</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-xl p-4">🏊 مسبح خاص</div>
          <div className="border rounded-xl p-4">🚗 موقف سيارات</div>
          <div className="border rounded-xl p-4">🌳 حديقة</div>
          <div className="border rounded-xl p-4">🛗 مصعد</div>
          <div className="border rounded-xl p-4">🛡 أمن وحراسة 24 ساعة</div>
          <div className="border rounded-xl p-4">🌐 إنترنت فائق السرعة</div>
        </div>
      </section>
    </main>
  );
}
