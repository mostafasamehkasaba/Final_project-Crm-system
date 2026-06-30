"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number | string;
  src: string;
  href?: string;
  title?: string;
  location?: string;
}

interface ThreeDImageCarouselProps {
  slides: Slide[];
  autoplay?: boolean;
  delay?: number; // seconds
}

export default function ThreeDImageCarousel({
  slides,
  autoplay = true,
  delay = 3,
}: ThreeDImageCarouselProps) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = slides.length;

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % count);
  }, [count]);

  const goPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (!autoplay || count <= 1) return;
    timerRef.current = setInterval(goNext, delay * 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplay, delay, goNext, count]);

  const pause = () => timerRef.current && clearInterval(timerRef.current);
  const resume = () => {
    if (!autoplay || count <= 1) return;
    timerRef.current = setInterval(goNext, delay * 1000);
  };

  if (!count) return null;

  // ترتيب يحسب إزاحة كل سلايد بالنسبة للسلايد النشط (دائري)
  const getOffset = (index: number) => {
    let offset = index - active;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset -= -count;
    return offset;
  };

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[440px] flex items-center justify-center overflow-hidden rounded-3xl bg-zinc-950">
        {/* لمسة ضوء خلفية ناعمة */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(249,115,22,0.12),transparent_60%)]" />

        {slides.map((slide, index) => {
          const offset = getOffset(index);
          const abs = Math.abs(offset);

          // إخفاء العناصر البعيدة جداً عن المركز
          if (abs > 2) return null;

          const isActive = offset === 0;

          const translateX = offset * 230; // px تباعد أفقي بين الصور
          const scale = isActive ? 1 : abs === 1 ? 0.72 : 0.5;
          const zIndex = 10 - abs;
          const opacity = abs > 2 ? 0 : isActive ? 1 : abs === 1 ? 0.85 : 0.45;
          const blur = isActive ? 0 : abs === 1 ? 0 : 1;

          return (
            <button
              key={slide.id}
              onClick={() => setActive(index)}
              aria-label={`اذهب إلى الشريحة ${index + 1}`}
              className="absolute transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/10"
              style={{
                width: isActive ? "min(56vw, 420px)" : "min(34vw, 260px)",
                height: isActive ? "min(70%, 380px)" : "min(58%, 300px)",
                transform: `translateX(${translateX}px) scale(${scale})`,
                zIndex,
                opacity,
                filter: blur ? `blur(${blur}px)` : "none",
                cursor: isActive ? "default" : "pointer",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.title ?? `slide-${index}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {isActive && (slide.title || slide.location) && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 sm:p-6 text-right">
                  {slide.title && (
                    <h3 className="text-white font-bold text-base sm:text-xl">
                      {slide.title}
                    </h3>
                  )}
                  {slide.location && (
                    <p className="text-zinc-300 text-xs sm:text-sm mt-1">
                      {slide.location}
                    </p>
                  )}
                </div>
              )}
            </button>
          );
        })}

        {/* أزرار التنقل */}
        <button
          onClick={goPrev}
          aria-label="السابق"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 transition-colors duration-200 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={goNext}
          aria-label="التالي"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 transition-colors duration-200 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* مؤشرات النقاط */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActive(index)}
            aria-label={`نقطة ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === active
                ? "w-6 bg-orange-500"
                : "w-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}