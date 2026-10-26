import thaboImage from "../../assets/thabo.png";
import nalediImage from "../../assets/naledi.png";
import leratoImage from "../../assets/lerato.png";
import amahleImage from "../../assets/amahle.png";

const clinicianImages = {
  "psych-01": thaboImage,
  "psych-02": nalediImage,
  "counsellor-01": leratoImage,
  "counsellor-02": amahleImage,
};

function ClinicianCard({ clinician }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
      {/* Clinician photograph */}
      <img
        src={clinicianImages[clinician.id]}
        alt={`Portrait of ${clinician.name}`}
        className="h-72 w-full object-cover object-top"
      />

      {/* Clinician information */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold leading-tight text-black">
          {clinician.name}
        </h3>
        <p className="mt-2 text-sm text-gray-600">{clinician.profession}</p>
        <a
          href="#team"
          className="mt-auto pt-4 text-sm font-semibold text-[#29B4E4] hover:underline"
        >
          View Profile →
        </a>
      </div>
    </article>
  );
}

export default ClinicianCard;
