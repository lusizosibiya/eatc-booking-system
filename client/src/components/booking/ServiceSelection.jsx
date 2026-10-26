import individualIcon from "../../assets/individual.png";
import coupleIcon from "../../assets/couple.png";
import assessmentsIcon from "../../assets/assessments.png";

const services = [
  {
    id: "initial",
    title: "Initial Individual Consultation",
    duration: "90 minutes",
    price: "R2,100 (Cash price)",
    description:
      "A comprehensive first session to understand your needs and goals.",
    icon: individualIcon,
  },
  {
    id: "followup",
    title: "Individual Follow-up Consultation",
    duration: "60 minutes",
    price: "R1,400 (Cash price)",
    description: "For existing clients continuing their therapy journey.",
    icon: individualIcon,
  },
  {
    id: "couples",
    title: "Couples Therapy Enquiry",
    duration: "Initial sessions: 90 minutes each",
    price: "R2,100 per partner (Cash price)",
    description:
      "Both partners are seen separately first, followed by joint sessions (120 minutes), mainly with our male psychologist.",
    icon: coupleIcon,
  },
  {
    id: "assessment",
    title: "Psychological Assessment",
    duration: "Duration and fees vary",
    price: "",
    description: "Comprehensive psychological assessments for various needs.",
    icon: assessmentsIcon,
  },
];

function ServiceSelection({ selectedService, onSelect }) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      {/* Left column */}
      <div>
        <p className="mb-3 text-sm font-bold tracking-[0.2em] text-[#A56A9F]">
          {" "}
          STEP 1 OF 4
        </p>
        <h1 className="text-3xl font-bold text-[#171C2E] sm:text-4xl">
          {" "}
          What type of appointment do you need?
        </h1>
        <p className="mb-7 mt-3 text-slate-500">
          {" "}
          Select the service that best suits your needs.
        </p>

        {/* Service cards */}
        <div className="space-y-4">
          {" "}
          {services.map((service) => {
            const isSelected = selectedService === service.id;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelect(service.id)}
                aria-pressed={isSelected}
                className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-[#29B4E4] bg-[#F0FAFF] shadow-sm"
                    : "border-slate-200 bg-white hover:border-[#29B4E4]"
                }`}
              >
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3E8F8]">
                  <img
                    src={service.icon}
                    alt=""
                    className="h-7 w-7 object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[#171C2E]">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {" "}
                    {service.duration} {service.price && ` · ${service.price}`}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                </div>

                <div
                  className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    isSelected ? "border-[#29B4E4]" : "border-slate-300"
                  }`}
                >
                  {isSelected && (
                    <div className="h-2.5 w-2.5 rounded-full bg-[#29B4E4]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right information panel */}
      <aside className="flex items-center justify-center">
        <div className="w-full max-w-[430px] rounded-3xl bg-gradient-to-br from-[#F2F9FD] to-[#F3E8F8] p-8 lg:p-10">
          <h2 className="text-2xl font-bold text-[#171C2E]">
            {" "}
            Not sure which service you need?
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Not sure which service is right for you? Contact our office manager
            for guidance before submitting your appointment request.
          </p>
          <a
            href="/#contact"
            className="mt-7 inline-flex rounded-full border border-[#29B4E4] px-7 py-3 font-medium text-[#29B4E4] hover:bg-white"
          >
            {" "}
            Contact Us →
          </a>
        </div>
      </aside>
    </div>
  );
}

export default ServiceSelection;
