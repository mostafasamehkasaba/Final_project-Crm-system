import { getPropertiesdashboard } from "@/services/getProperties.services";
import PropertyCard from "@/components/produsts/PropertyCardSite";
import ThreeDImageCarousel from "@/components/homeComponent/sliders/sliderItem";
import Title from "@/components/titleItem/title";

import { IProperty } from "@/interfaces/property.interface";
import Link from "next/link";

export default async function Home() {
  const properties = await getPropertiesdashboard();

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
    <div className="bg-white dark:bg-neutral-950 transition-colors duration-300">
      {/* HERO */}
      <section
        className="relative min-h-[90vh] sm:min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/screen.png')" }}
      >
        <div className="absolute inset-0 bg-black/65 dark:bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

        <div className="relative z-10 container text-center text-white px-4 sm:px-6">
          <p className="uppercase tracking-[0.3em] text-orange-400 mb-3 sm:mb-4 text-xs sm:text-sm font-medium">
            عقارات مصر
          </p>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4 sm:mb-6">
            اكتشف وحدتك <br />
            <span className="text-orange-500">المستقبلية</span>
          </h1>

          <p className="max-w-xl sm:max-w-3xl mx-auto text-base sm:text-lg text-gray-300 leading-7 sm:leading-8 mb-8 sm:mb-10">
            أفضل المشاريع العقارية بأفضل الأسعار والمواقع المميزة داخل مصر
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
            <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 active:bg-orange-700 px-8 py-3.5 sm:py-4 rounded-xl font-semibold shadow-xl shadow-orange-900/30 transition-colors">
              تصفح المشاريع
            </button>

            <button className="w-full sm:w-auto border border-white/80 px-8 py-3.5 sm:py-4 rounded-xl hover:bg-white hover:text-black transition-colors">
              من نحن
            </button>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="flex justify-center">
        <div className="container px-4 sm:px-6">
          <Title
            label="عقارات مصر"
            mainTitle="مشاريعنا"
            subtitle="اكتشف وحدتك المستقبليه سارع بالحجز"
          />

          <div className="sliderSection my-6 sm:my-10 rounded-2xl overflow-hidden">
            <ThreeDImageCarousel slides={slides} autoplay={true} delay={3} />
          </div>

          <Title
            label="عقارات مصر"
            mainTitle="احجز وحدتك"
            subtitle="اكتشف وحدتك المستقبليه سارع بالحجز"
          />

          {/* PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-7 my-6 sm:my-10">
            {properties.length > 0 ? (
              properties.slice(0, 8).map((p: IProperty) => (
                <div
                  key={p._id}
                  className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-lg dark:hover:shadow-orange-950/30 transition-shadow duration-300"
                >
                  <PropertyCard property={p as any} />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
                لا توجد عقارات متاحة حالياً
              </p>
            )}
          </div>

          <div className="w-full flex justify-center mb-12 sm:mb-16 mt-6 sm:mt-10">
            <Link
              href="/properites"
              className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 px-8 py-3 rounded-2xl font-bold text-white shadow-md shadow-orange-900/20 transition-colors"
            >
              عرض المزيد من العقارات
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
