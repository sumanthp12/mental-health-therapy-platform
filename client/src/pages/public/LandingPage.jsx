import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import Therapists from "../../components/landing/Therapists";
import Footer from "../../components/landing/Footer";
import Stats from "../../components/landing/Stats";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Therapists />
      <Footer />
    </>
  );
}

export default LandingPage;