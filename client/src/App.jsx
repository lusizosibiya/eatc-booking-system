import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div>
        <Navbar />
        <Home />
        <Footer />
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