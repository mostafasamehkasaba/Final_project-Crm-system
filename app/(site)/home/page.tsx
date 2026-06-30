import PropertyCard from "@/components/homeComponent/propertyCard";
import ThreeDImageCarousel from "@/components/homeComponent/sliders/sliderItem";
import Title from "@/components/titleItem/title";

import { IProperty } from "@/interfaces/property.interface";
import { getPropertiesdashboard } from "@/services/getProperties.services";
import Link from "next/link";

export default async function Home() {
  const properties: IProperty[] = await getPropertiesdashboard();

  const slides = [
    {
      id: 1,
      src: "/images/slider-images/5e9d2844-66e3-42cb-a700-92e3c00f6f0f.jpg",
    },
    {
      id: 2,
      src: "/images/slider-images/185d2cee-5e4a-4683-92ff-fd8f7e6b958f.jpg",
    },
    {
      id: 3,
      src: "/images/slider-images/9041c252-85fc-4333-888e-b13697eca060.jpg",
    },
    {
      id: 4,
      src: "/images/slider-images/a7032e50-b6ac-4755-8bad-c8671474f772.png",
    },
    {
      id: 5,
      src: "/images/slider-images/ffe99739-146b-42bf-8ff8-786f6caf0a4f.png",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* HERO */}
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/65 to-black/50" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          {/* Website Title */}
          <p className="mb-4 text-sm sm:text-lg font-semibold tracking-[0.35em] uppercase text-green-400">
            مرحبًا بكم في
          </p>

          <h1 className="text-4xl sm:text-5xl font-extrabold md:text-7xl">
            عقارات <span className="text-green-500">مصر</span>
          </h1>

          {/* Main Text */}
          <h2 className="mt-6 sm:mt-8 text-2xl sm:text-3xl font-bold leading-tight md:text-5xl">
            اكتشف وحدتك المستقبلية
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-gray-300">
            أفضل المشاريع العقارية في مصر، شقق وفيلات ووحدات تجارية بمواقع مميزة
            وأسعار تنافسية لتجد العقار المناسب بكل سهولة.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/properties/residentialapartments"
              className="w-full sm:w-auto rounded-xl bg-green-700 px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:bg-green-800"
            >
              تصفح العقارات
            </Link>

            <Link
              href="/contactUs"
              className="w-full sm:w-auto rounded-xl border border-green-500/50 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-green-700 hover:bg-green-700 hover:text-white hover:shadow-lg hover:shadow-green-700/30"
            >
              تواصل معنا
            </Link>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* CONTENT */}
      <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* مشاريعنا + السلايدر */}
          <Title
            label="عقارات مصر"
            mainTitle="مشاريعنا"
            subtitle="اكتشف وحدتك المستقبليه سارع بالحجز"
          />

          <div className="mt-10 sm:mt-12">
            <ThreeDImageCarousel slides={slides} autoplay={true} delay={3} />
          </div>

          {/* احجز وحدتك + شبكة العقارات */}
          <div className="mt-20 sm:mt-24">
            <Title
              label="عقارات مصر"
              mainTitle="احجز وحدتك"
              subtitle="اكتشف وحدتك المستقبليه سارع بالحجز"
            />

            <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {properties.length > 0 ? (
                properties
                  .slice(0, 8)
                  .map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))
              ) : (
                <p className="col-span-full text-center text-gray-500 py-16">
                  لا توجد عقارات متاحة حالياً
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}