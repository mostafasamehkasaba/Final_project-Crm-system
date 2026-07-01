"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Mail, Phone, Lock, UserPlus, Building2, ShieldCheck, KeyRound } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { UserContext } from "../../(site)/(Context)/Context";
import Link from "next/link";

const formSchema = z
  .object({
    name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    phone: z
      .string()
      .min(11, "رقم الهاتف يجب أن يكون 11 رقماً")
      .max(11, "رقم الهاتف يجب أن يكون 11 رقماً"),
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within UserContext.Provider");
  }

  const { setUserToken } = userContext;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch(
        "https://back-end-crm-project.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        form.setError("root", {
          message: data.message || "حدث خطأ أثناء التسجيل",
        });
        return;
      }

      router.push("/login");
    } catch (error) {
      form.setError("root", {
        message: "حدث خطأ في الاتصال بالسيرفر",
      });
    }
  }

  return (
    <div
      className="relative flex h-screen items-center justify-center"
      dir="rtl"
    >
      <Image
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
        alt="عقار"
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 w-full max-w-2xl mx-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center">
            <Building2 className="size-6 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-xl text-white font-bold tracking-tight">
              إنشاء حساب جديد
            </h1>
            <p className="text-sm text-white mt-1">أنشئ حسابك للبدء الآن</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl shadow-black/50 backdrop-blur-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Root error */}
              {form.formState.errors.root && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 text-center font-medium animate-in fade-in duration-200">
                  {form.formState.errors.root.message}
                </div>
              )}

              {/* الاسم الكامل */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-300">
                      الاسم الكامل
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User
                          size={16}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                        />
                        <Input
                          placeholder="أحمد محمد"
                          className="pr-9 h-11 bg-zinc-950/60 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-green-600/50 focus-visible:border-green-600 transition-all rounded-xl"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              {/* البريد الإلكتروني */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-300">
                      البريد الإلكتروني
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail
                          size={16}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                        />
                        <Input
                          placeholder="example@gmail.com"
                          className="pr-9 h-11 bg-zinc-950/60 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-green-600/50 focus-visible:border-green-600 transition-all rounded-xl"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              {/* رقم الهاتف */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-300">
                      رقم الهاتف
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone
                          size={16}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                        />
                        <Input
                          placeholder="01xxxxxxxxx"
                          maxLength={11}
                          className="pr-9 h-11 bg-zinc-950/60 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-green-600/50 focus-visible:border-green-600 transition-all rounded-xl"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              {/* كلمة المرور */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-300">
                      كلمة المرور
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          size={16}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                        />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pr-9 h-11 bg-zinc-950/60 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-green-600/50 focus-visible:border-green-600 transition-all rounded-xl"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              {/* تأكيد كلمة المرور */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-300">
                      تأكيد كلمة المرور
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          size={16}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                        />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pr-9 h-11 bg-zinc-950/60 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-green-600/50 focus-visible:border-green-600 transition-all rounded-xl"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-green-700 hover:bg-green-800 active:scale-[0.98] text-white rounded-xl gap-2 mt-4 font-medium shadow-md shadow-green-700/20 transition-all"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    جاري الإنشاء...
                  </span>
                ) : (
                  <>
                    <UserPlus size={16} />
                    إنشاء حساب
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Trust strip */}
        <div className="flex items-center justify-center gap-6 text-zinc-500 text-xs">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-green-600" />
            <span>اتصال مشفّر وآمن</span>
          </div>
          <div className="flex items-center gap-1.5">
            <KeyRound size={14} className="text-green-600" />
            <span>بياناتك محمية</span>
          </div>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-zinc-400 mt-2">
          لديك حساب بالفعل؟{" "}
          <Link
            href="/login"
            className="text-green-500 font-semibold hover:text-green-400 hover:underline transition-colors"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}