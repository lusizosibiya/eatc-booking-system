import express from "express";
import cors from "cors";
import clinicians from "./data/clinicians.js";
import bookings from "./data/bookings.js";

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the EATC Booking API!" });
});

app.get("/api/clinicians", (req, res) => {
  res.json(clinicians);
});

const serviceDurations = {
  initial: 90,
  followup: 60,
  couples: 120,
};

app.get("/api/slots", (req, res) => {
  const { date, clinicianId, serviceId } = req.query;

  const duration = serviceDurations[serviceId];

  if (!duration) {
    return res.status(400).json({
      message:
        "This service requires office assistance or a confirmed duration.",
    });
  }

  // Find the selected clinician.
  const clinician = clinicians.find((person) => person.id === clinicianId);

  if (!clinician || !clinician.services.includes(serviceId)) {
    return res.status(400).json({
      message: "Invalid clinician or service selection.",
    });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) {
    return res.status(400).json({
      message: "Please provide a valid date.",
    });
  }

  const selectedDay = new Date(`${date}T12:00:00+02:00`);

  if (
    Number.isNaN(selectedDay.getTime()) ||
    selectedDay.toISOString().slice(0, 10) !== date
  ) {
    return res.status(400).json({
      message: "Invalid calendar date.",
    });
  }

  // Schedule: Monday to Friday.
  const dayOfWeek = selectedDay.getUTCDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return res.json({ slots: [] });
  }

  const openingMinutes = 8 * 60;
  const closingMinutes = 16 * 60;
  const interval = 30;

  const slots = [];

  for (
    let start = openingMinutes;
    start + duration <= closingMinutes;
    start += interval
  ) {
    const end = start + duration;

    const toTime = (minutes) => {
      const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
      const mins = String(minutes % 60).padStart(2, "0");
      return `${hours}:${mins}`;
    };

    const startTime = toTime(start);
    const endTime = toTime(end);

    // Prevent selecting a time that has already passed.
    const appointmentStart = new Date(`${date}T${startTime}:00+02:00`);

    const isPast = appointmentStart.getTime() <= Date.now();

    // Check conflicts with requests already in memory.
    const hasConflict = bookings.some((booking) => {
      if (
        booking.clinicianId !== clinicianId ||
        booking.date !== date ||
        !["pending", "confirmed"].includes(booking.status)
      ) {
        return false;
      }

      const existingStart = booking.startMinutes;
      const existingEnd = booking.endMinutes;

      return start < existingEnd && end > existingStart;
    });

    slots.push({
      time: startTime,
      endTime,
      available: !isPast && !hasConflict,
    });
  }

  res.json({
    date,
    clinicianId,
    serviceId,
    duration,
    slots,
  });
});

