import { Eye, EyeClosed, Info } from "lucide-react";
import { FieldProps, inputBase } from "./Field";

export type PasswordFieldProps = FieldProps & {
  show: boolean;
  onToggle: () => void;
  showInfo?: boolean;
};

export function PasswordField({
  label,
  registration,
  error,
  show,
  onToggle,
  autoComplete,
  placeholder,
  showInfo,
}: PasswordFieldProps) {
  return (
    <div>
      <label
        htmlFor={registration.name}
        className="relative mb-2 block text-[14px] font-medium leading-normal text-[#343434]"
      >
        {label}
        {showInfo && (
          <div className="group absolute z-10 left-17 top-1/2 -translate-y-1/2">
  <Info
    size={18}
    strokeWidth={1.5}
    className="cursor-default text-gray-400 hover:text-gray-600"
  />
  <div className="pointer-events-none absolute top-full left-0 mt-1 w-46 bg-white p-4 text-[14px] leading-normal text-[#323236] shadow-[0_0_15px_rgba(0,0,0,0.1)] opacity-0 transition-opacity group-hover:opacity-100 z-10">
    Use at least 8 characters, including a letter and a number
  </div>
</div>
        )}
      </label>
      <div className="relative">
        <input
          id={registration.name}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          {...registration}
          className={`${inputBase} ${showInfo ? "pr-16" : "pr-10"} ${error ? "border-[#DF4441]" : "border-[#4E4E4E]"}`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          tabIndex={-1}
        >
          {show ? (
            <Eye size={24} strokeWidth={1.5} />
          ) : (
            <EyeClosed size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>
      <p className="mt-2 h-5 text-[14px] text-[#DF4441]">{error || "\u00A0"}</p>
    </div>
  );
}
