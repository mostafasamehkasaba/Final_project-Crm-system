import "../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { ThemeProvider } from "../../components/theme-provider";
import NavbarDash from "./NavbarDash";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // storageKey="theme"
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 w-full">
          <NavbarDash />
          {children}
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
