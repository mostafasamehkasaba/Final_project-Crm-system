import { ITitle } from "@/interfaces/title.interface";

export default function Title({ label, mainTitle, subtitle }: ITitle) {
  return (
    <div className="py-10 px-4">
      {/* Eyebrow label */}
      <p className="flex items-center gap-2 text-xs font-normal tracking-[0.18em] uppercase text-orange-500 mb-2">
        {/* عقارات مصر */}
        {label}
        <span className="block w-8 h-px bg-orange-500" />
      </p>

      {/* Main title */}
      <h1 className="font-serif text-4xl font-semibold leading-tight text-gray-900 dark:text-white mb-3">
        <span className="text-orange-500">
          {/* مشاريعنا  */}
          {mainTitle}
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm font-light text-gray-500 tracking-wide">
        {/* اكتشف وحدتك المستقبليه سارع بالحجز */}
        {subtitle}
      </p>

      {/* Decorative divider */}
      <div className="flex items-center gap-3 mt-5">
        <div className="h-[1.5px] w-12 bg-orange-500 rounded" />
        <div className="w-[5px] h-[5px] rounded-full bg-orange-500 opacity-50" />
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
