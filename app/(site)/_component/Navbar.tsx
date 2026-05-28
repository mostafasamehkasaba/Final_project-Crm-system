"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";

import { useContext } from "react";
import { UserContext } from "../(Context)/Context";

// داخل الـ Navbar component:

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "موقع العقارات",
  },
  menu = [
    { title: "الرئيسية", url: "/" },
    { title: "من نحن", url: "/about" },
    { title: "العقارات", url: "/products" },
    { title: "اتصل بنا", url: "/contact-us" },
  ],
  auth = {
    login: { title: "تسجيل الدخول", url: "/login" },
    signup: { title: "إنشاء حساب", url: "/register" },
  },
  className,
}: NavbarProps) => {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const { UserToken, setUserToken } = useContext(UserContext)!;

  const handleLogout = () => {
    localStorage.removeItem("userToken2");
    setUserToken(null);
    window.location.href = "/";
  };

  return (
    <header
      dir="rtl"
      className={cn(
        "sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b",
        className,
      )}
    >
      <div className="container mx-auto">
        {/* ───── Desktop ───── */}
        <nav className="hidden lg:flex items-center justify-between h-16">
          {/* Logo */}
          <a href={logo.url} className="flex items-center gap-2 shrink-0 group">
            <img
              src={logo.src}
              className="h-8 w-auto dark:invert transition-transform group-hover:scale-105"
              alt={logo.alt}
            />
            <span className="text-base font-bold tracking-tight">
              {logo.title}
            </span>
          </a>

          {/* Links */}
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              {menu.reverse().map((item) => renderMenuItem(item, pathname))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth */}
          <div className="flex items-center gap-2">
            {UserToken ? (
              <Button
                variant="destructive"
                size="sm"
                className="rounded-full px-5"
                onClick={handleLogout}
              >
                تسجيل الخروج
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <a href={auth.login.url}>{auth.login.title}</a>
                </Button>
                <Button asChild size="sm" className="rounded-full px-5">
                  <a href={auth.signup.url}>{auth.signup.title}</a>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* ───── Mobile ───── */}
        <div className="flex lg:hidden items-center justify-between h-14">
          {/* Logo */}
          <a href={logo.url} className="flex items-center gap-2">
            <img
              src={logo.src}
              className="h-7 w-auto dark:invert"
              alt={logo.alt}
            />
            <span className="text-sm font-bold">{logo.title}</span>
          </a>

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

            <SheetContent side="right" className="w-72 overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle>
                  <a
                    href={logo.url}
                    className="flex items-center gap-2"
                    onClick={() => setSheetOpen(false)}
                  >
                    <img
                      src={logo.src}
                      className="h-7 w-auto dark:invert"
                      alt={logo.alt}
                    />
                    <span className="text-sm font-bold">{logo.title}</span>
                  </a>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  قائمة التنقل الرئيسية
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                <Accordion type="single" collapsible className="w-full">
                  {menu
                    .reverse()
                    .map((item) =>
                      renderMobileMenuItem(item, pathname, () =>
                        setSheetOpen(false),
                      ),
                    )}
                </Accordion>

                <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                  {UserToken ? (
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        handleLogout();
                        setSheetOpen(false);
                      }}
                    >
                      تسجيل الخروج
                    </Button>
                  ) : (
                    <>
                      <Button asChild variant="outline" className="w-full">
                        <a
                          href={auth.login.url}
                          onClick={() => setSheetOpen(false)}
                        >
                          {auth.login.title}
                        </a>
                      </Button>
                      <Button asChild className="w-full rounded-full">
                        <a
                          href={auth.signup.url}
                          onClick={() => setSheetOpen(false)}
                        >
                          {auth.signup.title}
                        </a>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

/* ─── Desktop menu item ─── */
const renderMenuItem = (item: MenuItem, pathname: string) => {
  const isActive = pathname === item.url;
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger
          className={cn(
            "text-sm font-medium bg-transparent hover:bg-muted",
            item.items.some((s) => pathname === s.url) && "text-primary",
          )}
        >
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground rounded-xl shadow-lg p-2">
          <ul className="w-64 flex flex-col gap-1">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <SubMenuLink
                    item={subItem}
                    active={pathname === subItem.url}
                  />
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className={cn(
          "inline-flex h-9 items-center justify-center rounded-md py-2 text-sm font-medium transition-colors",
          "hover:bg-muted hover:text-foreground focus:outline-none",
          isActive
            ? "bg-primary/10 text-primary font-semibold"
            : "text-muted-foreground",
        )}
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

/* ─── Mobile menu item ─── */
const renderMobileMenuItem = (
  item: MenuItem,
  pathname: string,
  onClose: () => void,
) => {
  const isActive = pathname === item.url;

  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-2 text-sm font-semibold hover:no-underline hover:text-primary">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="pb-1">
          <ul className="flex flex-col gap-1 pr-2">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <SubMenuLink
                  item={subItem}
                  active={pathname === subItem.url}
                  onClick={onClose}
                />
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a
      key={item.title}
      href={item.url}
      onClick={onClose}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-muted hover:text-primary",
      )}
    >
      {item.title}
    </a>
  );
};

/* ─── Sub-menu link ─── */
const SubMenuLink = ({
  item,
  active,
  onClick,
}: {
  item: MenuItem;
  active?: boolean;
  onClick?: () => void;
}) => (
  <a
    href={item.url}
    onClick={onClick}
    className={cn(
      "flex items-start gap-3 rounded-lg p-3 text-sm transition-colors",
      "hover:bg-muted hover:text-foreground",
      active && "bg-primary/10 text-primary",
    )}
  >
    {item.icon && (
      <span className="mt-0.5 shrink-0 text-muted-foreground">{item.icon}</span>
    )}
    <div>
      <p className="font-medium leading-none mb-1">{item.title}</p>
      {item.description && (
        <p className="text-xs text-muted-foreground leading-snug">
          {item.description}
        </p>
      )}
    </div>
  </a>
);

export default Navbar;
