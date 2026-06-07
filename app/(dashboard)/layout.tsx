import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Cairo } from "next/font/google";
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={`bg-zinc-100 flex-1 flex flex-col min-h-screen${cairo.className} `}>
        <div className="p-4">
          <SidebarTrigger />
        </div>
        <div className="flex-1 p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}