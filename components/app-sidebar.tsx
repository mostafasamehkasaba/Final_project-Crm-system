"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
  Building2,
  Layers,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

import ToggleMode from "./toggleMode";

const menuItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم", href: "/dashboard" },
  {
    icon: Layers,
    label: "المبيعات",
    href: "/sales",
    children: [
      { label: "العملاء", href: "/clients" },
      { label: "الفواتير", href: "/invoices" },
      { label: "المدفوعات", href: "/payments" },
    ],
  },
  {
    icon: ShoppingBag,
    label: "المنتجات",
    href: "/products",
    children: [
      { label: "الشقق السكنية", href: "/residentialapartments" },
      { label: "الفلل", href: "/villas" },
      { label: "العقارات السياحية", href: "/touristrealestate" },
    ],
  },
  { icon: TrendingUp, label: "الأرباح والخسائر", href: "/profitandloss" },
  { icon: Settings, label: "الإعدادات", href: "/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" side="right" dir="rtl">
      {/* ── Header ── */}
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-700 text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="font-bold text-sm leading-tight">
                نظام إدارة CRM
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">
                لوحة المسؤول
              </span>
            </div>
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <ToggleMode />
          </div>
        </div>
      </SidebarHeader>

      {/* ── Content ── */}
      <SidebarContent className="py-3">
        <SidebarGroup>
          <SidebarMenu className="px-2 space-y-0.5">
            {menuItems.map((item) =>
              item.children ? (
                <Collapsible
                  defaultOpen={true}
                  key={item.label}
                  className="group/collapsible w-full"
                >
                  <SidebarMenuItem className="w-full">
                    <CollapsibleTrigger asChild style={{ cursor: "pointer" }}>
                      <SidebarMenuButton
                        className={cn(
                          "flex items-center justify-between w-full h-11 px-3 rounded-xl transition-all duration-200",
                          pathname.startsWith(item.href)
                            ? "bg-green-700 text-white"
                            : "text-muted-foreground hover:bg-green-50 dark:hover:bg-green-950/30 hover:text-foreground",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 shrink-0 stroke-[1.8]" />
                          <span className="font-medium text-sm">
                            {item.label}
                          </span>
                        </div>
                        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="mt-0.5">
                      <SidebarMenuSub className="flex flex-col gap-0.5 border-r-2 border-green-100 dark:border-green-900 mr-5 pr-2 py-1">
                        {item.children.map((child) => (
                          <SidebarMenuSubItem key={child.label}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={child.href}
                                className={cn(
                                  "flex items-center w-full h-9 px-3 rounded-lg text-sm transition-all duration-200",
                                  pathname === child.href
                                    ? "bg-green-700/10 text-green-700 dark:text-green-400 font-medium"
                                    : "text-muted-foreground hover:bg-green-50 dark:hover:bg-green-950/30 hover:text-foreground",
                                )}
                              >
                                <span
                                  className={cn(
                                    "w-1.5 h-1.5 rounded-full me-2 shrink-0",
                                    pathname === child.href
                                      ? "bg-green-700"
                                      : "bg-muted-foreground/40",
                                  )}
                                />
                                {child.label}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.label} className="w-full">
                  <SidebarMenuButton
                    className={cn(
                      "flex items-center justify-start w-full h-11 px-3 gap-3 rounded-xl transition-all duration-200",
                      pathname === item.href
                        ? "bg-green-700 text-white pointer-events-none"
                        : "text-muted-foreground hover:bg-green-50 dark:hover:bg-green-950/30 hover:text-foreground",
                    )}
                    asChild
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 shrink-0 stroke-[1.8]" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ),
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer ── */}
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenuItem className="w-full list-none">
          <SidebarMenuButton
            className="flex items-center justify-start w-full h-11 px-3 gap-3 rounded-xl transition-all duration-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600"
            asChild
          >
            <Link href="/logout" className="flex items-center gap-3">
              <LogOut className="h-5 w-5 shrink-0 stroke-[1.8]" />
              <span className="font-medium text-sm">تسجيل الخروج</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
