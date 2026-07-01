"use client";

import { Menu, X, LogOut, Building2 } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Accordion } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";
import { UserContext } from "@/app/(site)/(Context)/Context";
import SiteToggleMode from "../SiteToggleMode";
import { DesktopMenuItem } from "@/components/navbar/DesktopMenuItem";
import { MobileMenuItem } from "@/components/navbar/MobileMenuItem";
import {
  NavbarProps,
  DEFAULT_LOGO,
  DEFAULT_MENU,
  DEFAULT_AUTH,
} from "../../types/navbar";

const Navbar = ({
  logo = DEFAULT_LOGO,
  menu = DEFAULT_MENU,
  auth = DEFAULT_AUTH,
  className,
}: NavbarProps) => {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { UserToken, setUserToken } = useContext(UserContext)!;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userToken2");
    setUserToken(null);
    window.location.href = "/";
  };

  const reversedMenu = [...menu].reverse();

  return (
    <div className="fixed top-4 left-0 right-0 z-50 w-full flex justify-center px-4 sm:px-6 lg:px-8">
      <header
        dir="rtl"
        className={cn(
          "w-full max-w-7xl border transition-all duration-300 border-zinc-800/50 text-white",
          scrolled
            ? "bg-zinc-950/90 backdrop-blur-md rounded-full shadow-xl shadow-black/40 py-1"
            : "bg-zinc-900/60 backdrop-blur-sm rounded-[2rem] py-2",
          className,
        )}
      >
        <div className="w-full px-6 sm:px-8">
          {/* ───── Desktop ───── */}
          <nav className="hidden lg:flex items-center justify-between h-14 gap-8">
            {/* Logo */}
            <Link
              href={logo.url}
              className="flex items-center gap-2 shrink-0 group"
            >
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center transition-all group-hover:scale-110 duration-200">
                <Building2 className="size-4 text-white" />
              </div>
              <span className="text-base font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">
                {logo.title}
              </span>
            </Link>

            {/* Links */}
            {/* 🛠️ التعديل السحري هنا: فرضنا لون خلفية داكنة ولون خط برتقالي عند الـ Hover لكسر ألوان Shadcn الافتراضية باحترافية */}
            <NavigationMenu className="flex-1 flex justify-center text-white [&_a]:text-white/90 [&_span]:text-white [&_ul_li_a:hover]:bg-zinc-800/70 [&_ul_li_a:hover]:text-orange-400 [&_ul_li_div:hover]:bg-zinc-800/70 [&_ul_li_div:hover]:text-orange-400 transition-all">
              <NavigationMenuList className="gap-1">
                {reversedMenu.map((item) => (
                  <DesktopMenuItem
                    key={item.title}
                    item={item}
                    pathname={pathname}
                  />
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-white [&_svg]:text-white [&_button]:text-white hover:[&_button]:bg-zinc-800/70 rounded-lg transition-colors">
                <SiteToggleMode />
              </div>
              
              <div className="w-px h-6 bg-zinc-800 mx-1" />
              {UserToken ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-full"
                  onClick={handleLogout}
                >
                  <LogOut className="size-4" />
                  تسجيل الخروج
                </Button>
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm" className="text-white hover:text-orange-400 font-medium hover:bg-zinc-800/50 rounded-full px-4">
                    <Link href={auth.login.url}>{auth.login.title}</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full px-5 bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-md shadow-orange-500/10 transition-all"
                  >
                    <Link href={auth.signup.url}>{auth.signup.title}</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>

          {/* ───── Mobile ───── */}
          <div className="flex lg:hidden items-center justify-between h-12">
            <Link href={logo.url} className="flex items-center gap-2">
              <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
                <Building2 className="size-3.5 text-white" />
              </div>
              <span className="text-sm font-bold text-white">{logo.title}</span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="text-white [&_svg]:text-white hover:[&_button]:bg-zinc-800/50 rounded-lg">
                <SiteToggleMode />
              </div>
              
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="القائمة" className="text-white hover:bg-zinc-800/50">
                    {sheetOpen ? (
                      <X className="size-5" />
                    ) : (
                      <Menu className="size-5" />
                    )}
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-72 flex flex-col p-0 bg-zinc-950 border-zinc-800 text-zinc-100"
                  dir="rtl"
                >
                  <SheetHeader className="p-5 pb-4">
                    <SheetTitle>
                      <Link
                        href={logo.url}
                        className="flex items-center gap-2"
                        onClick={() => setSheetOpen(false)}
                      >
                        <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
                          <Building2 className="size-3.5 text-white" />
                        </div>
                        <span className="text-sm font-bold text-white">{logo.title}</span>
                      </Link>
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                      قائمة التنقل الرئيسية
                    </SheetDescription>
                  </SheetHeader>

                  <Separator className="bg-zinc-800" />

                  {/* Nav links */}
                  <div className="flex-1 overflow-y-auto p-3 [&_span]:text-white">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full space-y-0.5"
                    >
                      {reversedMenu.map((item) => (
                        <MobileMenuItem
                          key={item.title}
                          item={item}
                          pathname={pathname}
                          onClose={() => setSheetOpen(false)}
                        />
                      ))}
                    </Accordion>
                  </div>

                  <Separator className="bg-zinc-800" />

                  {/* Auth buttons */}
                  <div className="p-4 space-y-2">
                    {UserToken ? (
                      <Button
                        variant="destructive"
                        className="w-full gap-2 rounded-full"
                        onClick={() => {
                          handleLogout();
                          setSheetOpen(false);
                        }}
                      >
                        <LogOut className="size-4" />
                        تسجيل الخروج
                      </Button>
                    ) : (
                      <>
                        <Button asChild variant="outline" className="w-full rounded-full border-zinc-800 text-zinc-300 bg-zinc-900/50">
                          <Link
                            href={auth.login.url}
                            onClick={() => setSheetOpen(false)}
                          >
                            {auth.login.title}
                          </Link>
                        </Button>
                        <Button
                          asChild
                          className="w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          <Link
                            href={auth.signup.url}
                            onClick={() => setSheetOpen(false)}
                          >
                            {auth.signup.title}
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;