import { Eye, EyeOff } from "lucide-react";
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
      <label htmlFor={registration.name} className="mb-1 block text-[11px] text-gray-600">
        {label}
      </label>
      <div className="relative">
        <input
          id={registration.name}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          {...registration}
          className={`${inputBase} pr-10 ${error ? "border-red-400" : "border-gray-300"}`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          tabIndex={-1}
        >
          {show ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
        </button>
      </div>
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}