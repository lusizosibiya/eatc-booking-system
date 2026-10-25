import React, { useEffect, useState } from 'react';
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";


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
    <div>
        <Navbar />
        <Home />
        <main id="home">

        </main>
    </div> 
  );
}

export default App;

{/* <div className="mt-8 grid gap-4 md:grid-cols-2">
        {clinicians.map((clinician) => (
          <div key={clinician.id} className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-semibold">{clinician.name}</h2>
            <p className="text-gray-600">{clinician.profession}</p>
          </div>
        ))}
      </div> */}