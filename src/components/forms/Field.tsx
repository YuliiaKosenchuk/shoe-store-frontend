import { UseFormRegisterReturn } from "react-hook-form";

export const inputBase =
  "w-full border bg-white px-[16px] py-[13px] text-[16px] text-[#010101] placeholder:text-[16px] placeholder:text-[#9a9a9a] outline-none transition-colors focus:border-[#7A2633]";

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
      <label htmlFor={registration.name} className="mb-2 block text-[14px] font-medium leading-normal text-[#343434]">
        {label}
      </label>
      <input
        id={registration.name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        {...registration}
        className={`${inputBase} ${error ? "border-[#DF4441]" : "border-[#4E4E4E]"}`}
      />
      <p className="mt-2 h-5 text-[14px] text-[#DF4441]">
    {error || '\u00A0'}
  </p>
    </div>
  );
}