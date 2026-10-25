import React, { useEffect, useState } from 'react';

function App() {

  useEffect(() => {
    getClinicians();
  }, []);

const [clinicians, setClinicians] = useState([]);

const getClinicians = () => {
  fetch("http://localhost:3001/api/clinicians")
  .then(res => res.json())
  .then(json => setClinicians(json))
  .catch(error => console.error("Error:", error));
};

  return (
    <div className="min-h-screen bg-sky-50 p-8">
      <h1 className="text-4xl font-bold text-black">EATC Booking System</h1>
      <p className="mt-4 text-gray-600">My project is working now</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {clinicians.map((clinician) => (
          <div key={clinician.id} className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold">{clinician.name}</h2>
            <p className="text-gray-600">{clinician.profession}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;