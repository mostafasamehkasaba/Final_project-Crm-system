"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { Box, Typography, ButtonBase, Container } from "@mui/material";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

type FeatureItem = {
  id: number;
  icon: string;
  title: string;
  body: string;
  highlight?: string | null;
  highlightLabel?: string | null;
  backgroundImage: string;
};

const FEATURES_DATA: FeatureItem[] = [
  {
    id: 1,
    icon: "shield",
    title: "توثيق كامل لكل وحدة",
    body: "كل وحدة مسجلة بمستنداتها القانونية الكاملة وتفاصيل التشطيب قبل عرضها على المنصة. لا مفاجآت، لا غموض.",
    highlight: "100%",
    highlightLabel: "وحدات موثقة",
    backgroundImage: "/images/features/feature-1.jpg",
  },
  {
    id: 2,
    icon: "map-pin",
    title: "بحث جغرافي دقيق",
    body: "ابحث بالمنطقة، الحي، أو المسافة من أي معلم. خريطة تفاعليةعرض كل الوحدات المتاحة.",
    backgroundImage: "/images/features/feature-2.jpg",
  },
  {
    id: 3,
    icon: "clock",
    title: "تحديث فوري للأسعار",
    body: "أسعار محدّثة لحظياً من المطورين مباشرة دون وسطاء.",
    backgroundImage: "/images/features/feature-3.jpg",
  },
  {
    id: 4,
    icon: "support",
    title: "دعم مبيعات 24/7",
    body: "فريق متخصص جاهز للإجابة على استفساراتك في أي وقت.",
    backgroundImage: "/images/features/feature-4.jpg",
  },
  {
    id: 5,
    icon: "chart-line",
    title: "تحليل السوق العقاري",
    body: "تقارير دورية عن اتجاهات الأسعار ومعدلات البيع في كل منطقة لتساعدك على اتخاذ قرار استثماري صحيح.",
    highlight: "6",
    highlightLabel: "مدن مصرية",
    backgroundImage: "/images/features/feature-5.jpg",
  },
  {
    id: 6,
    icon: "verified",
    title: "مطورون معتمدون فقط",
    body: "شركاؤنا يمرون بعملية تحقق وتقييم صارمة قبل الانضمام.",
    backgroundImage: "/images/features/feature-6.jpg",
  },
];

function FeatureIcon({ name }: { name: string }) {
  const iconStyles = { fontSize: "24px" };

  switch (name) {
    case "shield":
      return <ShieldOutlinedIcon sx={iconStyles} />;
    case "map-pin":
      return <LocationOnOutlinedIcon sx={iconStyles} />;
    case "clock":
      return <AccessTimeOutlinedIcon sx={iconStyles} />;
    case "support":
      return <HeadsetMicOutlinedIcon sx={iconStyles} />;
    case "chart-line":
      return <ShowChartOutlinedIcon sx={iconStyles} />;
    case "verified":
      return <VerifiedUserOutlinedIcon sx={iconStyles} />;
    default:
      return null;
  }
}

