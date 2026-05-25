"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react"

import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "الاسم مطلوب (حرفين على الأقل)" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  phoneNumber: z.string().min(6, { message: "رقم الهاتف مطلوب" })
})

export default function ContactUsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: ""
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className='w-full mx-auto px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start  mt-20 relative z-30 ' dir="rtl">
      
      
      <div className='lg:col-span-5 bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-zinc-200/50 border border-zinc-100/80 backdrop-blur-sm order-2 lg:order-1 max-w-5xl'>
        


        <h2 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight mb-6">
          سجل بياناتك للحصول على استشارة
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-bold text-zinc-800">الاسم </FormLabel>
                  <FormControl>
                    <Input placeholder="أحمد محمد" className="border-t-0 border-x-0 border-b-2 border-zinc-200 rounded-none bg-transparent px-0 pb-3 pt-1 focus-visible:ring-0 focus-visible:border-amber-500 transition-colors duration-300 placeholder:text-zinc-300 text-base text-rigth shadow-none font-medium" dir="rtl" {...field} />
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
                  <FormLabel className="text-sm font-bold text-zinc-800">البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input placeholder="example@domain.com" type="email" className="border-t-0 border-x-0 border-b-2 border-zinc-200 rounded-none bg-transparent px-0 pb-3 pt-1 focus-visible:ring-0 focus-visible:border-amber-500 transition-colors duration-300 placeholder:text-zinc-300 text-base text-right shadow-none font-medium" dir="rtl" {...field} />
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
                  <FormLabel className="text-sm font-bold text-zinc-800">رقم الهاتف</FormLabel>
                  <FormControl>
                    <Input placeholder="01xxxxxxxxx" className="border-t-0 border-x-0 border-b-2 border-zinc-200 rounded-none bg-transparent px-0 pb-3 pt-1 focus-visible:ring-0 focus-visible:border-amber-500 transition-colors duration-300 placeholder:text-zinc-300 text-base text-right shadow-none font-medium" dir="rtl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold py-6 rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20 text-center">
              إرسال الطلب الآن
            </Button>
          </form>
        </Form>
      </div>

     
      <div className='lg:col-span-6 space-y-4 order-1 lg:order-2 text-right pt-6 lg:pt-12 '>
        <div className="">
          <h3 className="text-sm font-bold tracking-wider uppercase text-amber-500">
            تواصل معنا مباشرة
          </h3>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 leading-tight">
            نحن هنا لمساعدتك في اتخاذ القرار الصحيح
          </h2>
          
          <p className="text-zinc-500 text-base leading-relaxed">
            تواصل مع مستشارينا العقاريين للحصول على مقارنات تفصيلية، زيارات ميدانية، وأفضل خطط الدفع المتاحة في السوق حالياً.
          </p>
        </div>

        
      </div>



    </div>
  )
}