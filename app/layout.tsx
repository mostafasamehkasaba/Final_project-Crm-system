import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "Real Estate Project", 
=======
  title: "Real Estate Project",
>>>>>>> c4485813f52247aa1f0ceb0c7b5f22710cb34898
  description: "Best properties in Egypt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="ar" dir="rtl"> 
      <body className={`${cairo.variable} ${inter.variable} font-cairo antialiased`} suppressHydrationWarning>
        {children} 
      </body>
    </html>
  );
}
=======
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} ${inter.variable} font-cairo antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
>>>>>>> c4485813f52247aa1f0ceb0c7b5f22710cb34898
