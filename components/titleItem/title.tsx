import { ITitle } from "@/interfaces/title.interface";

export default function Title({ label, mainTitle, subtitle }: ITitle) {
  return (
    <div className="py-10 px-4">
      {/* Eyebrow label */}
      <p className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.22em] uppercase text-orange-500 mb-3">
        {/* عقارات مصر */}
        <span className="inline-block w-2 h-2 rounded-full bg-orange-500/30 ring-2 ring-orange-500/20" />
        {label}
        <span className="block w-10 h-px bg-gradient-to-r from-orange-500 to-orange-300/0" />
      </p>

      {/* Main title */}
      <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-3">
        <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
          {/* مشاريعنا  */}
          {mainTitle}
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm font-light text-gray-400 tracking-wide max-w-md">
        {/* اكتشف وحدتك المستقبليه سارع بالحجز */}
        {subtitle}
      </p>

      {/* Decorative divider — premium multi-layer */}
      <div className="flex items-center gap-3 mt-6">
        <div className="h-[2px] w-14 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.3)]" />
        <div className="w-[6px] h-[6px] rounded-full bg-orange-500/50 ring-2 ring-orange-500/20" />
        <div className="h-px flex-1 bg-gradient-to-r from-gray-200 via-gray-200 to-transparent dark:from-gray-700 dark:via-gray-700 dark:to-transparent" />
      </div>
    </div>
  );
}
