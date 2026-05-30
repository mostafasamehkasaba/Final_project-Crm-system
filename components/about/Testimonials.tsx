"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./Testimonials.module.css";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  compound: string;
  date: string;
}

interface TestimonialsResponse {
  tag: string;
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.stars} aria-label={`تقييم ${rating} من 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`${styles.star} ${i < rating ? styles.starFilled : styles.starEmpty}`}
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <article className={`${styles.card} ${isActive ? styles.cardActive : ""}`} aria-hidden={!isActive}>
      <div className={styles.quoteIcon} aria-hidden="true">
        <svg viewBox="0 0 40 32" fill="currentColor">
          <path d="M0 32V19.2C0 8.533 6.4 2.133 19.2 0l2.133 3.733C14.4 5.333 10.667 8.533 9.6 13.333H16V32H0zm24 0V19.2C24 8.533 30.4 2.133 43.2 0l2.133 3.733C38.4 5.333 34.667 8.533 33.6 13.333H40V32H24z" />
        </svg>
      </div>
      <StarRating rating={testimonial.rating} />
      <p className={styles.cardText}>&ldquo;{testimonial.text}&rdquo;</p>
      <span className={styles.compoundBadge}>{testimonial.compound}</span>
      <div className={styles.author}>
        <div className={styles.avatarWrapper}>
          <Image src={testimonial.avatar} alt={testimonial.name} fill className={styles.avatar} sizes="48px" />
        </div>
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{testimonial.name}</span>
          <span className={styles.authorMeta}>{testimonial.role} · {testimonial.date}</span>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const [data, setData] = useState<TestimonialsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch("/api/about/testimonials")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const total = data?.testimonials.length || 0;

  const goTo = useCallback((index: number) => {
    if (!total) return;
    setCurrent((index + total) % total);
  }, [total]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isPaused || !total || loading) return;
    timerRef.current = setTimeout(goNext, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, isPaused, goNext, total, loading]);

  if (loading || !data) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.tag}>آراء عملائنا</span>
            <h2 className={styles.title}>جاري التحميل...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={styles.section}
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.bgDecoration} aria-hidden="true" />
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.tag}>{data.tag}</span>
          <h2 id="testimonials-title" className={styles.title}>{data.title}</h2>
          <p className={styles.subtitle}>{data.subtitle}</p>
        </header>
        <div className={styles.track} aria-live="polite">
          {data.testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} isActive={i === current} />
          ))}
        </div>
        <div className={styles.controls}>
          <div className={styles.dots} role="tablist">
            {data.testimonials.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === current}
                aria-label={`شهادة ${t.name}`}
                className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <div className={styles.arrows}>
            <button onClick={goPrev} className={styles.arrowBtn} aria-label="السابق">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <button onClick={goNext} className={styles.arrowBtn} aria-label="التالي">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.counter} aria-live="polite">
          <span className={styles.counterCurrent}>{String(current + 1).padStart(2, "0")}</span>
          <span className={styles.counterSep}>/</span>
          <span className={styles.counterTotal}>{String(total).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}