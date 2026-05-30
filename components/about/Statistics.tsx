"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Statistics.module.css";

export default function Statistics() {
  const stats = [
    {
      id: 1,
      value: 500,
      suffix: "+",
      label: "وحدة عقارية",
      sublabel: "شقق وفلل وكومباوندات",
      icon: "building",
    },
    {
      id: 2,
      value: 200,
      suffix: "+",
      label: "عميل راضٍ",
      sublabel: "تقييم 4.9 من 5",
      icon: "star",
    },
    {
      id: 3,
      value: 50,
      suffix: "+",
      label: "مطور عقاري",
      sublabel: "شركاء موثوقون",
      icon: "handshake",
    },
    {
      id: 4,
      value: 6,
      suffix: "",
      label: "مدن مصرية",
      sublabel: "والتوسع مستمر",
      icon: "city",
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  function useCountUp(target: number, duration: number = 2000, shouldStart: boolean = false) {
    const [count, setCount] = useState(0);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
      if (!shouldStart) return;
      const startTime = performance.now();
      const easeOutExpo = (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        setCount(Math.floor(easedProgress * target));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setCount(target);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [shouldStart, target, duration]);

    return count;
  }

  function StatIconSVG({ name }: { name: string }) {
    const props = {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.7,
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
      className: styles.iconSvg,
      "aria-hidden": true as const,
    };

    switch (name) {
      case "building":
        return (
          <svg {...props}>
            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 9h1m4 0h1M9 13h1m4 0h1" />
          </svg>
        );
      case "users":
        return (
          <svg {...props}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case "handshake":
        return (
          <svg {...props}>
            <path d="M4 11V8l4-4h4l4 4h1a2 2 0 0 1 2 2v1M4 11h3l2 2h2l2-2h7M4 11v6a1 1 0 0 0 1 1h3M20 11v6a1 1 0 0 1-1 1h-3M7 18l2 2 4-4" />
          </svg>
        );
      case "star":
        return (
          <svg {...props}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      case "city":
        return (
          <svg {...props}>
            <path d="M3 21h18M3 7v14M21 7v14M6 7V5l6-2 6 2v2M6 7h12M9 21v-5h6v5" />
            <path d="M9 11h1m4 0h1M9 15h1m4 0h1" />
          </svg>
        );
      case "chart":
        return (
          <svg {...props}>
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
            <line x1="2" y1="20" x2="22" y2="20" />
          </svg>
        );
      default:
        return null;
    }
  }

  function StatCard({ stat, index, isVisible }: { stat: typeof stats[0]; index: number; isVisible: boolean }) {
    const [shouldCount, setShouldCount] = useState(false);
    const count = useCountUp(stat.value, 2000, shouldCount);

    useEffect(() => {
      if (!isVisible) return;
      const timer = setTimeout(() => setShouldCount(true), index * 150);
      return () => clearTimeout(timer);
    }, [isVisible, index]);

    return (
      <article className={styles.card} style={{ "--card-index": index } as React.CSSProperties}>
        <div className={styles.iconWrapper}>
          <StatIconSVG name={stat.icon} />
        </div>
        <div className={styles.numberRow}>
          <span className={styles.number}>{count.toLocaleString("ar-EG")}</span>
          <span className={styles.suffix}>{stat.suffix}</span>
        </div>
        <span className={styles.srOnly}>{stat.value.toLocaleString("ar-EG")}{stat.suffix}</span>
        <p className={styles.label}>{stat.label}</p>
        {stat.sublabel && <p className={styles.sublabel}>{stat.sublabel}</p>}
        <div className={styles.accentLine} aria-hidden="true" />
      </article>
    );
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.bgPattern} aria-hidden="true" />
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.tag}>بالأرقام</span>
          <h2 className={styles.title}>إنجازاتنا تتحدث عنا</h2>
        </header>
        <div className={styles.grid} role="list">
          {stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
