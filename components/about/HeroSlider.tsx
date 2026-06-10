"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface SlideItem {
  id: number;
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary?: string;
  ctaSecondaryHref?: string;
}

const slides: SlideItem[] = [
  {
    id: 1,
    image: "/images/hero/slide-1.jpg",
    tag: "كومباوند فاخر",
    title: "حياة راقية في قلب القاهرة الجديدة",
    subtitle: "مجمع بلوم فيلدز — التجمع الخامس",
    ctaPrimary: "تصفح الوحدات",
    ctaPrimaryHref: "/properites",
    ctaSecondary: "تواصل معنا",
    ctaSecondaryHref: "/contactUs",
  },
  {
    id: 2,
    image: "/images/hero/slide-2.jpg",
    tag: "فيلات وتوين هاوس",
    title: "مساحات فاخرة تليق بأسلوب حياتك",
    subtitle: "كومباوند المقصد — العاصمة الإدارية",
    ctaPrimary: "اكتشف الآن",
    ctaPrimaryHref: "/properites?type=villa",
    ctaSecondary: "احجز جولة",
    ctaSecondaryHref: "/contactUs",
  },
  {
    id: 3,
    image: "/images/hero/slide-3.jpg",
    tag: "شقق فندقية",
    title: "استثمر بذكاء في أفضل المواقع",
    subtitle: "برج النيل — وسط البلد الجديدة",
    ctaPrimary: "تصفح العروض",
    ctaPrimaryHref: "/properites?type=apartment",
    ctaSecondary: "استشارة مجانية",
    ctaSecondaryHref: "/contactUs",
  },
];

const AUTO_PLAY_DURATION = 6000;

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const activeSlide = useMemo(
    () => slides[currentSlide],
    [currentSlide]
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, AUTO_PLAY_DURATION);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <Box
      component="section"
      aria-label="منصة العقارات الفاخرة"
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {slides.map((slide, index) => (
        <Box
          key={slide.id}
          sx={{
            position: "absolute",
            inset: 0,
            opacity: index === currentSlide ? 1 : 0,
            transform:
              index === currentSlide ? "scale(1)" : "scale(1.05)",
            transition:
              "opacity 1.2s ease, transform 6s ease",
            zIndex: index === currentSlide ? 1 : 0,
          }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            quality={100}
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.75))",
            }}
          />
        </Box>
      ))}

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 5,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            color: "#ffffff",
            py: {
              xs: 14,
              md: 18,
            },
          }}
        >
          <Typography
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              px: 3,
              py: 1,
              mb: 4,
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.15)",
              backgroundColor: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              color: "#b7791f",
              fontWeight: 700,
              fontSize: {
                xs: "0.85rem",
                md: "1rem",
              },
              letterSpacing: 1,
            }}
          >
            {activeSlide.tag}
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontWeight: 900,
              lineHeight: 1.1,
              maxWidth: "1100px",
              mx: "auto",
              mb: 3,
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
            }}
          >
            {activeSlide.title.split(" ").map((word, index) => (
              <Box
                key={`${word}-${index}`}
                component="span"
                sx={{
                  color:
                    index === activeSlide.title.split(" ").length - 1
                      ? "#b7791f"
                      : "#ffffff",
                  ml: 1,
                }}
              >
                {word}
              </Box>
            ))}
          </Typography>

          <Typography
            sx={{
              maxWidth: "800px",
              mx: "auto",
              mb: 6,
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.9,
              fontWeight: 400,
              fontSize: {
                xs: "1rem",
                md: "1.35rem",
              },
            }}
          >
            {activeSlide.subtitle}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href={activeSlide.ctaPrimaryHref}
              passHref
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  minWidth: 220,
                  height: 58,
                  borderRadius: "999px",
                  backgroundColor: "#b7791f",
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: "1rem",
                  boxShadow:
                    "0 10px 30px rgba(183, 121, 31, 0.35)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#966217",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                {activeSlide.ctaPrimary}
              </Button>
            </Link>

            {activeSlide.ctaSecondary &&
            activeSlide.ctaSecondaryHref ? (
              <Link
                href={activeSlide.ctaSecondaryHref}
                passHref
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    minWidth: 220,
                    height: 58,
                    borderRadius: "999px",
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#ffffff",
                      backgroundColor: "rgba(255,255,255,0.12)",
                    },
                  }}
                >
                  {activeSlide.ctaSecondary}
                </Button>
              </Link>
            ) : null}
          </Stack>
        </Box>
      </Container>

      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        {slides.map((slide, index) => (
          <Box
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: index === currentSlide ? 42 : 12,
              height: 12,
              borderRadius: "999px",
              cursor: "pointer",
              transition: "all 0.35s ease",
              backgroundColor:
                index === currentSlide
                  ? "#b7791f"
                  : "rgba(255,255,255,0.45)",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}