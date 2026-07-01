"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, Building2, ShieldCheck, KeyRound } from "lucide-react";
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
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const router = useRouter();
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { setUserToken } = userContext;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch(
        "https://back-end-crm-project.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );
      const data = await res.json();

      // التعديل هنا: استخدام data.data.accessToken بدلاً من data.token
      if (!res.ok || !data.data?.accessToken) {
        form.setError("root", {
          message: data.message || "بيانات غير صحيحة، حاول مرة أخرى",
        });
        return;
      }

      // تخزين الـ Token الصحيح
      localStorage.setItem("userToken2", data.data.accessToken);
      setUserToken?.(data.data.accessToken);
      router.push("/");
    } catch {
      form.setError("root", { message: "حدث خطأ، يرجى المحاولة لاحقاً" });
    }
  }
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12"
      dir="rtl"
    >
      {/* خلفية احترافية: تدرج عميق + توهجات خضراء ناعمة + شبكة خطوط خفيفة */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(21,128,61,0.25),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(21,128,61,0.18),transparent_45%)]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/60 to-zinc-950" />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center shadow-lg shadow-green-700/20 transition-transform hover:scale-105 duration-300">
            <Building2 className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">تسجيل الدخول</h1>
            <p className="text-sm text-zinc-400 mt-1.5">
              أهلاً بعودتك، سجل دخولك للمتابعة في منصتك
            </p>
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

              {/* كلمة المرور */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-medium text-zinc-300">
                        كلمة المرور
                      </FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-green-500 hover:text-green-400 hover:underline transition-colors"
                      >
                        نسيت كلمة المرور؟
                      </Link>
                    </div>
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
                    جاري الدخول...
                  </span>
                ) : (
                  <>
                    <LogIn size={16} />
                    تسجيل الدخول
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-white  mt-5">
          ليس لديك حساب؟{" "}
          <Link
            href="/register"
            className="text-white font-medium hover:underline"
          >
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  );
}