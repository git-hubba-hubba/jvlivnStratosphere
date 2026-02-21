import { useState } from "react";
// import "./CalendarScheduler.css";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function CalendarScheduler() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);

  const [monthlyAppointments, setMonthlyAppointments] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const openModal = (day) => {
    if (monthlyAppointments.some(a => a.appointmentDay === `${currentMonth}-${day}`)) return;
    setSelectedDay(day);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsOpen(false);
      setSelectedDay(null);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    setMonthlyAppointments(prev => [
      ...prev,
      {
        appointmentDay: `${currentMonth}-${selectedDay}`,
        appointmentName: form.name.value,
        appointmentPurpose: form.purpose.value,
        depositReceived: form.deposit.checked,
        appointmentPhoneNum: form.phone.value
      }
    ]);

    closeModal();
  };

  const isBooked = (day) =>
    monthlyAppointments.some(a => a.appointmentDay === `${currentMonth}-${day}`);

  return (
    <div className="calendar-wrapper">

      {/* Header */}
      <div className="calendar-header">
        <div onClick={() => setCurrentMonth(m => m === 0 ? 11 : m - 1)}>◀</div>
        <h2>{months[currentMonth]} {currentYear}</h2>
        <div onClick={() => setCurrentMonth(m => m === 11 ? 0 : m + 1)}>▶</div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          return (
            <div
              key={day}
              className={`calendar-day ${isBooked(day) ? "booked" : ""}`}
              onClick={() => openModal(day)}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="overlay" onClick={closeModal}>
          <div
            className={`tv-modal ${isClosing ? "tv-off" : "tv-on"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Book Appointment – {months[currentMonth]} {selectedDay}</h3>

            <form className="modal-form" onSubmit={handleSubmit}>
              <input name="name" placeholder="Full Name" required />
              <input name="phone" placeholder="Phone Number" required />
              <input name="purpose" placeholder="Purpose of Appointment" required />

              <label className="checkbox">
                <input type="checkbox" name="deposit" />
                Deposit Received
              </label>

              <div className="form-actions">
                <div className="cancel" onClick={closeModal}>Cancel</div>
                <button type="submit">Save Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}