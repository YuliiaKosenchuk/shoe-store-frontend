import { Fragment } from "react";
import { Check } from "lucide-react";

const STEPS = [
  { step: 1, label: "Cart" },
  { step: 2, label: "Delivery Details" },
  { step: 3, label: "Payment" },
  { step: 4, label: "Confirmation" },
] as const;

interface CheckoutStepperProps {
  activeStep: 1 | 2 | 3 | 4;
}

export function CheckoutStepper({ activeStep }: CheckoutStepperProps) {
  return (
    <div className="flex w-full items-center py-6 sm:py-8 lg:pb-16">
      {STEPS.map(({ step, label }, i) => {
        const isDone = step < activeStep;
        const isActive = step === activeStep;
        return (
          <Fragment key={step}>
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-(family-name:--font-jost) font-normal text-[16px] leading-[1.3] ${
                  isDone
                    ? "border border-black text-black"
                    : isActive
                      ? "bg-[#010101] text-white"
                      : "border border-[#B3B3B3] text-[#B3B3B3]"
                }`}
              >
                {isDone ? (
                  <Check size={16} strokeWidth={2} />
                ) : (
                  <span className="inline-block" style={{ transform: "translateY(0.5px)" }}>
                    {step}
                  </span>
                )}
              </span>
              <span
                className={`hidden font-(family-name:--font-cormorant-garamond) text-[20px] font-semibold sm:inline ${
                  isActive || isDone ? "text-black" : "text-[#B3B3B3]"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={`mx-1.5 h-px flex-1 sm:mx-3 ${
                  isDone ? "bg-black" : "bg-[#B3B3B3]"
                }`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
