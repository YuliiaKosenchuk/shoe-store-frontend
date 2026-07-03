interface RadioOption {
  value: string;
  label: string;
}

interface RadioOptionListProps {
  options: RadioOption[];
  selected: string;
  onChange: (value: string) => void;
}

export function RadioOptionList({ options, selected, onChange }: RadioOptionListProps) {
  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => {
        const checked = selected === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={checked}
            onClick={() => onChange(option.value)}
            className="flex items-center gap-3 text-left w-fit"
          >
            <span
              className={`flex-none w-4.5 h-4.5 rounded-full border-[1.25px] border-[#010101] ${
                checked ? "bg-[#010101]" : ""
              }`}
            />
            <span className="text-[14px] leading-[1.3] text-nrmal text-[#010101]" style={{ fontFamily: "var(--font-jost)" }}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
