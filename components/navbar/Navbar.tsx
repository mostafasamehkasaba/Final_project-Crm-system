"use client";

import { Menu, X, LogOut, Sun, Moon, Building2 } from "lucide-react";
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
    <header
      dir="rtl"
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-background/80 backdrop-blur-sm",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* ───── Desktop ───── */}
        <nav className="hidden lg:flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <Link
            href={logo.url}
            className="flex items-center gap-2 shrink-0 group"
          >
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 duration-200">
              <Building2 className="size-4 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight">
              {logo.title}
            </span>
          </Link>

          {/* Links */}
          <NavigationMenu className="flex-1 flex justify-center">
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
            <SiteToggleMode />
            <div className="w-px h-7 bg-border mx-1" />
            {UserToken ? (
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="size-4" />
                تسجيل الخروج
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="rounded-full px-5 bg-green-700 hover:bg-green-800 text-white"
                >
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* ───── Mobile ───── */}
        <div className="flex lg:hidden items-center justify-between h-14">
          <Link href={logo.url} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-green-700 rounded-lg flex items-center justify-center">
              <Building2 className="size-3.5 text-white" />
            </div>
            <span className="text-sm font-bold">{logo.title}</span>
          </Link>

          <div className="flex items-center gap-2">
            <SiteToggleMode />
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="القائمة">
                  {sheetOpen ? (
                    <X className="size-5" />
                  ) : (
                    <Menu className="size-5" />
                  )}
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-72 flex flex-col p-0"
                dir="rtl"
              >
                <SheetHeader className="p-5 pb-4">
                  <SheetTitle>
                    <Link
                      href={logo.url}
                      className="flex items-center gap-2"
                      onClick={() => setSheetOpen(false)}
                    >
                      <div className="w-7 h-7 bg-green-700 rounded-lg flex items-center justify-center">
                        <Building2 className="size-3.5 text-white" />
                      </div>
                      <span className="text-sm font-bold">{logo.title}</span>
                    </Link>
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    قائمة التنقل الرئيسية
                  </SheetDescription>
                </SheetHeader>

                <Separator />

                {/* Nav links */}
                <div className="flex-1 overflow-y-auto p-3">
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

                <Separator />

                {/* Auth buttons */}
                <div className="p-4 space-y-2">
                  {UserToken ? (
                    <Button
                      variant="destructive"
                      className="w-full gap-2"
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
                      <Button asChild variant="outline" className="w-full">
                        <Link
                          href={auth.login.url}
                          onClick={() => setSheetOpen(false)}
                        >
                          {auth.login.title}
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full rounded-full bg-green-700 hover:bg-green-800 text-white"
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
  );
};

export default Navbar;
