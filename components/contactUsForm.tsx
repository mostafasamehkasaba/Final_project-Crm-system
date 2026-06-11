"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MdMarkEmailRead, MdPlace } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { Button } from "./ui/button";
import { motion, Variants } from "motion/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "الاسم مطلوب (حرفين على الأقل)" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  phoneNumber: z.string().min(6, { message: "رقم الهاتف مطلوب" }),
});

export default function ContactUsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: index * 0.15, ease: "easeOut" },
    }),
  };
  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-30 mt-30"
      dir="rtl"
    >
      <div className="lg:col-span-5 space-y-6 text-right">
        <div className="space-y-2">
          <h3 className="text-sm font-bold tracking-wider text-amber-500 uppercase">
            تواصل معنا مباشرة
          </h3>
          <h2 className="text-2xl md:text-3xl font-black text-zinc-900 leading-tight">
            نحن هنا لمساعدتك في اتخاذ القرار الصحيح
          </h2>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
            تواصل مع مستشارينا العقاريين للحصول على مقارنات تفصيلية، زيارات
            ميدانية، وأفضل خطط الدفع المتاحة في السوق حالياً.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ x: -6 }}
            className="bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className="p-3 bg-amber-50 rounded-xl text-amber-500 text-2xl shrink-0">
              <MdMarkEmailRead />
            </div>
            <div>
              <h4 className="text-zinc-400 text-xs font-semibold mb-0.5">
                الايميل الخاص بالشركه
              </h4>
              <a
                href="mailto:Property66@gmail.com"
                className="text-zinc-900 font-bold text-base hover:text-amber-500 transition-colors block font-sans"
              >
                Property66@gmail.com
              </a>
            </div>
          </motion.div>

          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ x: -6 }}
            className="bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className="p-3 bg-amber-50 rounded-xl text-amber-500 text-xl shrink-0">
              <FaPhoneVolume />
            </div>
            <div>
              <h4 className="text-zinc-400 text-xs font-semibold mb-0.5">
                رقم الهاتف
              </h4>
              <a
                href="tel:0102514489"
                className="text-zinc-900 font-bold text-base hover:text-amber-500 transition-colors block tracking-wide"
              >
                0102514489
              </a>
            </div>
          </motion.div>

          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ x: -6 }}
            className="bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className="p-3 bg-amber-50 rounded-xl text-amber-500 text-xl shrink-0">
              <MdPlace />
            </div>
            <div>
              <h4 className="text-zinc-400 text-xs font-semibold mb-0.5">
                العنوان
              </h4>
              <p className="text-zinc-900 font-bold text-sm leading-relaxed">
                محافظه المنوفيه، شبين الكوم، امام نادي الجمهوريه
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-zinc-200/40 border border-zinc-100/80 backdrop-blur-sm w-full">
        <h2 className="text-xl md:text-2xl font-black text-zinc-900 tracking-tight mb-8">
          سجل بياناتك للحصول على استشارة عقارية مجانية
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-bold text-zinc-800">
                    الاسم بالكامل
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="أحمد محمد"
                      className="border-t-0 border-x-0 border-b-2 border-zinc-200 rounded-none bg-transparent px-0 pb-3 pt-1 focus-visible:ring-0 focus-visible:border-amber-500 transition-colors duration-300 placeholder:text-zinc-300 text-base text-right shadow-none font-medium"
                      dir="rtl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-bold text-zinc-800">
                    البريد الإلكتروني
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@domain.com"
                      type="email"
                      className="border-t-0 border-x-0 border-b-2 border-zinc-200 rounded-none bg-transparent px-0 pb-3 pt-1 focus-visible:ring-0 focus-visible:border-amber-500 transition-colors duration-300 placeholder:text-zinc-300 text-base text-right shadow-none font-medium"
                      dir="rtl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-bold text-zinc-800">
                    رقم الهاتف
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="01xxxxxxxxx"
                      className="border-t-0 border-x-0 border-b-2 border-zinc-200 rounded-none bg-transparent px-0 pb-3 pt-1 focus-visible:ring-0 focus-visible:border-amber-500 transition-colors duration-300 placeholder:text-zinc-300 text-base text-right shadow-none font-medium"
                      dir="rtl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 hover:[animation:bounce_1s_infinite] text-zinc-950 font-bold py-6 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/20 text-center text-base"
            >
              إرسال الطلب الآن
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
