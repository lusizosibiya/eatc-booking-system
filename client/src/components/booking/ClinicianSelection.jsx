import { useEffect, useState } from "react";
import thaboImage from "../../assets/thabo.png";
import nalediImage from "../../assets/naledi.png";
import leratoImage from "../../assets/lerato.png";
import amahleImage from "../../assets/amahle.png";

// Match the backend clinician IDs to their images.
const clinicianImages = {
  "psych-01": thaboImage,
  "psych-02": nalediImage,
  "counsellor-01": leratoImage,
  "counsellor-02": amahleImage,
};

function ClinicianSelection({ selectedService, selectedClinician, onSelect }) {
  const [clinicians, setClinicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get clinicians from our Express backend.
  useEffect(() => {
    fetch("http://localhost:3001/api/clinicians")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load clinicians.");
        }

        return response.json();
      })
      .then((data) => {
        setClinicians(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // This will only show clinicians who provide the selected service.
  const eligibleClinicians = clinicians.filter((clinician) =>
    clinician.services?.includes(selectedService),
  );

  return (
    <section>
      {/* Section heading */}
      <div className="mb-7">
        <p className="mb-3 text-sm font-bold tracking-[0.2em] text-[#A56A9F]">
          STEP 2 OF 4
        </p>
        <h1 className="text-3xl font-bold text-[#171C2E] sm:text-4xl">
          Choose a <span className="text-[#29B4E4]">clinician</span>
        </h1>
        <p className="mt-2 text-slate-500">
          {" "}
          Select your preferred psychologist or counsellor.
        </p>
        <p className="text-sm text-slate-500">
          {" "}
          Only clinicians who provide your selected service are shown.
        </p>
      </div>

      {/* Loading and error messages */}
      {loading && <p className="py-8 text-slate-600">Loading clinicians...</p>}

      {error && (
        <p role="alert" className="py-8 text-red-600">
          {error}
        </p>
      )}

      {/* Clinician cards */}
      {!loading &&
        !error &&
        (eligibleClinicians.length === 0 ? (
          <p className="rounded-xl bg-[#F2F9FD] p-6 text-slate-600">
            No clinicians are currently listed for this service. Please contact
            our office for assistance.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {eligibleClinicians.map((clinician) => {
              const isSelected = selectedClinician === clinician.id;

              return (
                <button
                  key={clinician.id}
                  type="button"
                  onClick={() => onSelect(clinician.id)}
                  aria-pressed={isSelected}
                  className={`flex h-full flex-col overflow-hidden rounded-xl border bg-white text-left 
                        transition-all hover:shadow-md ${
                          isSelected
                            ? "border-[#29B4E4] ring-2 ring-[#29B4E4]"
                            : "border-slate-200"
                        }`}
                >
                  <img
                    src={clinicianImages[clinician.id]}
                    alt={`Portrait of ${clinician.name}`}
                    className="h-60 w-full object-cover object-center"
                  />
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-lg font-semibold text-[#171C2E]">
                      {clinician.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {clinician.profession}
                    </p>
                    <p className="text-sm text-slate-500">{clinician.gender}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {clinician.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-5">
                      <span className="text-sm font-semibold text-[#29B4E4]">
                        {isSelected ? "Selected" : "Select Clinician"}
                      </span>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          isSelected ? "border-[#29B4E4]" : "border-slate-300"
                        }`}
                      >
                        {isSelected && (
                          <span className="h-2.5 w-2.5 rounded-full bg-[#29B4E4]" />
                        )}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
    </section>
  );
}

export default ClinicianSelection;
