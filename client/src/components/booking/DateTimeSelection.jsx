import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
} from "lucide-react";

const serviceNames = {
  initial: "Initial Individual Consultation",
  followup: "Individual Follow-up Consultation",
  couples: "Couples Therapy Enquiry",
  assessment: "Psychological Assessment",
};

// Format a date without changing its local calendar day.
const formatDate = (year, month, day) => {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

const today = new Date();
const todayString = formatDate(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
);

function DateTimeSelection({ bookingData, onChange }) {
  const [displayMonth, setDisplayMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [slots, setSlots] = useState([]);
  const [clinicianName, setClinicianName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const year = displayMonth.getFullYear();
  const month = displayMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const monthTitle = displayMonth.toLocaleDateString("en-ZA", {
    month: "long",
    year: "numeric",
  });

  // Get the selected clinician's name.
  useEffect(() => {
    fetch("http://localhost:3001/api/clinicians")
      .then((response) => response.json())
      .then((data) => {
        const clinician = data.find(
          (person) => person.id === bookingData.clinicianId,
        );

        setClinicianName(clinician?.name || "");
      })
      .catch(() => setClinicianName(""));
  }, [bookingData.clinicianId]);

  // Fetch new time slots when the date or clinician changes.
  useEffect(() => {
    if (!bookingData.date || !bookingData.clinicianId) {
      setSlots([]);
      return;
    }

    const controller = new AbortController();

    const params = new URLSearchParams({
      date: bookingData.date,
      clinicianId: bookingData.clinicianId,
      serviceId: bookingData.serviceId,
    });

    setLoading(true);
    setError("");
    setSlots([]);

    fetch(`http://localhost:3001/api/slots?${params}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load appointment times.");
        }

        return response.json();
      })
      .then((data) => setSlots(data.slots))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [bookingData.date, bookingData.clinicianId, bookingData.serviceId]);

  // Change the month displayed in the calendar.
  const changeMonth = (amount) => {
    setDisplayMonth(
      (previous) =>
        new Date(previous.getFullYear(), previous.getMonth() + amount, 1),
    );
  };

  // Select a date and clear the previous time selection.
  const handleDateSelect = (date) => {
    onChange({
      date,
      time: "",
    });
  };

  // Format a selected date for the appointment summary.
  const displayDate = bookingData.date
    ? new Date(`${bookingData.date}T12:00:00`).toLocaleDateString("en-ZA", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not selected yet";

  const selectedSlot = slots.find(
    (slot) => slot.time === bookingData.time && slot.available,
  );

  // Determine whether the calendar can move backwards.
  const previousMonthAllowed =
    year > today.getFullYear() ||
    (year === today.getFullYear() && month > today.getMonth());

  return (
    <section>
      {/* Heading */}
      <div className="mb-8">
        <p className="mb-3 text-sm font-bold tracking-[0.2em] text-[#A56A9F]">
          STEP 3 OF 4
        </p>

        <h1 className="text-3xl font-bold text-[#171C2E] sm:text-4xl">
          Choose a <span className="text-[#29B4E4]">date and time</span>
        </h1>

        <p className="mt-2 text-slate-500">
          Select a date to view available appointment times for your chosen
          clinician.
        </p>
      </div>

      {/* Calendar, available times and summary */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Calendar */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              disabled={!previousMonthAllowed}
              aria-label="Previous month"
              className="rounded-lg p-2 hover:bg-slate-100 disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>

            <h2 className="font-semibold text-[#171C2E]">{monthTitle}</h2>

            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Weekday labels */}
          <div className="mb-3 grid grid-cols-7 gap-1 text-center text-xs text-slate-500">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }, (_, index) => (
              <span key={`empty-${index}`} />
            ))}

            {Array.from({ length: daysInMonth }, (_, index) => {
              const day = index + 1;
              const date = formatDate(year, month, day);
              const weekday = new Date(year, month, day).getDay();

              const isPast = date < todayString;
              const isWeekend = weekday === 0 || weekday === 6;

              const isDisabled = isPast || isWeekend;
              const isSelected = bookingData.date === date;

              return (
                <button
                  key={date}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleDateSelect(date)}
                  aria-label={date}
                  aria-pressed={isSelected}
                  className={`aspect-square rounded-full text-sm transition-colors ${
                    isSelected
                      ? "bg-[#29B4E4] font-semibold text-white"
                      : isDisabled
                        ? "cursor-not-allowed text-slate-300"
                        : "text-slate-700 hover:bg-[#E5F5FD]"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-5 border-t border-slate-100 pt-4 text-xs text-slate-500">
            <span>🔵 Selected</span>
            <span>⚪ Selectable weekday</span>
          </div>
        </div>

        {/* Available time slots */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#171C2E]">
            Available times
          </h2>

          <p className="mb-6 mt-1 text-sm text-slate-500">{displayDate}</p>

          {!bookingData.date && (
            <p className="text-sm text-slate-500">
              Please select a date on the calendar.
            </p>
          )}

          {loading && (
            <p className="text-sm text-slate-500">
              Checking available times...
            </p>
          )}

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          {!loading && !error && bookingData.date && (
            <>
              {slots.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No appointment times are available for this date.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {slots.map((slot) => {
                    const isSelected = bookingData.time === slot.time;

                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => onChange({ time: slot.time })}
                        aria-pressed={isSelected}
                        className={`rounded-lg border px-3 py-3 text-sm transition-colors ${
                          isSelected
                            ? "border-[#29B4E4] bg-[#29B4E4] text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:border-[#29B4E4]"
                        } disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-100 disabled:text-slate-400`}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Appointment summary */}
        <aside className="rounded-2xl bg-gradient-to-br from-[#F2F9FD] to-[#F3E8F8] p-6">
          <h2 className="mb-7 text-xl font-semibold text-[#171C2E]">
            Appointment details
          </h2>

          <div className="space-y-7">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-1 shrink-0 text-[#A56A9F]" />
              <div>
                <h3 className="font-semibold">Service</h3>
                <p className="text-sm text-slate-600">
                  {serviceNames[bookingData.serviceId]}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <UserRound className="mt-1 shrink-0 text-[#A56A9F]" />
              <div>
                <h3 className="font-semibold">Clinician</h3>
                <p className="text-sm text-slate-600">
                  {clinicianName || "Loading clinician..."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarDays className="mt-1 shrink-0 text-[#A56A9F]" />
              <div>
                <h3 className="font-semibold">Date</h3>
                <p className="text-sm text-slate-600">{displayDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock3 className="mt-1 shrink-0 text-[#A56A9F]" />
              <div>
                <h3 className="font-semibold">Time</h3>
                <p className="text-sm text-slate-600">
                  {selectedSlot
                    ? `${selectedSlot.time} – ${selectedSlot.endTime}`
                    : "Not selected yet"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-1 shrink-0 text-[#A56A9F]" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-sm text-slate-600">
                  EATC Rooms — location to be confirmed
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default DateTimeSelection;
