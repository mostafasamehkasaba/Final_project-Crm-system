import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "@/components/app-sidebar";
import NavbarDash from "./NavbarDash";
import InvoiceProvider from "./(context)/InvoiceContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <AppSidebar />

        <main className="bg-zinc-100 flex-1 flex flex-col min-h-screen">
          <NavbarDash />
          <div className="flex-1">{children}</div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
