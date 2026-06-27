"use client";

import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const timeline = [
  {
    year: "2019",
    title: "بداية الانطلاقة",
    description: "بدأت رحلتنا بهدف إعادة تعريف تجربة البحث عن العقارات الفاخرة في مصر بسؤال بسيط حول شفافية البيانات.",
  },
  {
    year: "2021",
    title: "توسّع المشاريع",
    description: "قمنا بإضافة مئات المشاريع المميزة داخل القاهرة الجديدة والعاصمة لخدمة عملائنا بشكل أوسع.",
  },
  {
    year: "2023",
    title: "شراكات استراتيجية",
    description: "أطلقنا تعاونات قوية ومباشرة مع أكبر شركات التطوير العقاري لتقديم فرص استثمارية حصرية.",
  },
  {
    year: "2025",
    title: "تجربة رقمية متكاملة",
    description: "طورنا منصة رقمية حديثة تجمع بين الفخامة، السرعة، والشفافية الكاملة التي يطمح لها السوق المصري.",
  },
];

export default function OurStory() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 6, md: 8 },
            alignItems: "center",
            mb: { xs: 8, md: 12 },
          }}
        >
          <Box sx={{ flex: 1, width: "100%" }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2.5,
                py: 0.8,
                mb: 3,
                borderRadius: "20px",
                backgroundColor: "rgba(183, 121, 31, 0.08)",
                color: "#b7791f",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.5px",
              }}
            >
              قصتنا
            </Box>

            <Typography
              component="h2"
              sx={{
                color: "#1a1a1a",
                fontWeight: 800,
                lineHeight: 1.3,
                mb: 3,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              نبني تجربة عقارية{" "}
              <Box component="span" sx={{ color: "#b7791f" }}>
                تليق بأسلوب حياتك
              </Box>
            </Typography>

            <Typography
              sx={{
                color: "#555555",
                lineHeight: 1.8,
                fontSize: "1.05rem",
                mb: 5,
                maxWidth: "680px",
              }}
            >
              بدأنا رحلتنا عام 2019 بسؤال بسيط: لماذا يصعب على المصريين إيجاد وحدتهم المثالية في سوق مليء بالفرص؟ آمنّا بأن التكنولوجيا قادرة على تغيير قواعد اللعبة العقارية فبنينا منصة تجمع بين الشفافية الكاملة والبيانات الدقيقة.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 4,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    color: "#b7791f",
                    fontWeight: 700,
                    mb: 1.5,
                    fontSize: "1.2rem",
                  }}
                >
                  رؤيتنا
                </Typography>
                <Typography sx={{ color: "#666666", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  أن نكون المرجع الأول والأكثر موثوقية للعقارات الفاخرة في السوق المصري والعربي من خلال الابتكار المستمر.
                </Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    color: "#b7791f",
                    fontWeight: 700,
                    mb: 1.5,
                    fontSize: "1.2rem",
                  }}
                >
                  رسالتنا
                </Typography>
                <Typography sx={{ color: "#666666", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  تبسيط رحلة البحث عن المنزل المثالي من خلال تقديم بيانات شفافة بالكامل وتجربة مستخدم استثنائية وسلسة.
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ flex: 1, width: "100%" }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 350, md: 500 },
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.06)",
              }}
            >
              <Image
                src="/images/about/office.jpg"
                alt="مقر الشركة ومعرض الوحدات العقارية"
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />

              <Box
                sx={{
                  position: "absolute",
                  bottom: 24,
                  right: 24,
                  backgroundColor: "#1a1a1a",
                  color: "#ffffff",
                  px: 3,
                  py: 1.5,
                  borderRadius: "14px",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                }}
              >
                <Typography sx={{ fontWeight: 700, color: "#b7791f", fontSize: "1.1rem", mb: 0.5 }}>
                  منذ 2019
                </Typography>
                <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)" }}>
                  نصنع تجارب عقارية فاخرة
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {timeline.map((item) => (
            <Box
              key={item.year}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  lg: "calc(25% - 18px)",
                },
                p: 4,
                borderRadius: "20px",
                backgroundColor: "#fdfdfd",
                border: "1px solid #f2f2f2",
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 15px 35px rgba(183, 121, 31, 0.06)",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#b7791f",
                  fontWeight: 800,
                  fontSize: "2.2rem",
                  mb: 1.5,
                  lineHeight: 1,
                }}
              >
                {item.year}
              </Typography>

              <Typography
                sx={{
                  color: "#1a1a1a",
                  fontWeight: 700,
                  mb: 1.5,
                  fontSize: "1.1rem",
                }}
              >
                {item.title}
              </Typography>

              <Typography sx={{ color: "#666666", lineHeight: 1.7, fontSize: "0.9rem" }}>
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}