"use client"; // الحماية الأولى: قلب الملف لـ Client Component لإدارة الـ Lifecycle

import React, { useEffect, useState } from "react";
import "../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "@/components/app-sidebar";
import NavbarDash from "./NavbarDash";
import { InvoiceProvider } from "./(context)/InvoiceContext"; // تأكد من طريقة الـ Export (أقواس لو named)
import { PaymentProvider } from "./(context)/payment";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-zinc-100 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <AppSidebar />

        <main className="bg-zinc-100 flex-1 flex flex-col min-h-screen">
          <NavbarDash />
          <div className="flex-1">
            <InvoiceProvider>
  <PaymentProvider>
    {children}
  </PaymentProvider>
</InvoiceProvider>
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}