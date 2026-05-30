import getProperties from "@/app/services/getProperties.services";
import PropertyCard from "@/components/homeComponent/propertyCard";
import ThreeDImageCarousel from "@/components/homeComponent/sliders/sliderItem";
import slide from "../../../public/premium_photo-1680553489384-8e3230dd1073.avif";

import { IProperty } from "@/interfaces/property.interface";
import Title from "@/components/titleItem/title";

export default async function Home() {
  const { data: properties }: { data: IProperty[] } = await getProperties();
  console.log(properties);
  // 1. Default Usage (5 visible items, no autoplay)
  const slides = [
    { id: 1, src: slide.src, href: "/product/1" },
    {
      id: 2,
      src: slide.src,
    },
    {
      id: 3,
      src: slide.src,
    },
    {
      id: 4,
      src: slide.src,
    },
    {
      id: 5,
      src: slide.src,
    },
  ];

  return (
    <>
      {/* hero section  */}
      <section
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/screen.png')",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* content */}
        <div className="relative z-10 container text-center text-white px-4">
          {/* small label */}
          <p className="uppercase tracking-[0.3em] text-orange-400 mb-4">
            عقارات مصر
          </p>

          {/* main title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            اكتشف وحدتك المستقبلية
          </h1>

          {/* subtitle */}
          <p className="max-w-2xl mx-auto text-sm md:text-lg text-gray-200 mb-8">
            أفضل المشاريع العقارية بأفضل الأسعار والمواقع المميزة داخل مصر
          </p>

          {/* buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 transition rounded-lg font-medium">
              تواصل معنا
            </button>

            <button className="px-8 py-3 border border-white hover:bg-white hover:text-black transition rounded-lg font-medium">
              من نحن
            </button>
          </div>
        </div>
      </section>
      <section className="py-6">
        <div className="container">
          {/* title  */}
          <Title
            label="عقارات مصر"
            mainTitle="مشاريعنا"
            subtitle="اكتشف وحدتك المستقبليه سارع بالحجز"
          />
          {/* slider section  */}
          <div className="sliderSection p-24 m-6 ">
            <ThreeDImageCarousel
              slides={slides}
              className="my-12 max-w-6xl mx-auto bg-gradient-to-r from-amber-600 to-amber-800 rounded-xl p-6"
              autoplay={true}
              delay={3}
            />
          </div>
          <Title
            label="عقارات مصر"
            mainTitle="احجز وحدتك"
            subtitle="اكتشف وحدتك المستقبليه سارع بالحجز"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
            {properties &&
              properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
