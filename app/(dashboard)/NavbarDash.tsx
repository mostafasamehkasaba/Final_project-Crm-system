"use client";
import { SidebarTrigger } from "../../components/ui/sidebar";
import { Input } from "@/components/ui/input";
import {
  BellRing,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Plus,
  FilePlus,
  DollarSign,
  Package,
  CreditCard,
  UserPlus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function NavbarDash() {
  return (
    <div className="flex items-center">
      <SidebarTrigger className="mt-2 mr-4" />
      <div className="flex flex-1 items-center justify-between p-2 mt-2">
        <Input
          placeholder="بحث في العملاء، المنتجات، الفواتير..."
          className="focus-visible:ring-2 focus-visible:border-0 focus-visible:ring-green-700 w-100"
        />
        <div className="flex items-center gap-2 ms-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer whitespace-nowrap select-none">
                <Plus className="size-4" />
                إجراء جديد
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 mt-1 rounded-xl"
              // dir="rtl"
            >
              <DropdownMenuItem className="gap-3 py-2.5 cursor-pointer">
                <FilePlus className="size-4 text-green-700" />
                فاتورة جديدة
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-2.5 cursor-pointer">
                <DollarSign className="size-4 text-green-700" />
                دفعة جديدة
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-2.5 cursor-pointer">
                <Package className="size-4 text-green-700" />
                منتج جديد
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-2.5 cursor-pointer">
                <CreditCard className="size-4 text-green-700" />
                مصروف جديد
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-2.5 cursor-pointer">
                <UserPlus className="size-4 text-green-700" />
                عميل جديد
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="border-r-2 border-gray-300 dark:border-gray-700 pr-2">
            <span className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full transition-all cursor-pointer flex">
              <BellRing className="size-5" />
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer select-none transition-colors">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="grayscale"
                  />
                  <AvatarFallback>ا</AvatarFallback>
                </Avatar>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium">السيد حسني</span>
                  <span className="text-[11px] text-muted-foreground">
                    مدير النظام
                  </span>
                </div>
                <ChevronDown className="size-4 text-gray-400 ms-1" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-52 mt-1 rounded-xl"
              // dir="rtl"
            >
              {/* User info header */}
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 dark:border-gray-800">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="grayscale"
                  />
                  <AvatarFallback>ا</AvatarFallback>
                </Avatar>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold">السيد حسني</span>
                  <span className="text-[11px] text-muted-foreground">
                    مدير النظام
                  </span>
                </div>
              </div>
              <DropdownMenuItem className="gap-3 py-2.5 cursor-pointer mt-1">
                <User className="size-4 text-gray-500" />
                الملف الشخصي
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="gap-3 py-2.5 cursor-pointer">
                <Link href="settings" className="flex items-center gap-3">
                  <Settings className="size-4 text-gray-500" />
                  الإعدادات
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="gap-3 py-2.5 cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950"
              >
                <Link href="/logout" className="flex items-center gap-3">
                  <LogOut className="size-4" />
                  تسجيل خروج
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
