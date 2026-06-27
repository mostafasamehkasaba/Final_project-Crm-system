"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  IconButton,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <Box sx={{ display: "flex", gap: 0.75 }}>
      {Array.from({ length: 5 }, (_, i) =>
        i < rating ? (
          <StarIcon
            key={i}
            sx={{ fontSize: 18, color: "#c9a84c" }}
          />
        ) : (
          <StarBorderIcon
            key={i}
            sx={{ fontSize: 18, color: "rgba(30, 30, 42, 0.45)" }}
          />
        )
      )}
    </Box>
  );
};

const SkeletonCard = () => (
  <Box
    sx={{
      background: "#ffffff",
      borderRadius: 4,
      padding: { xs: 3, sm: 4 },
      border: "1px solid rgba(0, 0, 0, 0.05)",
      boxShadow: "0 20px 35px -12px rgba(0, 0, 0, 0.05)",
      display: "flex",
      flexDirection: "column",
      gap: 2.5,
    }}
  >
    <FormatQuoteIcon sx={{ fontSize: 32, color: "#c9a84c", opacity: 0.4 }} />
    <Box sx={{ display: "flex", gap: 0.75 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} variant="circular" width={18} height={18} />
      ))}
    </Box>
    <Skeleton variant="rounded" width="100%" height={80} />
    <Skeleton variant="rounded" width={120} height={28} sx={{ borderRadius: 6 }} />
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 1 }}>
      <Skeleton variant="circular" width={52} height={52} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Skeleton variant="text" width={120} height={24} />
        <Skeleton variant="text" width={160} height={20} />
      </Box>
    </Box>
  </Box>
);

