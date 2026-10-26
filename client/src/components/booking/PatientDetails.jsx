import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  ClipboardList,
} from "lucide-react";

const serviceInfo = {
  initial: {
    name: "Initial Individual Consultation",
    duration: "90 minutes",
    price: "R2,100",
  },
  followup: {
    name: "Individual Follow-up Consultation",
    duration: "60 minutes",
    price: "R1,400",
  },
  couples: {
    name: "Couples Therapy Session",
    duration: "120 minutes",
    price: "To be confirmed",
  },
  assessment: {
    name: "Psychological Assessment",
    duration: "To be confirmed",
    price: "To be confirmed",
  },
};

function PatientDetails({ bookingData, onChange, clinicianName, submitting }) {
  const isMedicalAid = bookingData.paymentMethod === "medicalAid";
  const isCash = bookingData.paymentMethod === "cash";

  const service = serviceInfo[bookingData.serviceId];

  // Format the date for the booking summary.
  const formattedDate = bookingData.date
    ? new Date(`${bookingData.date}T12:00:00`).toLocaleDateString("en-ZA", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not selected";

  // Update a single field in our bookingData object.
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange({
      [name]: value,
    });
  };

  return (
    <section>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* LEFT COLUMN */}
        <div>
          <p className="mb-3 text-sm font-bold tracking-[0.2em] text-[#A56A9F]">
            STEP 4 OF 4
          </p>

          <h1 className="text-3xl font-bold text-[#171C2E] sm:text-4xl">
            Your details
          </h1>

          <p className="mb-7 mt-2 text-slate-500">
            Please provide your contact information so we can process your
            appointment request.
          </p>

          {/* Personal information */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 text-lg font-semibold text-[#171C2E]">
              Personal information
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="patientName"
                  className="mb-2 block text-sm font-medium"
                >
                  Full name <span className="text-red-500">*</span>
                </label>

                <input
                  id="patientName"
                  name="patientName"
                  type="text"
                  required
                  autoComplete="name"
                  value={bookingData.patientName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  disabled={submitting}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#29B4E4] focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email address <span className="text-red-500">*</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  placeholder="yourname@email.com"
                  disabled={submitting}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#29B4E4] focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Phone number <span className="text-red-500">*</span>
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 082 123 4567"
                  disabled={submitting}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#29B4E4] focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 text-lg font-semibold text-[#171C2E]">
              Payment method
            </h2>

            <div className="space-y-5">
              {/* Medical aid option */}
              <label className="flex cursor-pointer items-start gap-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="medicalAid"
                  checked={isMedicalAid}
                  onChange={() => onChange({ paymentMethod: "medicalAid" })}
                  disabled={submitting}
                  className="mt-1 h-5 w-5 accent-[#29B4E4]"
                />

                <span>
                  <span className="block font-semibold text-[#171C2E]">
                    Medical aid
                  </span>

                  <span className="mt-1 block text-sm text-slate-500">
                    Our office manager will check whether your medical aid is
                    accepted and whether you have sufficient benefits for the
                    appointment.
                  </span>
                </span>
              </label>

              {/* Conditional medical aid details */}
              {isMedicalAid && (
                <div className="rounded-xl border border-[#CDEAF9] bg-[#F2F9FD] p-5">
                  <h3 className="mb-2 font-semibold text-[#171C2E]">
                    Medical aid information
                  </h3>

                  <p className="mb-5 text-sm text-slate-600">
                    Please provide the following information for a benefit
                    check.
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="medicalAidName"
                        className="mb-2 block text-sm font-medium"
                      >
                        Medical aid name *
                      </label>

                      <input
                        id="medicalAidName"
                        name="medicalAidName"
                        type="text"
                        required
                        value={bookingData.medicalAidName}
                        onChange={handleInputChange}
                        placeholder="Medical aid name"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 outline-none focus:border-[#29B4E4]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="medicalAidPlan"
                        className="mb-2 block text-sm font-medium"
                      >
                        Medical aid plan *
                      </label>

                      <input
                        id="medicalAidPlan"
                        name="medicalAidPlan"
                        type="text"
                        required
                        value={bookingData.medicalAidPlan}
                        onChange={handleInputChange}
                        placeholder="Plan name"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 outline-none focus:border-[#29B4E4]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="medicalAidOption"
                        className="mb-2 block text-sm font-medium"
                      >
                        Medical aid option *
                      </label>

                      <input
                        id="medicalAidOption"
                        name="medicalAidOption"
                        type="text"
                        required
                        value={bookingData.medicalAidOption}
                        onChange={handleInputChange}
                        placeholder="Option name"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 outline-none focus:border-[#29B4E4]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="medicalAidNumber"
                        className="mb-2 block text-sm font-medium"
                      >
                        Membership number *
                      </label>

                      <input
                        id="medicalAidNumber"
                        name="medicalAidNumber"
                        type="text"
                        required
                        value={bookingData.medicalAidNumber}
                        onChange={handleInputChange}
                        placeholder="Membership number"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 outline-none focus:border-[#29B4E4]"
                      />
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-600">
                    Providing these details does not guarantee medical aid
                    authorisation or payment.
                  </p>
                </div>
              )}

              {/* Cash option */}
              <label className="flex cursor-pointer items-start gap-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={isCash}
                  onChange={() => onChange({ paymentMethod: "cash" })}
                  disabled={submitting}
                  className="mt-1 h-5 w-5 accent-[#29B4E4]"
                />

                <span>
                  <span className="block font-semibold text-[#171C2E]">
                    Cash / Self-pay
                  </span>

                  <span className="mt-1 block text-sm text-slate-500">
                    Initial consultation: R2,100
                    <br />
                    Follow-up consultation: R1,400
                  </span>
                </span>
              </label>

              {/* Conditional cash payment message */}
              {isCash && (
                <div className="rounded-xl border border-[#F3D7A4] bg-[#FFF8EB] p-4">
                  <p className="font-semibold text-[#8A5700]">
                    Advance payment required
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-[#795700]">
                    Cash-paying patients are required to pay before their
                    appointment can be confirmed. Please wait for communication
                    from our office confirming clinician availability and
                    providing payment instructions before making payment. Do not
                    assume your requested date is confirmed.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          {/* Booking summary */}
          <aside className="rounded-2xl bg-gradient-to-br from-[#F2F9FD] to-[#F3E8F8] p-6">
            <h2 className="mb-6 text-xl font-semibold text-[#171C2E]">
              Booking summary
            </h2>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <ClipboardList className="shrink-0 text-[#A56A9F]" size={21} />
                <div>
                  <p className="font-semibold">Service</p>
                  <p className="text-slate-600">
                    {service?.name} ({service?.duration})
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <UserRound className="shrink-0 text-[#A56A9F]" size={21} />
                <div>
                  <p className="font-semibold">Clinician</p>
                  <p className="text-slate-600">
                    {clinicianName || "Selected clinician"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays className="shrink-0 text-[#A56A9F]" size={21} />
                <div>
                  <p className="font-semibold">Date</p>
                  <p className="text-slate-600">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock3 className="shrink-0 text-[#A56A9F]" size={21} />
                <div>
                  <p className="font-semibold">Time</p>
                  <p className="text-slate-600">
                    {bookingData.time || "Not selected"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="shrink-0 text-[#A56A9F]" size={21} />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-slate-600">
                    EATC Rooms — location to be confirmed
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Important note — no shield icon */}
          <div
            role="note"
            className="rounded-2xl border border-red-300 bg-red-50 p-5"
          >
            <h2 className="font-bold text-red-700">
              IMPORTANT NOTE — Appointment Request Only
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-red-700">
              Submitting this form does not confirm your appointment. Our office
              manager will review clinician availability and payment
              arrangements before communicating with you.
            </p>

            <p className="mt-3 text-sm font-semibold text-red-700">
              Please do not arrive for an appointment until you have received
              confirmation from EATC.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PatientDetails;
