import { Eye, EyeClosed } from "lucide-react";
import { FieldProps, inputBase } from "./Field";

export type PasswordFieldProps = FieldProps & {
  show: boolean;
  onToggle: () => void;
};

export function PasswordField({
  label,
  registration,
  error,
  show,
  onToggle,
  autoComplete,
  placeholder,
}: PasswordFieldProps) {
  return (
    <div>
      <label htmlFor={registration.name} className="mb-2 block text-[14px] font-medium leading-normal text-[#343434]">
        {label}
      </label>
      <div className="relative">
        <input
          id={registration.name}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          {...registration}
          className={`${inputBase} pr-10 ${error ? "border-[#DF4441]" : "border-[#4E4E4E]"}`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          tabIndex={-1}
        >
          {show ? <EyeClosed size={24} strokeWidth={1.5} /> : <Eye size={24} strokeWidth={1.5} />}
        </button>
      </div>
      <p className="mt-2 h-5 text-[14px] text-[#DF4441]">{error || "\u00A0"}</p>
    </div>
  );
}
