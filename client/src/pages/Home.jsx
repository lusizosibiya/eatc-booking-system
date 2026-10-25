import Hero from "../components/home/Hero";
import ServicesPreview from "../components/home/ServicesPreview";
import CliniciansPreview from "../components/home/CliniciansPreview";

function Home() {
  return (
    <main>
      <Hero />
      <ServicesPreview />
      <CliniciansPreview />
    </main>
  );
}

export default Home;