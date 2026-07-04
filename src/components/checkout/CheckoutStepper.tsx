import { Check } from "lucide-react";

const STEPS = [
  { step: 1, label: "Cart" },
  { step: 2, label: "Delivery Details" },
  { step: 3, label: "Payment" },
  { step: 4, label: "Complete" },
] as const;

interface CheckoutStepperProps {
  activeStep: 1 | 2 | 3 | 4;
}

export function CheckoutStepper({ activeStep }: CheckoutStepperProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      {STEPS.map(({ step, label }, i) => {
        const isDone = step < activeStep;
        const isActive = step === activeStep;
        return (
          <div key={step} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-(family-name:--font-jost) text-[11px] ${
                  isDone
                    ? "bg-black text-white"
                    : isActive
                      ? "border border-black text-black"
                      : "border border-gray-300 text-gray-400"
                }`}
              >
                {isDone ? <Check size={13} strokeWidth={2} /> : step}
              </span>
              <span
                className={`font-(family-name:--font-jost) text-[13px] tracking-wide ${
                  isActive || isDone ? "text-black" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span className="h-px w-8 bg-gray-300 sm:w-16" />
            )}
          </div>
        );
      })}
    </div>
  );
}
