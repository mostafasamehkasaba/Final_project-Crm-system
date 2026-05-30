"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSlider.module.css";

export default function HeroSlider() {
  const slides = [
    {
      id: 1,
      image: "/images/hero/slide-1.jpg",
      tag: "كومباوند فاخر",
      title: "حياة راقية في قلب القاهرة الجديدة",
      subtitle: "مجمع بلوم فيلدز — التجمع الخامس",
      ctaPrimary: "تصفح الوحدات",
      ctaPrimaryHref: "/properties",
      ctaSecondary: "تواصل معنا",
      ctaSecondaryHref: "/contact",
    },
    {
      id: 2,
      image: "/images/hero/slide-2.jpg",
      tag: "فيلات وتوين هاوس",
      title: "مساحات فاخرة تليق بأسلوب حياتك",
      subtitle: "كومباوند المقصد — العاصمة الإدارية",
      ctaPrimary: "اكتشف الآن",
      ctaPrimaryHref: "/properties?type=villa",
      ctaSecondary: "احجز جولة",
      ctaSecondaryHref: "/contact",
    },
    {
      id: 3,
      image: "/images/hero/slide-3.jpg",
      tag: "شقق فندقية",
      title: "استثمر بذكاء في أفضل المواقع",
      subtitle: "برج النيل — وسط البلد الجديدة",
      ctaPrimary: "تصفح العروض",
      ctaPrimaryHref: "/properties?type=apartment",
      ctaSecondary: "استشارة مجانية",
      ctaSecondaryHref: "/contact",
    },
  ];

  const autoPlayInterval = 5000;
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setProgressKey((k) => k + 1);

      setTimeout(() => {
        setCurrent((index + slides.length) % slides.length);
        setIsTransitioning(false);
      }, 600);
    },
    [isTransitioning, slides.length]
  );

  const goNext = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo, slides.length]
  );

  const goPrev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo, slides.length]
  );

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(goNext, autoPlayInterval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, isPaused, goNext, autoPlayInterval]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goNext();
      if (e.key === "ArrowRight") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  const slide = slides[current];

  return (
    <section
      className={styles.slider}
      aria-label="عرض الكومباوندات المميزة"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.track} aria-hidden="true">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`${styles.slide} ${i === current ? styles.slideActive : ""}`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={i === 0}
              quality={90}
              className={styles.slideImage}
              sizes="100vw"
            />
            <div className={styles.overlay} />
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <div
          key={current}
          className={`${styles.contentInner} ${
            isTransitioning ? styles.contentOut : styles.contentIn
          }`}
        >
          <span className={styles.tag}>{slide.tag}</span>
          <h1 className={styles.title}>{slide.title}</h1>
          <p className={styles.subtitle}>{slide.subtitle}</p>
          <div className={styles.ctas}>
            <Link href={slide.ctaPrimaryHref} className={styles.ctaPrimary}>
              {slide.ctaPrimary}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className={styles.ctaIcon}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 12H5m7-7-7 7 7 7"
                />
              </svg>
            </Link>
            {slide.ctaSecondary && slide.ctaSecondaryHref && (
              <Link
                href={slide.ctaSecondaryHref}
                className={styles.ctaSecondary}
              >
                {slide.ctaSecondary}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className={styles.progressBar} aria-hidden="true">
        <div
          key={progressKey}
          className={`${styles.progressFill} ${
            isPaused ? styles.progressPaused : ""
          }`}
          style={
            { "--duration": `${autoPlayInterval}ms` } as React.CSSProperties
          }
        />
      </div>

      <div className={styles.counter} aria-live="polite" aria-atomic="true">
        <span className={styles.counterCurrent}>
          {String(current + 1).padStart(2, "0")}
        </span>
        <span className={styles.counterSep}>/</span>
        <span className={styles.counterTotal}>
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      <div className={styles.controls} aria-label="تحكم في السلايدر">
        <button
          onClick={goPrev}
          className={styles.controlBtn}
          aria-label="السلايد السابق"
          disabled={isTransitioning}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 18l6-6-6-6"
            />
          </svg>
        </button>
        <button
          onClick={goNext}
          className={styles.controlBtn}
          aria-label="السلايد التالي"
          disabled={isTransitioning}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 18l-6-6 6-6"
            />
          </svg>
        </button>
      </div>

      <div className={styles.dots} role="tablist" aria-label="اختر السلايد">
        {slides.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`السلايد ${i + 1}: ${s.tag}`}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollText}>اكتشف المزيد</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}