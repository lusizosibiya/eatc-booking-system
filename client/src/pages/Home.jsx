import Hero from "../components/home/Hero";
import ServicesPreview from "../components/home/ServicesPreview";
import CliniciansPreview from "../components/home/CliniciansPreview";
import BookingSteps from "../components/home/BookingSteps";

function Home() {
  return (
    <main>
      <Hero />
      <ServicesPreview />
      <CliniciansPreview />
      <BookingSteps />
    </main>
  );
}

export default Home;
