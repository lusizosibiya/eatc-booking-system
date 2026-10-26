import { Check } from "lucide-react";

const steps = ["Service", "Clinician", "Date & Time", "Your Details"];

function BookingProgress({ currentStep }) {
  return (
    <nav aria-label="Booking progress" className="mb-12">
      <ol className="flex items-start justify-between">
        {" "}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <li
              key={step}
              className="flex min-w-0 flex-1 items-start"
              aria-current={isActive ? "step" : undefined}
            >
              <div className="flex min-w-0 flex-col items-center gap-2 text-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                    isActive || isCompleted
                      ? "bg-[#29B4E4] text-white"
                      : "bg-[#E8EDF5] text-slate-500"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={20} strokeWidth={2.5} />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className="text-xs font-medium text-slate-600 sm:text-sm">
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className={`mx-2 mt-5 h-[2px] flex-1 ${
                    isCompleted ? "bg-[#29B4E4]" : "bg-slate-200"
                  }`}
                ></div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default BookingProgress;
