"use client";

import { useState, useRef, useEffect } from "react";
import { usePhoneInput, defaultCountries, parseCountry } from "react-international-phone";
import { ChevronDown, Search } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: "ua",
    value: value ?? "",
    countries: defaultCountries,
    disableDialCodeAndPrefix: true,
    onChange: ({ phone, inputValue: localInput }) => onChange(localInput.trim() ? phone : ""),
  });

  const filteredCountries = defaultCountries.filter((c) => {
    const { name, dialCode } = parseCountry(c);
    const q = searchQuery.toLowerCase();
    return name.toLowerCase().includes(q) || dialCode.includes(q);
  });

  function openDropdown() {
    setIsOpen(true);
    setSearchQuery("");
    setTimeout(() => searchRef.current?.focus(), 50);
  }

  function closeDropdown() {
    setIsOpen(false);
    setSearchQuery("");
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
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
            onClick={() => (isOpen ? closeDropdown() : openDropdown())}
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
            <span className="text-[16px] leading-none text-[#010101]">+{country.dialCode}</span>
            <ChevronDown
              size={24}
              strokeWidth={1.5}
              className={`-mb-1 text-[#010101] transition-transform duration-200 ease-in-out${isOpen ? " rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute left-0 top-full z-50 mt-1 w-64 border border-[#e0e0e0] bg-white shadow-md"
              >
                <div className="flex items-center gap-2 border-b border-[#e0e0e0] px-3 py-2">
                  <Search size={24} className="shrink-0 text-[#9a9a9a]" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="min-w-0 flex-1 bg-transparent text-[14px] text-[#010101] outline-none placeholder:text-[#9a9a9a]"
                  />
                </div>
                <ul className="max-h-52 overflow-y-auto">
                  {filteredCountries.map((c) => {
                    const parsed = parseCountry(c);
                    return (
                      <li key={parsed.iso2}>
                        <button
                          type="button"
                          onClick={() => {
                            setCountry(parsed.iso2);
                            closeDropdown();
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
                  {filteredCountries.length === 0 && (
                    <li className="px-4 py-3 text-[14px] text-[#9a9a9a]">No results</li>
                  )}
                </ul>
              </motion.div>
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
