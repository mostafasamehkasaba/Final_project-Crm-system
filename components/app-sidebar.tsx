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
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Building2,
  Layers,
  ShoppingBag,
  Warehouse,
  Receipt,
  TrendingUp,
} from "lucide-react";

import Link from "next/link";
const menuItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم", href: "/dashboard" },
  {
    icon: Layers,
    label: "التصنيفات",
    href: "/categories",
    // children: [
    //   { label: "السجل", href: "/record" },
    //   { label: "المميز", href: "/featured" },
    // ],
  },
  { icon: ShoppingBag, label: "المنتجات", href: "/products" },
  { icon: Users, label: "المستخدمين", href: "/users" },
  { icon: Warehouse, label: "إدارة المخزن", href: "/storeManagement" },
  { icon: Receipt, label: "مصروفات", href: "/expenses" },
  { icon: TrendingUp, label: "الأرباح والخسائر", href: "/profitandloss" },
  { icon: Settings, label: "الإعدادات", href: "/settings" },
];

const footerItems = [{ icon: LogOut, label: "تسجيل الخروج", href: "/logout" }];

export function AppSidebar() {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <Sidebar collapsible="icon" side="right" dir="rtl">
      <SidebarHeader className="flex items-center justify-center  border-b border-zinc-300 p-4 ">
        <div className="flex items-center gap-3">
          {/* Logo Icon Container */}
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-700 text-white shadow-sm">
            <Building2 className="h-5 w-5" />
          </div>
          {/* System Name / Info */}
          <div className="flex flex-col text-right group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-sm text-zinc-950">
              نظام إدارة CRM
            </span>
            <span className="text-xs text-zinc-500">لوحة المسؤول</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="mt-3">
        <SidebarGroup>
          <SidebarMenu className="w-full px-2">
            {menuItems.map((item) =>
              item.children ? (
                <Collapsible
                  key={item.label}
                  className="group/collapsible w-full"
                >
                  <SidebarMenuItem className="w-full mb-1">
                    <CollapsibleTrigger style={{ cursor: "pointer" }} asChild>
                      <SidebarMenuButton
                        className={cn(
                          "flex items-center justify-between w-full h-12 px-4 rounded-xl transition-all duration-300",

                          pathname === item.href
                            ? "bg-green-700 text-white shadow-md shadow-green-700/20 pointer-events-none" // أخضر ثابت بدون هوفر
                            : "text-gray-500 hover:bg-green-50 hover:text-gray-950",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-6 h-6 shrink-0 stroke-[1.8]" />
                          <span className="font-medium text-sm">
                            {item.label}
                          </span>
                        </div>

                        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 text-current" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="pr-4 mt-1">
                      <SidebarMenuSub className="flex flex-col gap-1 border-r border-zinc-100 mr-4 pr-2">
                        {item.children.map((child) => (
                          <SidebarMenuSubItem key={child.label}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={child.href}
                                className={cn(
                                  "flex items-center w-full h-9 px-3 hover:px-4 rounded-lg text-sm transition-all",
                                  pathname === child.href
                                    ? "bg-green-600 text-white font-medium"
                                    : "text-gray-500 hover:bg-green-50 hover:px-5 hover:text-gray-950",
                                )}
                              >
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
                <SidebarMenuItem key={item.label} className="w-full mb-2">
                  <SidebarMenuButton
                    className={cn(
                      "flex items-center justify-start w-full py-3 h-12 px-4 gap-3 rounded-xl transition-all duration-300",
                      pathname === item.href
                        ? "bg-green-700 text-white shadow-md shadow-green-700/20 pointer-events-none" // أخضر ثابت تماماً
                        : "text-gray-500 hover:bg-green-50 hover:px-5 hover:text-gray-950",
                    )}
                    asChild
                  >
                    <Link
                      href={item.href}
                      className="flex items-center w-full h-full gap-3"
                    >
                      <item.icon className="h-6 w-6 shrink-0 stroke-[1.8]" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ),
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {footerItems.map((item) => (
          <SidebarMenuItem key={item.label} className="w-full mb-2">
            <SidebarMenuButton
              className={cn(
                "flex items-center justify-start w-full py-3 h-12 px-4 gap-3 rounded-xl transition-all duration-300",
                pathname === item.href
                  ? "bg-green-700 text-white shadow-md shadow-green-700/20 pointer-events-none" // أخضر ثابت تماماً
                  : "text-gray-500 hover:bg-green-50 hover:px-5 hover:text-gray-950",
              )}
              asChild
            >
              <Link
                href={item.href}
                className="flex items-center w-full h-full gap-3"
              >
                <item.icon className="h-6 w-6 shrink-0 stroke-[1.8]" />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarFooter>
    </Sidebar>
  );
}
