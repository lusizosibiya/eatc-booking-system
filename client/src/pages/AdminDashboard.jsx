import { useEffect, useState } from "react";
import { CalendarDays, Clock3, CheckCircle2, XCircle } from "lucide-react";

import AdminSidebar from "../components/admin/AdminSidebar";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Retrieve all appointment requests from Express.
  useEffect(() => {
    fetch("http://localhost:3001/api/admin/bookings")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load appointments.");
        }

        return response.json();
      })
      .then((data) => setBookings(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const [actionLoading, setActionLoading] = useState(null);

  const updateBookingStatus = async (bookingId, status) => {
    setActionLoading(bookingId);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3001/api/admin/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to update booking.");
      }

      // Update the booking in React without refreshing the page.
      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking.id === bookingId ? result.booking : booking,
        ),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const cancelBooking = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?",
    );

    if (!confirmed) return;

    setActionLoading(bookingId);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3001/api/bookings/${bookingId}`,
        { method: "DELETE" },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to cancel booking.");
      }

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking,
        ),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // Calculate statistics using our booking data.
  const pending = bookings.filter(
    (booking) => booking.status === "pending",
  ).length;

  const confirmed = bookings.filter(
    (booking) => booking.status === "confirmed",
  ).length;

  const cancelled = bookings.filter(
    (booking) => booking.status === "cancelled",
  ).length;

  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: CalendarDays,
      background: "bg-[#E5F5FD]",
      color: "text-[#29B4E4]",
    },
    {
      label: "Pending Requests",
      value: pending,
      icon: Clock3,
      background: "bg-[#F3E8F8]",
      color: "text-[#A56A9F]",
    },
    {
      label: "Confirmed",
      value: confirmed,
      icon: CheckCircle2,
      background: "bg-green-50",
      color: "text-green-600",
    },
    {
      label: "Cancelled",
      value: cancelled,
      icon: XCircle,
      background: "bg-red-50",
      color: "text-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2F9FD] md:flex">
      <AdminSidebar />

      <main className="min-w-0 flex-1 p-5 md:p-8">
        {/* Dashboard heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#171C2E]">
            Office Manager Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Manage appointment requests and view booking activity.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${stat.background}`}
                >
                  <Icon size={24} className={stat.color} />
                </div>

                <p className="text-3xl font-bold text-[#171C2E]">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Appointment table */}
        <section
          id="appointments"
          className="scroll-mt-6 rounded-2xl bg-white p-5 shadow-sm md:p-6"
        >
          <h2 className="mb-5 text-xl font-semibold text-[#171C2E]">
            Appointment Requests
          </h2>

          {loading && <p className="text-slate-500">Loading appointments...</p>}

          {error && (
            <p role="alert" className="text-red-600">
              {error}
            </p>
          )}

          {!loading && !error && bookings.length === 0 && (
            <p className="text-slate-500">No appointment requests yet.</p>
          )}

          {!loading && !error && bookings.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-slate-50 text-slate-600">
                  <tr>
                    <th className="p-3">Patient</th>
                    <th className="p-3">Service</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-slate-100">
                      <td className="p-3">{booking.patientName}</td>

                      <td className="p-3 capitalize">{booking.serviceId}</td>

                      <td className="p-3">{booking.date}</td>

                      <td className="p-3">{booking.time}</td>

                      <td className="p-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td className="p-3">
                        <div className="flex flex-wrap gap-2">
                          {booking.status === "pending" && (
                            <>
                              <button
                                type="button"
                                disabled={actionLoading === booking.id}
                                onClick={() =>
                                  updateBookingStatus(booking.id, "confirmed")
                                }
                                className="rounded-lg bg-green-100 px-3 py-2 text-xs font-medium text-green-700 hover:bg-green-200 disabled:opacity-50"
                              >
                                Approve
                              </button>

                              <button
                                type="button"
                                disabled={actionLoading === booking.id}
                                onClick={() =>
                                  updateBookingStatus(booking.id, "declined")
                                }
                                className="rounded-lg bg-orange-100 px-3 py-2 text-xs font-medium text-orange-700 hover:bg-orange-200 disabled:opacity-50"
                              >
                                Decline
                              </button>
                            </>
                          )}

                          {["pending", "confirmed"].includes(
                            booking.status,
                          ) && (
                            <button
                              type="button"
                              disabled={actionLoading === booking.id}
                              onClick={() => cancelBooking(booking.id)}
                              className="rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-200 disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          )}

                          {["declined", "cancelled"].includes(
                            booking.status,
                          ) && (
                            <span className="text-xs text-slate-400">
                              No actions
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
