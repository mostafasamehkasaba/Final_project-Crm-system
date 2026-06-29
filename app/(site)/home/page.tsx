// import getProperties from "@/services/getProperties.services";
import PropertyCard from "@/components/homeComponent/propertyCard";
import ThreeDImageCarousel from "@/components/homeComponent/sliders/sliderItem";
import Title from "@/components/titleItem/title";
// import slide from "../../../public/premium_photo-1680553489384-8e3230dd1073.avif";

import { IProperty } from "@/interfaces/property.interface";
import { getPropertiesdashboard } from "@/services/getProperties.services";

export default async function Home() {
  const properties: IProperty[] = await getPropertiesdashboard();

  const slides = [
    {
      id: 1,
      src: "/premium_photo-1680553489384-8e3230dd1073.webp",
      href: "/product/1",
    },
    { id: 2, src: "/premium_photo-1680553489384-8e3230dd1073.webp" },
    { id: 3, src: "/premium_photo-1680553489384-8e3230dd1073.webp" },
    { id: 4, src: "/premium_photo-1680553489384-8e3230dd1073.webp" },
    { id: 5, src: "/premium_photo-1680553489384-8e3230dd1073.webp" },
  ];

  return (
    <div>
      {/* HERO */}
      <section
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />

        <div className="relative z-10 container text-center text-white px-4">
          <p className="uppercase tracking-[0.3em] text-orange-400 mb-4">
            عقارات مصر
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            اكتشف وحدتك <br />
            <span className="text-orange-500">المستقبلية</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-8 mb-10">
            أفضل المشاريع العقارية بأفضل الأسعار والمواقع المميزة داخل مصر
          </p>

          <div className="flex gap-5 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-semibold shadow-xl">
              تصفح المشاريع
            </button>

            <button className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-black transition">
              من نحن
            </button>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="flex justify-center">
        <div className="container bg-gray-100">
          <Title
            label="عقارات مصر"
            mainTitle="مشاريعنا"
            subtitle="اكتشف وحدتك المستقبليه سارع بالحجز"
          />

          <div className="sliderSection">
            <ThreeDImageCarousel slides={slides} autoplay={true} delay={3} />
          </div>

          <Title
            label="عقارات مصر"
            mainTitle="احجز وحدتك"
            subtitle="اكتشف وحدتك المستقبليه سارع بالحجز"
          />

          {/* properties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.length > 0 ? (
              properties
                .slice(0, 8)
                .map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))
            ) : (
              <p className="col-span-4 text-center text-gray-500">
                لا توجد عقارات متاحة حالياً
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
