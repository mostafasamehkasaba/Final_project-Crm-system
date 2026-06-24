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
  Search,
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

        {/* خط فاصل مرن */}
        <div className="h-5 w-[1px] bg-slate-200" />

        {/* 2. زر الإشعارات */}
        <button
          type="button"
          className="relative hover:bg-slate-50 p-2 md:p-2.5 rounded-xl transition-all cursor-pointer text-slate-500 hover:text-slate-900 shrink-0"
        >
          <BellRing className="size-4 md:size-5" />
          <span className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* خط فاصل مرن */}
        <div className="h-5 w-[1px] bg-slate-200" />

        {/* 3. قائمة معلومات الحساب الشخصي المتجاوبة */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 cursor-pointer select-none transition-all max-w-[160px] md:max-w-none">
              <Avatar className="w-8 h-8 border border-slate-100 shadow-inner shrink-0">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback className="bg-green-50 text-green-800 font-bold text-xs">
                  ح
                </AvatarFallback>
              </Avatar>

              {/* النصوص والاسم يختفي تماماً في شاشات الموبايل (hidden) ويظهر في الشاشات اللوحية فما فوق (md:flex) */}
              <div className="flex-col text-right hidden md:flex">
                <span className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[80px]">
                  السيد حسني
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  مدير النظام
                </span>
              </div>
              <ChevronDown className="size-3 text-slate-400 ms-0.5 hidden md:block shrink-0" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="w-52 mt-1.5 rounded-xl shadow-md border-slate-100 p-1"
          >
            {/* هيدر البروفايل داخل القائمة يظهر بوضوح في كل الشاشات لتأكيد الحساب الحالي */}
            <div
              dir="rtl"
              className="flex items-center gap-2.5 px-3 py-3 border-b border-slate-50 mb-1"
            >
              <Avatar className="w-8 h-8 border border-slate-100">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>ح</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-right">
                <span className="text-xs font-black text-slate-900">
                  السيد حسني
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[130px]">
                  hasni@admin.com
                </span>
              </div>
            </div>

            <DropdownMenuItem className="gap-3 py-2.5 px-3 rounded-lg text-xs font-medium cursor-pointer text-slate-700">
              <User className="size-4 text-slate-400" />
              <span>الملف الشخصي</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              asChild
              className="gap-3 py-2.5 px-3 rounded-lg text-xs font-medium cursor-pointer text-slate-700"
            >
              <Link href="/settings">
                <Settings className="size-4 text-slate-400" />
                <span>الإعدادات العامة</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-slate-50" />

            <DropdownMenuItem
              asChild
              className="gap-3 py-2.5 px-3 rounded-lg text-xs font-bold cursor-pointer text-red-500 focus:text-red-600 focus:bg-red-50/70"
            >
              <Link href="/logout">
                <LogOut className="size-4" />
                <span>تسجيل الخروج</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
