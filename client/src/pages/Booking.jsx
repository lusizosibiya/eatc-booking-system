import { useEffect, useState } from "react";
import BookingProgress from "../components/booking/BookingProgress";
import ServiceSelection from "../components/booking/ServiceSelection";
import ClinicianSelection from "../components/booking/ClinicianSelection";
import DateTimeSelection from "../components/booking/DateTimeSelection";
import PatientDetails from "../components/booking/PatientDetails";

function Booking() {
  // Shows which step of the booking process are we on
  const [currentStep, setCurrentStep] = useState(1);

  // Store the patient's booking choices.
  const [bookingData, setBookingData] = useState({
    serviceId: null,
    clinicianId: null,
    date: "",
    time: "",

    // Patient information
    patientName: "",
    email: "",
    phone: "",

    // Payment information
    paymentMethod: "",
    medicalAidName: "",
    medicalAidPlan: "",
    medicalAidOption: "",
    medicalAidNumber: "",
  });

  const handleServiceSelect = (serviceId) => {
    setBookingData((previousData) => ({
      ...previousData,
      serviceId: serviceId,
      clinicianId: null,
      date: "",
      time: "",
    }));
  };

  const handleNext = () => {
    if (currentStep === 1 && !bookingData.serviceId) {
      return;
    }

    if (currentStep === 2 && !bookingData.clinicianId) {
      return;
    }

    if (currentStep === 3 && (!bookingData.date || !bookingData.time)) {
      return;
    }

    if (currentStep < 4) {
      setCurrentStep((previousStep) => previousStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((previousStep) => previousStep - 1);
    }
  };

  // Stores the selected clinician's name for the summary.
  const [clinicianName, setClinicianName] = useState("");

  // This makes a message pop-up when they submit.
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!bookingData.clinicianId) {
      setClinicianName("");
      return;
    }

    fetch("http://localhost:3001/api/clinicians")
      .then((response) => response.json())
      .then((clinicians) => {
        const selected = clinicians.find(
          (person) => person.id === bookingData.clinicianId,
        );

        setClinicianName(selected?.name || "");
      })
      .catch(() => setClinicianName(""));
  }, [bookingData.clinicianId]);

  const handleSubmit = async () => {
    if (
      !bookingData.patientName.trim() ||
      !bookingData.email.trim() ||
      !bookingData.phone.trim()
    ) {
      setSubmitError("Please complete all required personal details.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email.trim())) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    if (!bookingData.paymentMethod) {
      setSubmitError("Please select a payment method.");
      return;
    }

    // This will only show if Medical aid details are required.
    if (bookingData.paymentMethod === "medicalAid") {
      if (
        !bookingData.medicalAidName.trim() ||
        !bookingData.medicalAidPlan.trim() ||
        !bookingData.medicalAidOption.trim() ||
        !bookingData.medicalAidNumber.trim()
      ) {
        setSubmitError("Please complete all medical aid fields.");
        return;
      }
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("http://localhost:3001/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit your request.");
      }

      // Only display success if Express accepted the request.
      setShowConfirmation(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F2F9FD] px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1400px] rounded-3xl bg-white px-6 py-10 shadow-sm sm:px-10 lg:px-16">
        <BookingProgress currentStep={currentStep} />

        {/* Step 1: Choose a service */}
        {currentStep === 1 && (
          <ServiceSelection
            selectedService={bookingData.serviceId}
            onSelect={handleServiceSelect}
          />
        )}

        {/* Step 2: Choose an eligible clinician */}
        {currentStep === 2 && (
          <ClinicianSelection
            selectedService={bookingData.serviceId}
            selectedClinician={bookingData.clinicianId}
            onSelect={(clinicianId) => {
              setBookingData((previousData) => ({
                ...previousData,
                clinicianId: clinicianId,
                date: "",
                time: "",
              }));
            }}
          />
        )}

        {/* Step 3: Choose a date and time */}
        {currentStep === 3 && (
          <DateTimeSelection
            bookingData={bookingData}
            onChange={(updates) => {
              setBookingData((previousData) => ({
                ...previousData,
                ...updates,
              }));
            }}
          />
        )}

        {/* Step 4: Choose a payment option and submit request */}
        {currentStep === 4 && (
          <PatientDetails
            bookingData={bookingData}
            clinicianName={clinicianName}
            submitting={submitting}
            onChange={(updates) => {
              setBookingData((previousData) => ({
                ...previousData,
                ...updates,
              }));
              setSubmitError("");
            }}
          />
        )}

        {submitError && (
          <p role="alert" className="mt-5 text-sm font-medium text-red-600">
            {submitError}
          </p>
        )}

        <div className="mt-10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="rounded-full border border-[#29B4E4] px-8 py-3 font-medium text-[#29B4E4] disabled:opacity-40"
          >
            {" "}
            ← Back
          </button>
          <button
            type="button"
            onClick={currentStep === 4 ? handleSubmit : handleNext}
            disabled={
              submitting ||
              (currentStep === 1 && !bookingData.serviceId) ||
              (currentStep === 2 && !bookingData.clinicianId) ||
              (currentStep === 3 && (!bookingData.date || !bookingData.time))
            }
            className="rounded-full bg-gradient-to-r from-[#29B4E4] to-[#A56A9F] px-8 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting
              ? "Submitting..."
              : currentStep === 4
                ? "Submit Request →"
                : "Next Step →"}
          </button>
        </div>
      </div>

      {showConfirmation && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5"
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-title"
            className="w-full max-w-[480px] rounded-3xl bg-white p-8 text-center shadow-xl"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E5F5FD] text-3xl text-[#29B4E4]">
              ✓
            </div>
            <h2
              id="confirmation-title"
              className="text-2xl font-bold text-[#171C2E]"
            >
              {" "}
              Appointment Request Received!
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              {" "}
              Thank you for submitting your appointment request to EATC.
            </p>
            <p className="mt-3 leading-relaxed text-slate-600">
              Our office manager will review your request, including clinician
              availability and payment arrangements. You will receive
              communication regarding your appointment confirmation and any
              further steps.
            </p>
            <p className="mt-4 text-sm font-semibold text-red-700">
              Your appointment is not confirmed yet. Please wait for
              confirmation before attending or making any payment.
            </p>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="mt-7 w-full rounded-full bg-gradient-to-r from-[#29B4E4] to-[#A56A9F] px-8 py-3 font-semibold text-white"
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Booking;
