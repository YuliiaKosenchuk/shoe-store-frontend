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
            <span className="flex-none w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
              {checked && <span className="w-2 h-2 rounded-full bg-[#7A2633]" />}
            </span>
            <span className="text-[14px] text-black">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
