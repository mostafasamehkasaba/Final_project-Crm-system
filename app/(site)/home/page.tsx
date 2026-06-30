<<<<<<< HEAD
import { getPropertiesdashboard } from "@/services/getProperties.services";
import PropertyCard from "@/components/produsts/PropertyCardSite";
=======
import PropertyCard from "@/components/homeComponent/propertyCard";
>>>>>>> 9e70b406a0136c38d0c0e4874bfb7ad919d74c0f
import ThreeDImageCarousel from "@/components/homeComponent/sliders/sliderItem";
import Title from "@/components/titleItem/title";

import { IProperty } from "@/interfaces/property.interface";
<<<<<<< HEAD
=======
import { getPropertiesdashboard } from "@/services/getProperties.services";
>>>>>>> 9e70b406a0136c38d0c0e4874bfb7ad919d74c0f
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
<<<<<<< HEAD
    <div className="bg-white dark:bg-neutral-950 transition-colors duration-300">
=======
    <div className="w-full min-h-screen bg-gray-50">
>>>>>>> 9e70b406a0136c38d0c0e4874bfb7ad919d74c0f
      {/* HERO */}
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        {/* Overlay */}
<<<<<<< HEAD
        <div className="absolute inset-0 bg-black/20 dark:bg-black/50" />
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/65 to-black/50" />

        {/* Content */}
        <div className="relative z-10 container px-4 text-center text-white">
          <p className="mb-4 text-lg font-semibold tracking-[0.35em] uppercase text-green-400">
            مرحبًا بكم في
          </p>

          <h1 className="text-5xl font-extrabold md:text-7xl">
            عقارات <span className="text-green-500">مصر</span>
          </h1>

          <h2 className="mt-8 text-3xl font-bold leading-tight md:text-5xl">
            اكتشف وحدتك المستقبلية
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
=======
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
>>>>>>> 9e70b406a0136c38d0c0e4874bfb7ad919d74c0f
            أفضل المشاريع العقارية في مصر، شقق وفيلات ووحدات تجارية بمواقع مميزة
            وأسعار تنافسية لتجد العقار المناسب بكل سهولة.
          </p>

<<<<<<< HEAD
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/properites"
              className="rounded-xl bg-green-700 px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:bg-green-800"
=======
          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/properties/residentialapartments"
              className="w-full sm:w-auto rounded-xl bg-green-700 px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:bg-green-800"
>>>>>>> 9e70b406a0136c38d0c0e4874bfb7ad919d74c0f
            >
              تصفح العقارات
            </Link>

            <Link
              href="/contactUs"
<<<<<<< HEAD
              className="rounded-xl border border-green-500/50 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-green-700 hover:bg-green-700 hover:text-white hover:shadow-lg hover:shadow-green-700/30"
=======
              className="w-full sm:w-auto rounded-xl border border-green-500/50 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-green-700 hover:bg-green-700 hover:text-white hover:shadow-lg hover:shadow-green-700/30"
>>>>>>> 9e70b406a0136c38d0c0e4874bfb7ad919d74c0f
            >
              تواصل معنا
            </Link>
          </div>
        </div>

        {/* Bottom Fade */}
<<<<<<< HEAD
      </section>

      {/* CONTENT */}
      <section className="flex justify-center">
        <div className="container">
=======
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* CONTENT */}
      <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* مشاريعنا + السلايدر */}
>>>>>>> 9e70b406a0136c38d0c0e4874bfb7ad919d74c0f
          <Title
            label="عقارات مصر"
            mainTitle="مشاريعنا"
            subtitle="اكتشف وحدتك المستقبليه سارع بالحجز"
          />

<<<<<<< HEAD
          <div className="sliderSection rounded-2xl overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-lg shadow-neutral-200/50 dark:shadow-black/40">
=======
          <div className="mt-10 sm:mt-12">
>>>>>>> 9e70b406a0136c38d0c0e4874bfb7ad919d74c0f
            <ThreeDImageCarousel slides={slides} autoplay={true} delay={3} />
          </div>

          {/* احجز وحدتك + شبكة العقارات */}
          <div className="mt-20 sm:mt-24">
            <Title
              label="عقارات مصر"
              mainTitle="احجز وحدتك"
              subtitle="اكتشف وحدتك المستقبليه سارع بالحجز"
            />

<<<<<<< HEAD
          {/* PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-7 my-6 sm:my-10">
            {properties.length > 0 ? (
              properties.slice(0, 8).map((p: IProperty) => (
                <div
                  key={p._id}
                  className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-lg dark:hover:shadow-green-950/30 transition-shadow duration-300"
                >
                  <PropertyCard property={p as any} />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
                لا توجد عقارات متاحة حالياً
              </p>
            )}
=======
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
>>>>>>> 9e70b406a0136c38d0c0e4874bfb7ad919d74c0f
          </div>

          <div className="w-full flex justify-center mb-12 sm:mb-16 mt-6 sm:mt-10">
            <Link
              href="/properites"
              className="bg-green-700 hover:bg-green-800 active:bg-green-900 px-8 py-3 rounded-2xl font-bold text-white shadow-md shadow-green-900/20 transition-colors"
            >
              عرض المزيد من العقارات
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
