"use client";

import { Box, Container, Typography, Card } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const FEATURES_DATA = [
  {
    id: 1,
    title: "دعم مبيعات 24/7",
    description: "فريق متخصص ماهر للإجابة على استفساراتك في أي وقت",
    icon: SupportAgentIcon,
  },
  {
    id: 2,
    title: "تحليل السوق العقاري",
    description: "تقارير دورية عن اتجاهات الأسعار ومعدلات النمو لتساعدك على اتخاذ قرار استثماري صحيح",
    icon: TrendingUpIcon,
  },
  {
    id: 3,
    title: "مطورون معتمدون فقط",
    description: "شركاؤنا يمرون بعملية تحقق وتقييم صارمة قبل الانضمام",
    icon: VerifiedUserIcon,
  },
];

export default function Features() {
  return (
    <Box
      component="section"
      dir="rtl"
      sx={{
        width: "100%",
        overflow: "hidden",
        bgcolor: "#ffffff",
        py: { xs: 4, md: 5 },
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: "radial-gradient(circle at 10% 20%, rgba(201, 168, 76, 0.02) 2px, transparent 2px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, md: 4 },
          px: { xs: 2.5, md: 4 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, textAlign: "center" }}>
          <Typography
            component="span"
            sx={{
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#c9a84c",
              bgcolor: "rgba(201, 168, 76, 0.12)",
              px: 2,
              py: 0.5,
              borderRadius: "40px",
            }}
          >
            منصتنا
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.6rem", sm: "2.1rem", md: "2.4rem" },
              fontWeight: 600,
              color: "#1e1e2a",
              lineHeight: 1.2,
              maxWidth: "700px",
            }}
          >
            منصة صممت لتجربة لا مثيل لها
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: "20px",
            width: "100%",
          }}
        >
          {FEATURES_DATA.map((feature) => (
            <Card
              key={feature.id}
              elevation={0}
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-start" },
                textAlign: { xs: "center", sm: "right" },
                p: "24px 20px",
                bgcolor: "#ffffff",
                borderRadius: "24px",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.02), 0 2px 6px rgba(0, 0, 0, 0.03)",
                transition: "all 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "rgba(201, 168, 76, 0.12)",
                  boxShadow: "0 20px 35px -12px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.02)",
                  bgcolor: "#fefefa",
                  "& .icon-wrapper": {
                    bgcolor: "#c9a84c",
                    color: "#ffffff",
                    transform: "scale(0.96)",
                  },
                  "& .accent-line": {
                    width: "70%",
                  },
                },
              }}
            >
              <Box
                className="icon-wrapper"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1.5,
                  width: "48px",
                  height: "48px",
                  bgcolor: "rgba(201, 168, 76, 0.12)",
                  borderRadius: "16px",
                  color: "#c9a84c",
                  transition: "all 0.3s ease",
                }}
              >
                <Box component={feature.icon} sx={{ fontSize: "22px" }} />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#1e1e2a",
                  mb: 0.5,
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.85rem",
                  color: "#4b4b5a",
                  lineHeight: 1.4,
                  opacity: 0.8,
                }}
              >
                {feature.description}
              </Typography>

              <Box
                className="accent-line"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "0%",
                  height: "3px",
                  background: "linear-gradient(90deg, #c9a84c, transparent)",
                  borderRadius: "3px",
                  transition: "width 0.4s ease",
                  display: { xs: "none", sm: "block" },
                }}
              />
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}