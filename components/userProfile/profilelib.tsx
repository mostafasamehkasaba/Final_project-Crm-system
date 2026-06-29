export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-wider text-green-700">
      {children}
    </h2>
  );
}
type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  autoComplete?: string;
};
export function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  icon,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`block w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20 ${
            icon ? "pl-10 pr-3" : "px-3"
          }`}
        />
      </div>
    </div>
  );
}
export function PrimaryButton({
  children,
  type = "button",
  onClick,
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-lg  bg-green-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-600/40 focus:ring-offset-2"
    >
      {children}
    </button>
  );
}
