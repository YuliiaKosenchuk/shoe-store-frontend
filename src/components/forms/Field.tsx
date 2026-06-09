import { UseFormRegisterReturn } from "react-hook-form";

export const inputBase =
  "w-full border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-300 outline-none transition-colors focus:border-[#C4974A]";

export type FieldProps = {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
};

export function Field({ label, registration, error, type = "text", autoComplete, placeholder }: FieldProps) {
  return (
    <div>
      <label htmlFor={registration.name} className="mb-1 block text-[11px] text-gray-600">
        {label}
      </label>
      <input
        id={registration.name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        {...registration}
        className={`${inputBase} ${error ? "border-red-400" : "border-gray-300"}`}
      />
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}