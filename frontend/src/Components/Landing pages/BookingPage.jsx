import { useState } from "react";
import Navbar from "./Navbar";

const BookingPage = () => {
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const weekDays = [
    { date: "Mon 14/04/2025" },
    { date: "Tue 15/04/2025" },
    { date: "Wed 16/04/2025" },
    { date: "Thu 17/04/2025" },
  ];

  const toggleSession = (session) => {
    if (selectedSessions.includes(session)) {
      setSelectedSessions(selectedSessions.filter((s) => s !== session));
    } else {
      setSelectedSessions([...selectedSessions, session]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSessions([]);
    } else {
      const allSlots = weekDays.flatMap((day) => [
        `${day.date}-full`
      ]);
      setSelectedSessions(allSlots);
    }
    setSelectAll(!selectAll);
  };

  const handleSubmit = () => {
    console.log("Selected Sessions:", selectedSessions);
  };

  return (
    <div className="max-w-5xl mx-auto p-10">
      <Navbar/>
      <div className="max-w-4xl mx-auto text-center mt-10 pb-10 border-b border-gray-300">
        <h2 className="text-lg font-semibold text-red-600">Please select the dates to book for this camp</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-6 text-red-600 font-bold">
          <div>
            <h3>Full week</h3>
            <p className="text-2xl"> ₹310.00</p>
          </div>
          <div>
            <h3>Single day</h3>
            <p className="text-2xl"> ₹70.00</p>
          </div>
          <div>
            <h3>Half day</h3>
            <p className="text-2xl"> ₹40.00</p>
          </div>
          <div>
            <h3>Early Drop-off</h3>
            <p className="text-2xl"> ₹5.00</p>
            <p className="text-gray-500 text-sm">per day</p>
          </div>
          <div>
            <h3>Late Pick-up</h3>
            <p className="text-2xl"> ₹10.00</p>
            <p className="text-gray-500 text-sm">per day</p>
          </div>
        </div>
      </div>
      {/* Week Title */}
      <h2 className="text-xl font-bold text-red-600 mb-4 pt-10">
        Week 2 <span className="text-gray-500">(Mon 14th Apr - Thu 17th Apr)</span>
      </h2>

      {/* Booking Options */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {/* Select All Sessions */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Book Week 2</h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-4 h-4"
            />
            Select All Sessions
          </label>
        </div>

        {/* Per-Day Booking */}
        {weekDays.map((day, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">{day.date}</h3>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedSessions.includes(`${day.date}-full`)}
                onChange={() => toggleSession(`${day.date}-full`)}
                className="w-4 h-4"
              />
              Full day
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedSessions.includes(`${day.date}-morning`)}
                onChange={() => toggleSession(`${day.date}-morning`)}
                className="w-4 h-4"
              />
              10:00am - 12:30pm
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedSessions.includes(`${day.date}-afternoon`)}
                onChange={() => toggleSession(`${day.date}-afternoon`)}
                className="w-4 h-4"
              />
              1:30pm - 4:00pm
            </label>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          className="bg-red-600 text-white py-2 px-6 rounded-lg text-lg font-semibold"
        >
          Book Slot
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
