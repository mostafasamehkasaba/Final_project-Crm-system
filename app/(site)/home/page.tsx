import getProperties from "@/services/getProperties.services";
import PropertyCard from "@/components/homeComponent/propertyCard";
import ThreeDImageCarousel from "@/components/homeComponent/sliders/sliderItem";

import { IProperty } from "@/interfaces/property.interface";
import {
  FadeUp,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  HoverCard3D,
  ParallaxHero,
  GlowOrb,
} from "@/components/motion-componet";

export default async function Home() {
  // 1. جلب البيانات بأمان على السيرفر (Webpack المستقر)
  const properties: IProperty[] = await getProperties();

  // 2. روابط صور السلايدر الحقيقية والمستقرة لمنع خطأ الـ 404
  const slides = [
    { id: 1, src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80", href: "/product/1" },
    { id: 2, src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
    { id: 3, src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" },
  ];

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 antialiased overflow-x-hidden">
      
      {/* هيرو سيكشن - واجهة ترحيبية مستقرة */}
      <ParallaxHero className="relative min-h-screen w-full flex items-center justify-center py-32 bg-gradient-to-b from-zinc-900/40 to-zinc-950">
        <div className="relative z-10 w-full text-center px-6 max-w-5xl mx-auto">
          <FadeUp delay={0.1}>
            <h1 className="text-5xl sm:text-7xl font-black mb-8 text-white tracking-tight">
              اكتشف وحدتك <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">المستقبلية</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="max-w-3xl mx-auto text-zinc-400 mb-12 text-lg font-light leading-relaxed">
              ننسق لك أرقى المشاريع العقارية السكنية والتجارية الاستثمارية في قلب مصر.
            </p>
          </FadeUp>
        </div>
      </ParallaxHero>

      {/* 🚀 سيكشن المحتوى الداكن الفخم - مفرود الآن بعرض الشاشة بالكامل بدون هوامش ضيقة 🚀 */}
      <section className="relative w-full py-20 px-4 sm:px-8 lg:px-12 bg-zinc-950 overflow-hidden border-t border-zinc-900">
        <GlowOrb color="rgba(249,115,22,0.12)" size={900} className="-top-40 -left-20" />

        {/* الكانتينر الكبير واخد w-full ومفتوح المساحة تماماً للفرش التام */}
        <div className="w-full bg-zinc-900/30 backdrop-blur-3xl rounded-[3rem] border border-zinc-800/30 p-6 sm:p-12 lg:p-16 shadow-2xl">
          
          {/* عنوان القسم متمركز في المنتصف */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 bg-clip-text text-transparent">
              مشاريعنا الحصرية
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base mt-2">عقارات منتقاة بعناية تلبي طموحاتك الاستثمارية</p>
          </div>

          {/* 1. السلايدر الـ 3D - مفرود بكامل العرض المتاح له */}
          <ScaleIn className="my-16 w-full">
            <div className="relative p-4 bg-zinc-950/40 rounded-[2.5rem] border border-zinc-800/40 w-full shadow-inner">
              <div className="relative z-10 overflow-hidden rounded-[2rem] w-full">
                <ThreeDImageCarousel slides={slides} autoplay={true} delay={3} />
              </div>
            </div>
          </ScaleIn>

          {/* 2. شبكة الكروت التفاعلية الـ 3D - تم تقليص الأعمدة لتكبير حجم الكارت الفردي */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 xl:gap-12 mt-28 w-full">
            {properties && properties.length > 0 ? (
              properties.map((property) => (
                <StaggerItem key={property._id} className="w-full">
                  {/* الكرت الـ 3D الضخم - p-6 ومساحة واسعة جداً لتفاصيل العقار */}
                  <HoverCard3D 
                    maxTilt={6} 
                    className="w-full min-h-[480px] bg-zinc-950/50 backdrop-blur-md rounded-[2rem] border border-zinc-800/50 p-6 text-white hover:border-orange-500/30 transition-all duration-300 shadow-xl flex flex-col justify-between"
                  >
                    <PropertyCard property={property} />
                  </HoverCard3D>
                </StaggerItem>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
                لا توجد عقارات متاحة حالياً في هذه القائمة.
              </div>
            )}
          </StaggerContainer>

        </div>
      </section>
    </div>
  );
}