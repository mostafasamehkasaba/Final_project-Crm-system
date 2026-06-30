"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPropertyById } from "../../services/getProperties.services";
import { Property } from "../../types/properites";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  MapPin,
  Loader2,
  Tag,
} from "lucide-react";
import CreateBooking from "@/components/booking/createBooking";
export default function PropertyDetailsPageSite() {
  const params = useParams();
  const id = (params.productID || params.id) as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
const [showBookingModal, setShowBookingModal] = useState(false);
  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getPropertyById(id);
        setProperty(data);
      } catch (err: any) {
        setError(err.message || "حدث خطأ أثناء تحميل تفاصيل العقار");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (isLoading) return <LoadingState />;
  if (error || !property) return <ErrorState />;

  const mainImage =
    property.images?.[0] ||
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6";

return (
  <>
    <div
      className="max-w-6xl mx-auto p-4 md:p-6 space-y-8 bg-white dark:bg-neutral-950 transition-colors duration-300"
      dir="rtl"
    >
      <Link
        href="/properites"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
      >
        <ArrowRight className="w-4 h-4" /> الرجوع للعقارات
      </Link>

      <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-md dark:shadow-black/40 ring-1 ring-slate-100 dark:ring-neutral-800">
        <Image
          src={mainImage}
          alt={property.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 dark:from-black/50 to-transparent pointer-events-none" />

        <span className="absolute top-4 right-4 bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5" />
          {property.bookType === "sale" ? "للبيع" : "للإيجار"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* باقي المحتوى */}
        </div>

        <div className="space-y-5">
          <div className="sticky top-24 border border-slate-100 dark:border-neutral-800 rounded-2xl p-6 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-black/30 space-y-4">
            <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wide">
              السعر المطلوب
            </span>

            <div className="text-3xl font-black text-green-700 dark:text-green-400">
              {property.price?.toLocaleString()}
              <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
                {" "}
                ج.م
              </span>
            </div>

            <button
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-green-700 dark:bg-green-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-green-800 dark:hover:bg-green-700 shadow-md shadow-green-900/20 dark:shadow-green-950/40 transition-all"
            >
              احجز العقار الآن
            </button>

            <p className="text-[11px] text-center text-slate-400 dark:text-zinc-500">
              سيتواصل معك أحد مستشارينا خلال 24 ساعة
            </p>
          </div>
        </div>
      </div>
    </div>

    {showBookingModal && (
      <CreateBooking
        propertyId={property._id}
        onClose={() => setShowBookingModal(false)}
      />
    )}
  </>
);
}

// مكونات صغيرة للتنظيم
const Badge = ({ icon, text }: { icon?: React.ReactNode; text: string }) => (
  <span className="bg-slate-50 dark:bg-neutral-800 border border-slate-100 dark:border-neutral-700 text-slate-700 dark:text-zinc-300 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1">
    {icon} {text}
  </span>
);

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2 bg-slate-50/60 dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 rounded-xl px-3 py-2.5">
    <CheckCircle2 className="w-4 h-4 text-green-700 dark:text-green-400 shrink-0" />
    <span className="text-xs font-medium text-slate-700 dark:text-zinc-300">
      {text}
    </span>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-[450px] gap-3 bg-white dark:bg-neutral-950">
    <Loader2 className="w-8 h-8 animate-spin text-green-700 dark:text-green-400" />
    <p className="text-sm text-slate-500 dark:text-zinc-400">
      جاري تحميل البيانات...
    </p>
  </div>
);

const ErrorState = () => (
  <div className="text-center p-10 bg-white dark:bg-neutral-950 min-h-[300px] flex flex-col items-center justify-center gap-3">
    <p className="text-red-500 dark:text-red-400 font-medium">
      عذراً، لم يتم العثور على هذا العقار.
    </p>
    <Link
      href="/products"
      className="text-green-700 dark:text-green-400 underline hover:text-green-800 dark:hover:text-green-300 transition-colors"
    >
      العودة للقائمة
    </Link>
  </div>
);
