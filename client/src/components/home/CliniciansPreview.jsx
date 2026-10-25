
import { useEffect, useState } from "react";
import ClinicianCard from "../clinicians/ClinicianCard";

function CliniciansPreview() {
    const [clinicians, setClinicians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/api/clinicians")
        .then((response) => {
            if (!response.ok) {
            throw new Error("Failed to load clinicians");
            }

            return response.json();
                })
                .then((data) => setClinicians(data))
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));
            }, []);

    return (
        <section id="team" className="bg-[#F2F9FD] px-5 py-12 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-[1600px]">
                {/* Heading and button */}
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-black sm:text-4xl">Meet Our{" "}
                        <span className="text-[#29B4E4]">Clinicians</span>
                        </h2>
                        <p className="mt-2 text-base text-gray-700">
                        Our team of experienced psychologists and counsellors
                        are here to support you.
                        </p>
                    </div>
                    <a href="#team" className="group inline-flex w-fit shrink-0 rounded-full bg-gradient-to-r from-[#29B4E4] to-[#A56A9F] p-[2px] transition-transform duration-300 hover:scale-105">
                        <span className="flex items-center justify-center rounded-full bg-[#F2F9FD] px-8 py-3">
                            <span className="bg-gradient-to-r from-[#29B4E4] to-[#A56A9F] bg-clip-text text-sm font-semibold text-transparent">View Our Team</span>
                        </span>
                    </a>
                </div>

                {/* Loading and error messages */}
                {loading && (
                <p className="text-gray-600">Loading clinicians...</p>)}

                {error && (
                <p role="alert" className="text-red-600">{error}</p>)}

                {/* Clinician grid */}
                {!loading && !error && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{clinicians.map((clinician) => (
                    <ClinicianCard key={clinician.id} clinician={clinician}/>
                    ))}
                </div>
                )}
            </div>
        </section>
    );
}

export default CliniciansPreview;