app.post("/api/bookings", (req, res) => {
  const {
    serviceId,
    clinicianId,
    date,
    time,
    patientName,
    email,
    phone,
    paymentMethod,
    medicalAidName,
    medicalAidPlan,
    medicalAidOption,
    medicalAidNumber,
  } = req.body;

  const durations = {
    initial: 90,
    followup: 60,
    couples: 120,
  };

  const duration = durations[serviceId];

  if (!duration) {
    return res.status(400).json({
      message: "Please contact our office to arrange this service.",
    });
  }

  // This checks the clinicians eligibility.
  const clinician = clinicians.find((person) => person.id === clinicianId);

  if (!clinician || !clinician.services.includes(serviceId)) {
    return res.status(400).json({
      message: "The selected clinician cannot provide this service.",
    });
  }

  if (
    typeof patientName !== "string" ||
    !patientName.trim() ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof phone !== "string" ||
    !phone.trim()
  ) {
    return res.status(400).json({
      message: "Please provide valid patient contact information.",
    });
  }

  // Validate payment method.
  if (!["medicalAid", "cash"].includes(paymentMethod)) {
    return res.status(400).json({
      message: "Please select a valid payment method.",
    });
  }

  if (paymentMethod === "medicalAid") {
    const details = [
      medicalAidName,
      medicalAidPlan,
      medicalAidOption,
      medicalAidNumber,
    ];

    if (details.some((value) => typeof value !== "string" || !value.trim())) {
      return res.status(400).json({
        message: "Please complete all medical aid details.",
      });
    }
  }

  // Validate exact date and time format.
  if (
    typeof date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    typeof time !== "string" ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)
  ) {
    return res.status(400).json({
      message: "Invalid appointment date or time.",
    });
  }

  const appointmentDate = new Date(`${date}T12:00:00+02:00`);

  if (
    Number.isNaN(appointmentDate.getTime()) ||
    appointmentDate.toISOString().slice(0, 10) !== date
  ) {
    return res.status(400).json({
      message: "Invalid calendar date.",
    });
  }

  const day = appointmentDate.getUTCDay();

  if (day === 0 || day === 6) {
    return res.status(400).json({
      message: "Weekend appointments are unavailable.",
    });
  }

  const [hours, minutes] = time.split(":").map(Number);
  const startMinutes = hours * 60 + minutes;
  const endMinutes = startMinutes + duration;

  if (startMinutes < 480 || endMinutes > 960 || startMinutes % 30 !== 0) {
    return res.status(400).json({
      message: "The selected time is outside available hours.",
    });
  }

  const appointmentStart = new Date(`${date}T${time}:00+02:00`);

  if (appointmentStart.getTime() <= Date.now()) {
    return res.status(400).json({
      message: "Please choose a future appointment time.",
    });
  }

  // This checks for any overlapping, pending or confirmed requests.
  const conflict = bookings.some((booking) => {
    return (
      booking.clinicianId === clinicianId &&
      booking.date === date &&
      ["pending", "confirmed"].includes(booking.status) &&
      startMinutes < booking.endMinutes &&
      endMinutes > booking.startMinutes
    );
  });

  if (conflict) {
    return res.status(409).json({
      message:
        "This appointment time is no longer available. Please select another time.",
    });
  }

  const newBooking = {
    id: crypto.randomUUID(),
    serviceId,
    clinicianId,
    date,
    time,
    startMinutes,
    endMinutes,
    patientName: patientName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    paymentMethod,

    // Demo only
    medicalAid:
      paymentMethod === "medicalAid"
        ? {
            name: medicalAidName.trim(),
            plan: medicalAidPlan.trim(),
            option: medicalAidOption.trim(),
            number: medicalAidNumber.trim(),
          }
        : null,

    status: "pending",
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);

  res.status(201).json({
    message: "Appointment request received.",
    bookingId: newBooking.id,
    status: newBooking.status,
  });
});

app.get("/api/bookings/:date/:resource", (req, res) => {
  const { date, resource } = req.params;

  // Check the date format.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({
      message: "Please use YYYY-MM-DD format.",
    });
  }

  // Check that the date exists.
  const parsedDate = new Date(`${date}T12:00:00Z`);

  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    return res.status(400).json({
      message: "Invalid calendar date.",
    });
  }

  // Check whether the clinician exists.
  const clinician = clinicians.find((person) => person.id === resource);

  if (!clinician) {
    return res.status(404).json({
      message: "Clinician not found.",
    });
  }

  // Find matching bookings.
  const matchingBookings = bookings.filter(
    (booking) => booking.date === date && booking.clinicianId === resource,
  );

  return res.status(200).json({
    date,
    clinicianId: resource,
    bookings: matchingBookings,
  });
});

/*
  DELETE /api/bookings/:id

  Cancels an existing booking without deleting
  its record from the bookings array.
*/

app.delete("/api/bookings/:id", (req, res) => {
  const { id } = req.params;

  // Find the booking using its unique ID.
  const booking = bookings.find((item) => item.id === id);

  if (!booking) {
    return res.status(404).json({
      message: "Booking not found.",
    });
  }

  if (!["pending", "confirmed"].includes(booking.status)) {
    return res.status(409).json({
      message: "This booking cannot be cancelled.",
    });
  }

  // This changes the status instead of deleting the record.
  booking.status = "cancelled";
  booking.cancelledAt = new Date().toISOString();

  return res.status(200).json({
    message: "Booking cancelled successfully.",
    bookingId: booking.id,
    status: booking.status,
  });
});

app.get("/api/admin/bookings", (req, res) => {
  return res.status(200).json(bookings);
});

/*
  PATCH /api/admin/bookings/:id/status

  Approve or decline a pending booking.
*/

app.patch("/api/admin/bookings/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Find the booking.
  const booking = bookings.find((item) => item.id === id);

  if (!booking) {
    return res.status(404).json({
      message: "Booking not found.",
    });
  }

  if (!["confirmed", "declined"].includes(status)) {
    return res.status(400).json({
      message: "Status must be confirmed or declined.",
    });
  }

  if (booking.status !== "pending") {
    return res.status(409).json({
      message: "Only pending bookings can be approved or declined.",
    });
  }

  booking.status = status;

  return res.status(200).json({
    message: `Booking ${status} successfully.`,
    booking,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
