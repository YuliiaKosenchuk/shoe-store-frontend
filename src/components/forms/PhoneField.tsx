"use client";

import { useState, useRef, useEffect } from "react";
import { usePhoneInput, defaultCountries, parseCountry } from "react-international-phone";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const FLAG_URL = "https://purecatamphetamine.github.io/country-flag-icons/3x2/{XX}.svg";

type PhoneFieldProps = {
  label: string;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  error?: string;
  id?: string;
};

export function PhoneField({ label, value, onChange, error, id = "phone" }: PhoneFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: "ua",
    value: value ?? "",
    countries: defaultCountries,
    disableDialCodeAndPrefix: true,
    onChange: ({ phone }) => onChange(phone),
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[14px] font-medium leading-normal text-[#343434]"
      >
        {label}
      </label>
      <div
        className={`flex w-full items-stretch border bg-white transition-colors focus-within:border-[#7a2633] ${
          error ? "border-[#df4441]" : "border-[#4e4e4e]"
        }`}
      >
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            className="flex h-full items-center gap-2.5 border-r border-[#e0e0e0] px-4"
          >
            <span className="relative block h-5 w-7 overflow-hidden">
              <Image
                src={FLAG_URL.replace("{XX}", country.iso2.toUpperCase())}
                alt={country.iso2}
                fill
                unoptimized
                className="object-cover"
              />
            </span>
            <span className=" text-[16px] leading-none text-[#010101]">+{country.dialCode}</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="-mb-1"
            >
              <ChevronDown size={24} strokeWidth={1.5} className="text-[#010101]" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute left-0 top-full z-50 mt-1 max-h-60 w-64 overflow-y-auto border border-[#e0e0e0] bg-white shadow-md"
              >
                {defaultCountries.map((c) => {
                  const parsed = parseCountry(c);
                  return (
                    <li key={parsed.iso2}>
                      <button
                        type="button"
                        onClick={() => {
                          setCountry(parsed.iso2);
                          setIsOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2 hover:bg-[#f5f5f5]"
                      >
                        <span className="relative block h-5 w-7 shrink-0 overflow-hidden">
                          <Image
                            src={FLAG_URL.replace("{XX}", parsed.iso2.toUpperCase())}
                            alt={parsed.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </span>
                        <span className="w-12 text-left text-[14px] text-[#9a9a9a]">
                          +{parsed.dialCode}
                        </span>
                        <span className="text-left text-[14px] text-[#010101]">{parsed.name}</span>
                      </button>
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <input
          ref={inputRef}
          id={id}
          type="tel"
          value={inputValue}
          onChange={handlePhoneValueChange}
          placeholder="00 000 00 00"
          className="min-w-0 flex-1 bg-transparent px-4 py-3.25 text-[16px] text-[#010101] outline-none placeholder:text-[#9a9a9a]"
        />
      </div>
      <p className="mt-2 min-h-5 text-[14px] text-[#df4441]">{error}</p>
    </div>
  );
}