export default function Features() {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setCardsPerView(1);
      } else {
        setCardsPerView(3);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalGroups = Math.ceil(FEATURES_DATA.length / cardsPerView);

  const nextGroup = useCallback(() => {
    setCurrentGroup((prev) => (prev + 1) % totalGroups);
  }, [totalGroups]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    timerRef.current = setInterval(() => {
      nextGroup();
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isAutoPlaying, nextGroup]);

  const startIndex = (currentGroup % totalGroups) * cardsPerView;
  const visibleFeatures = FEATURES_DATA.slice(startIndex, startIndex + cardsPerView);

  return (
    <Box
      component="section"
      dir="rtl"
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        py: { xs: "60px", md: "80px", lg: "100px" },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: "20px", sm: "40px", md: "60px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "12px",
            mb: "48px",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "#c9a84c",
              textTransform: "uppercase",
              backgroundColor: "rgba(201,168,76,0.1)",
              px: "16px",
              py: "5px",
              borderRadius: "40px",
            }}
          >
            لماذا نحن
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
              fontWeight: 700,
              color: "#1e1e2a",
              letterSpacing: "-0.02em",
            }}
          >
            منصة صُممت لتجربة لا مثيل لها
          </Typography>

          <Typography
            component="p"
            sx={{
              fontSize: "0.95rem",
              color: "#667085",
              maxWidth: "500px",
            }}
          >
            كل تفصيلة في منصتنا مبنية لتوفير رحلة بحث عقاري شفافة وسهلة ومتكاملة.
          </Typography>
        </Box>

        <Box
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: "24px", lg: "28px" },
            }}
          >
            {visibleFeatures.map((feature) => (
              <Box
                key={feature.id}
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "28px",
                  aspectRatio: "4 / 5",
                  border: "1px solid rgba(0,0,0,0.05)",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.03)",
                  transition: "transform .3s cubic-bezier(.2,.9,.4,1.1), box-shadow .3s cubic-bezier(.2,.9,.4,1.1)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 35px -12px rgba(0,0,0,0.1)",
                  },
                  "&:hover .feature-image": {
                    transform: "scale(1.05)",
                  },
                  "&:hover .headline-line": {
                    width: "70%",
                  },
                }}
              >
                <Box sx={{ position: "absolute", inset: 0 }}>
                  <Image
                    src={feature.backgroundImage}
                    alt={feature.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="feature-image"
                    style={{
                      objectFit: "cover",
                      transition: "transform .5s cubic-bezier(.2,.9,.4,1.1)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to bottom, rgba(0,0,0,.2), rgba(0,0,0,.75))",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    p: "24px",
                  }}
                >
                  <Box
                    sx={{
                      width: "48px",
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "20px",
                      color: "#c9a84c",
                      backgroundColor: "rgba(255,255,255,.95)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <FeatureIcon name={feature.icon} />
                  </Box>

                  {feature.highlight && (
                    <Box
                      sx={{
                        position: "absolute",
                        left: "20px",
                        bottom: "20px",
                        direction: "ltr",
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          display: "block",
                          fontSize: "2.2rem",
                          fontWeight: 800,
                          color: "#ffffff",
                          lineHeight: 1,
                          textShadow: "0 2px 4px rgba(0,0,0,0.4)",
                        }}
                      >
                        {feature.highlight}
                      </Typography>

                      {feature.highlightLabel && (
                        <Typography
                          component="span"
                          sx={{
                            display: "block",
                            mt: "4px",
                            fontSize: ".7rem",
                            color: "rgba(255,255,255,.9)",
                            textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                          }}
                        >
                          {feature.highlightLabel}
                        </Typography>
                      )}
                    </Box>
                  )}

                  <Box sx={{ mt: "16px" }}>
                    <Typography
                      component="h3"
                      sx={{
                        position: "relative",
                        display: "inline-block",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        mb: "8px",
                        textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                      }}
                    >
                      {feature.title}
                      <Box
                        className="headline-line"
                        sx={{
                          position: "absolute",
                          bottom: "-4px",
                          right: 0,
                          width: "0%",
                          height: "2px",
                          backgroundColor: "#c9a84c",
                          transition: "width .3s ease",
                        }}
                      />
                    </Typography>

                    <Typography
                      component="p"
                      sx={{
                        fontSize: ".85rem",
                        lineHeight: 1.5,
                        color: "rgba(255,255,255,.85)",
                        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      }}
                    >
                      {feature.body}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {totalGroups > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              mt: "40px",
            }}
          >
            {Array.from({ length: totalGroups }).map((_, index) => (
              <ButtonBase
                key={index}
                onClick={() => setCurrentGroup(index)}
                sx={{
                  width: index === currentGroup ? "28px" : "10px",
                  height: "10px",
                  p: 0,
                  borderRadius: index === currentGroup ? "20px" : "50%",
                  backgroundColor: index === currentGroup ? "#c9a84c" : "rgba(0,0,0,.2)",
                  transition: "all .2s",
                }}
              />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}