const TestimonialCard = ({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) => {
  return (
    <Box
      sx={{
        background: "#ffffff",
        borderRadius: 4,
        padding: { xs: 3, sm: 4 },
        border: "1px solid rgba(0, 0, 0, 0.05)",
        boxShadow: "0 20px 35px -12px rgba(0, 0, 0, 0.05)",
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        transition: "opacity 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
        opacity: isActive ? 1 : 0,
        transform: isActive ? "scale(1)" : "scale(0.98)",
        pointerEvents: isActive ? "auto" : "none",
        gridRow: 1,
        gridColumn: 1,
      }}
    >
      <FormatQuoteIcon sx={{ fontSize: 32, color: "#c9a84c", opacity: 0.4 }} />
      <StarRating rating={testimonial.rating} />
      <Typography
        component="p"
        sx={{
          fontSize: "1rem",
          lineHeight: 1.75,
          color: "#4b4b5a",
          m: 0,
        }}
      >
        &ldquo;{testimonial.text}&rdquo;
      </Typography>
      <Box
        sx={{
          display: "inline-flex",
          alignSelf: "flex-start",
          fontSize: "0.7rem",
          fontWeight: 500,
          letterSpacing: "0.05em",
          color: "#c9a84c",
          backgroundColor: "rgba(201, 168, 76, 0.12)",
          padding: "0.3rem 0.9rem",
          borderRadius: "60px",
          border: "1px solid rgba(201, 168, 76, 0.25)",
        }}
      >
        {testimonial.compound}
      </Box>
      <Box sx={{ display: "flex", gap: 1.75, alignItems: "center", mt: 1 }}>
        <Box
          sx={{
            position: "relative",
            width: 52,
            height: 52,
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "rgba(201, 168, 76, 0.12)",
            border: "2px solid white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="52px"
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
          <Typography
            component="span"
            sx={{ fontWeight: 700, fontSize: "1rem", color: "#1e1e2a" }}
          >
            {testimonial.name}
          </Typography>
          <Typography
            component="span"
            sx={{ fontSize: "0.75rem", color: "rgba(30, 30, 42, 0.45)" }}
          >
            {testimonial.role} · {testimonial.date}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default function Testimonials() {
  const [data, setData] = useState<TestimonialsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isMobile = useMediaQuery("(max-width:640px)");

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);

    fetch("/api/about/testimonials", { signal: abortController.signal })
      .then((res) => res.json())
      .then((json: TestimonialsResponse) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
        }
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  const total = data?.testimonials.length ?? 0;

  const goTo = useCallback(
    (index: number) => {
      if (!total) return;
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

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
      <Box
        component="section"
        dir="rtl"
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          background: "#ffffff",
          py: { xs: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            maxWidth: 860,
            mx: "auto",
            px: { xs: 2.5, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 3, sm: 4 },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 1.5 }}>
            <Skeleton variant="rounded" width={100} height={28} sx={{ borderRadius: 6 }} />
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width={300} height={24} />
          </Box>
          <Box
            sx={{
              display: "grid",
              width: "100%",
              position: "relative",
            }}
          >
            <SkeletonCard />
          </Box>
        </Box>
      </Box>
    );
  }

  const { tag, title, subtitle, testimonials } = data;

  return (
    <Box
      component="section"
      dir="rtl"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "#ffffff",
        py: { xs: 4, md: 6 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: "radial-gradient(circle at 20% 30%, rgba(201, 168, 76, 0.02) 2px, transparent 2px)",
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
        }}
      />
      <Box
        sx={{
          maxWidth: 860,
          mx: "auto",
          px: { xs: 2.5, sm: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 4 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 1.5 }}>
          <Typography
            component="span"
            sx={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "#c9a84c",
              textTransform: "uppercase",
              backgroundColor: "rgba(201, 168, 76, 0.12)",
              padding: "0.3rem 1rem",
              borderRadius: "40px",
            }}
          >
            {tag}
          </Typography>
          <Typography
            id="testimonials-title"
            component="h2"
            sx={{
              fontSize: { xs: "1.8rem", sm: "2.4rem" },
              fontWeight: 700,
              color: "#1e1e2a",
              letterSpacing: "-0.02em",
              m: 0,
            }}
          >
            {title}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: "0.95rem",
              color: "rgba(30, 30, 42, 0.45)",
              lineHeight: 1.7,
              maxWidth: 480,
              m: 0,
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            width: "100%",
            position: "relative",
          }}
          aria-live="polite"
        >
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isActive={idx === current}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: 3,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }} role="tablist">
            {testimonials.map((t, idx) => (
              <Box
                key={t.id}
                component="button"
                role="tab"
                aria-selected={idx === current}
                aria-label={`شهادة ${t.name}`}
                onClick={() => goTo(idx)}
                sx={{
                  width: idx === current ? 48 : 28,
                  height: 3,
                  background: idx === current ? "#c9a84c" : "rgba(0, 0, 0, 0.05)",
                  border: "none",
                  borderRadius: "4px",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            <IconButton
              onClick={goPrev}
              aria-label="السابق"
              sx={{
                width: 44,
                height: 44,
                backgroundColor: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                borderRadius: "60px",
                color: "#1e1e2a",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(201, 168, 76, 0.12)",
                  borderColor: "#c9a84c",
                  color: "#c9a84c",
                },
                ...(isMobile && { width: 40, height: 40 }),
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              onClick={goNext}
              aria-label="التالي"
              sx={{
                width: 44,
                height: 44,
                backgroundColor: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                borderRadius: "60px",
                color: "#1e1e2a",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(201, 168, 76, 0.12)",
                  borderColor: "#c9a84c",
                  color: "#c9a84c",
                },
                ...(isMobile && { width: 40, height: 40 }),
              }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75 }} aria-live="polite">
          <Typography
            component="span"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.8rem" },
              fontWeight: 700,
              color: "#c9a84c",
              lineHeight: 1,
            }}
          >
            {String(current + 1).padStart(2, "0")}
          </Typography>
          <Typography component="span" sx={{ fontSize: "0.9rem", color: "rgba(30, 30, 42, 0.45)" }}>
            /
          </Typography>
          <Typography component="span" sx={{ fontSize: "0.85rem", color: "rgba(30, 30, 42, 0.45)" }}>
            {String(total).padStart(2, "0")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}