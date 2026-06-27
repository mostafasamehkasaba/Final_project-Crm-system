"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, UserPlus, Building2 } from "lucide-react";
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
import { UserContext } from "../../(Context)/Context";
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
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["rePassword"],
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
      rePassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );
      const data = await res.json();

      if (!res.ok || !data.token) {
        form.setError("root", {
          message: data.message || "بيانات غير صحيحة، حاول مرة أخرى",
        });
        return;
      }

      localStorage.setItem("userToken2", data.token);
      setUserToken(data.token);
      router.push("/");
    } catch {
      form.setError("root", { message: "حدث خطأ، يرجى المحاولة لاحقاً" });
    }
  }

  return (
    <div
      className="min-h-screen flex  justify-center bg-background px-4 py-10"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center">
            <Building2 className="size-6 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight">
              إنشاء حساب جديد
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              أنشئ حسابك للبدء الآن
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-background border border-border rounded-2xl p-6 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Root error */}
              {form.formState.errors.root && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg px-4 py-3 text-center">
                  {form.formState.errors.root.message}
                </div>
              )}

              {/* الاسم */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      الاسم الكامل
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User
                          size={15}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                        />
                        <Input
                          placeholder="أحمد محمد"
                          className="pr-9 h-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* البريد */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      البريد الإلكتروني
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail
                          size={15}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                        />
                        <Input
                          placeholder="example@gmail.com"
                          className="pr-9 h-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* الهاتف */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      رقم الهاتف
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone
                          size={15}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                        />
                        <Input
                          placeholder="01xxxxxxxxx"
                          maxLength={11}
                          className="pr-9 h-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* كلمة المرور */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      كلمة المرور
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          size={15}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                        />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pr-9 h-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* تأكيد كلمة المرور */}
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      تأكيد كلمة المرور
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          size={15}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                        />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pr-9 h-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 bg-green-700 hover:bg-green-800 text-white rounded-full gap-2 mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    جاري الإنشاء...
                  </span>
                ) : (
                  <>
                    <UserPlus size={15} />
                    إنشاء حساب
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-muted-foreground mt-5">
          لديك حساب بالفعل؟{" "}
          <Link
            href="/login"
            className="text-green-700 font-medium hover:underline"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
