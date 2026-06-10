import type { Metadata } from "next";
import Box from "@mui/material/Box";

import HeroSlider from "@/components/about/HeroSlider";
import OurStory from "@/components/about/OurStory";
import Statistics from "@/components/about/Statistics";
import Features from "@/components/about/Features";
import Testimonials from "@/components/about/Testimonials";

export const metadata: Metadata = {
  title: "من نحن | منصة العقارات الفاخرة",
  description:
    "تعرف على منصتنا العقارية — رحلتنا، رؤيتنا، وفريقنا المتخصص في تسويق أفضل الوحدات السكنية والاستثمارية في مصر.",
  keywords: [
    "عقارات مصر",
    "كومباوندات فاخرة",
    "شقق للبيع",
    "فلل للبيع",
    "منصة عقارية",
    "عقارات القاهرة الجديدة",
  ],
  openGraph: {
    title: "من نحن | منصة العقارات الفاخرة",
    description:
      "اكتشف كيف نساعدك في إيجاد وحدتك المثالية بشفافية واحترافية.",
    type: "website",
    locale: "ar_EG",
  },
};

export default function AboutPage() {
  return (
    <Box
      component="main"
      dir="rtl"
      sx={{
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeroSlider />
      <OurStory />
      <Statistics />
      <Features />
      <Testimonials />
    </Box>
  );
}