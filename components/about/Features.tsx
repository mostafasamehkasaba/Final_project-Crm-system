"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "./Features.module.css";

export default function Features() {
  const features = [
    {
      id: 1,
      size: "large",
      accent: "gold",
      icon: "shield",
      title: "توثيق كامل لكل وحدة",
      body: "كل وحدة مسجلة بمستنداتها القانونية الكاملة وتفاصيل التشطيب قبل عرضها على المنصة. لا مفاجآت، لا غموض.",
      highlight: "100%",
      highlightLabel: "وحدات موثقة",
      backgroundImage: "/images/features/feature-1.jpg",
    },
    {
      id: 2,
      size: "tall",
      accent: "teal",
      icon: "map-pin",
      title: "بحث جغرافي دقيق",
      body: "ابحث بالمنطقة، الحي، أو المسافة من أي معلم. خريطة تفاعلية تعرض كل الوحدات المتاحة.",
      backgroundImage: "/images/features/feature-2.jpg",
    },
    {
      id: 3,
      size: "small",
      accent: "neutral",
      icon: "clock",
      title: "تحديث فوري للأسعار",
      body: "أسعار محدّثة لحظياً من المطورين مباشرة دون وسطاء.",
      backgroundImage: "/images/features/feature-3.jpg",
    },
    {
      id: 4,
      size: "small",
      accent: "rose",
      icon: "support",
      title: "دعم مبيعات 24/7",
      body: "فريق متخصص جاهز للإجابة على استفساراتك في أي وقت.",
      backgroundImage: "/images/features/feature-4.jpg",
    },
    {
      id: 5,
      size: "wide",
      accent: "teal",
      icon: "chart-line",
      title: "تحليل السوق العقاري",
      body: "تقارير دورية عن اتجاهات الأسعار ومعدلات البيع في كل منطقة لتساعدك على اتخاذ قرار استثماري صحيح.",
      highlight: "6",
      highlightLabel: "مدن مصرية",
      backgroundImage: "/images/features/feature-5.jpg",
    },
    {
      id: 6,
      size: "small",
      accent: "gold",
      icon: "verified",
      title: "مطورون معتمدون فقط",
      body: "شركاؤنا يمرون بعملية تحقق وتقييم صارمة قبل الانضمام.",
      backgroundImage: "/images/features/feature-6.jpg",
    },
  ];

  const [currentGroup, setCurrentGroup] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const cardsPerView = 3;
  const totalFeatures = features.length;
  const totalGroups = Math.ceil(totalFeatures / cardsPerView);

  const nextGroup = () => {
    setCurrentGroup((prev) => (prev + 1) % totalGroups);
  };

  const goToGroup = (index: number) => {
    setCurrentGroup(index);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setInterval(() => {
        nextGroup();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const startIndex = currentGroup * cardsPerView;
  const visibleFeatures = features.slice(startIndex, startIndex + cardsPerView);

  function FeatureIconSVG({ name }: { name: string }) {
    const props = {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
      className: styles.iconSvg,
      "aria-hidden": true as const,
    };

    switch (name) {
      case "shield":
        return (
          <svg {...props}>
            <path d="M12 2l7 3v5c0 5-3.5 9.74-7 11-3.5-1.26-7-6-7-11V5l7-3z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        );
      case "search":
        return (
          <svg {...props}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <path d="M11 8v3m0 0v3m0-3h3m-3 0H8" />
          </svg>
        );
      case "map-pin":
        return (
          <svg {...props}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        );
      case "360":
        return (
          <svg {...props}>
            <path d="M12 2a10 10 0 1 0 10 10" />
            <path d="M22 2l-3 3 3 3" />
            <path d="M9 12h6m-3-3v6" />
          </svg>
        );
      case "chart-line":
        return (
          <svg {...props}>
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
        );
      case "clock":
        return (
          <svg {...props}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case "verified":
        return (
          <svg {...props}>
            <path d="M9 12l2 2 4-4" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
          </svg>
        );
      case "support":
        return (
          <svg {...props}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        );
      default:
        return null;
    }
  }

  function FeatureCard({ feature }: { feature: typeof features[0] }) {
    return (
      <div className={styles.card}>
        {feature.backgroundImage && (
          <div className={styles.imageContainer}>
            <Image
              src={feature.backgroundImage}
              alt=""
              fill
              className={styles.cardImage}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className={styles.overlay} />
          </div>
        )}
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <FeatureIconSVG name={feature.icon} />
          </div>
          {feature.highlight && (
            <div className={styles.highlightBlock}>
              <span className={styles.highlightValue}>{feature.highlight}</span>
              {feature.highlightLabel && (
                <span className={styles.highlightLabel}>{feature.highlightLabel}</span>
              )}
            </div>
          )}
          <div className={styles.textBlock}>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardBody}>{feature.body}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.tag}>لماذا نحن</span>
          <h2 className={styles.title}>منصة صُممت لتجربة لا مثيل لها</h2>
          <p className={styles.subtitle}>
            كل تفصيلة في منصتنا مبنية لتوفير رحلة بحث عقاري شفافة وسهلة ومتكاملة.
          </p>
        </header>

        <div
          className={styles.carouselWrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.carousel}>
            <div className={styles.carouselTrack}>
              {visibleFeatures.map((feature) => (
                <div key={feature.id} className={styles.slide}>
                  <FeatureCard feature={feature} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {totalGroups > 1 && (
          <div className={styles.dots}>
            {Array.from({ length: totalGroups }).map((_, idx) => (
              <button
                key={idx}
                className={`${styles.dot} ${idx === currentGroup ? styles.activeDot : ""}`}
                onClick={() => goToGroup(idx)}
                aria-label={`انتقل إلى المجموعة ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}