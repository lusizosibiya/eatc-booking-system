
import individualIcon from "../../assets/individual.png";
import coupleIcon from "../../assets/couple.png";
import familyIcon from "../../assets/family.png";
import assessmentsIcon from "../../assets/assessments.png";

const services = [
  {
    id: 1,
    title: "Individual Therapy",
    description: "Support for personal growth and mental wellbeing.",
    icon: individualIcon,
    bgColor: "#DFF2FF",
  },
  {
    id: 2,
    title: "Couples Therapy",
    description: "Strengthening relationships and communication.",
    icon: coupleIcon,
    bgColor: "#F2E6F5",
  },
  {
    id: 3,
    title: "Family Support",
    description: "Guidance for families through life's challenges.",
    icon: familyIcon,
    bgColor: "#DFF2FF",
  },
  {
    id: 4,
    title: "Professional Assessments",
    description: "Comprehensive psychological assessments.",
    icon: assessmentsIcon,
    bgColor: "#F2E6F5",
  },
];

function ServicesPreview() {
  return (
    <section
      id="services"
      className="w-full bg-white px-5 py-8 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-[1600px] rounded-2xl bg-[#F2F9FD] px-6 py-8">

        {/* Responsive service cards */}
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">

          {services.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col items-center justify-center px-5 text-center
                ${index !== 0 ? "lg:border-l lg:border-gray-200" : ""}
              `}
            >

              {/* Icon with circular background */}
              <div
                className="mb-4 flex h-[76px] w-[76px] items-center justify-center rounded-full"
                style={{ backgroundColor: service.bgColor }}
              >
                <img
                  src={service.icon}
                  alt=""
                  className="h-10 w-10 object-contain"
                />
              </div>

              {/* Service title */}
              <h3 className="text-lg font-semibold text-black">
                {service.title}
              </h3>

              {/* Service description */}
              <p className="mt-1 max-w-[250px] text-base leading-snug text-gray-800">
                {service.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;
