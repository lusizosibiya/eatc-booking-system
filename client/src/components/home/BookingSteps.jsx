import { CalendarDays, UserRound, FileText, ArrowRight } from "lucide-react";

// Our four booking steps
const steps = [
  {
    number: 1,
    title: "Choose a Service",
    description: "Select the type of appointment you need.",
    icon: CalendarDays,
    color: "blue",
  },
  {
    number: 2,
    title: "Select a Clinician",
    description: "Choose your preferred psychologist or counsellor.",
    icon: UserRound,
    color: "purple",
  },
  {
    number: 3,
    title: "Pick a Date & Time",
    description: "View available appointment slots.",
    icon: CalendarDays,
    color: "blue",
  },
  {
    number: 4,
    title: "Submit Your Request",
    description:
      "Complete your details and we'll be in touch to confirm your appointment.",
    icon: FileText,
    color: "purple",
  },
];

function BookingSteps() {
  return (
    <section className="w-full bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        {/* Section heading */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#171C2E] sm:text-4xl">
            How to Book an <span className="text-[#29B4E4]">Appointment</span>
          </h2>

          <p className="mt-2 text-base text-slate-500">
            Requesting an appointment is simple and secure.
          </p>
        </div>

        {/* Booking steps */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => {
            // Choose colours based on the step.
            const isBlue = step.color === "blue";

            // Store the icon component in a variable.
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number and icon circles */}
                <div className="mb-5 flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold ${
                      isBlue
                        ? "bg-[#E5F5FD] text-[#29B4E4]"
                        : "bg-[#F3E8F8] text-[#A56A9F]"
                    }`}
                  >
                    {step.number}
                  </div>

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${
                      isBlue
                        ? "bg-[#E5F5FD] text-[#29B4E4]"
                        : "bg-[#F3E8F8] text-[#A56A9F]"
                    }`}
                  >
                    <Icon size={30} strokeWidth={1.7} />
                  </div>
                </div>

                {/* Text */}
                <h3 className="text-lg font-semibold text-[#171C2E]">
                  {step.title}
                </h3>

                <p className="mt-2 max-w-[245px] text-base leading-relaxed text-slate-500">
                  {step.description}
                </p>

                {/* Arrow between steps, desktop only */}
                {index < steps.length - 1 && (
                  <ArrowRight
                    size={22}
                    strokeWidth={1.8}
                    className="absolute -right-4 top-6 hidden text-slate-500 lg:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BookingSteps;
