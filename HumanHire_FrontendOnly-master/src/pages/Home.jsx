import React from "react";
import SEO from "../components/SEO";
import Hero from "./home/Hero";
import OurPartners from "./home/OurPartners";
import AboutUs from "./home/AboutUs";
import OurTeam from "./home/OurTeam";
import Testimonials from "./home/Testimonials";
import EventsAndAchievements from "./home/EventsAndAchievements";
import WhyChooseUs from "./home/WhyChooseUs";
// import JobCategories from "./home/JobCategories";
import MapComponent from "./home/MapComponent";
import FixedBackgroundSection from "./home/FixedBackgroundSection ";
import BusinessBookingSection from "./home/BusinessBookingSection ";

const Home = () => {
  return (
    <>
      <SEO
        title="Human Hire Corp | Global Recruitment & Staffing Partner"
        description="Human Hire Corp provides professional recruitment, staffing, and HR solutions connecting global businesses with top-tier talent."
        canonical="https://humanhirecorp.com/"
      />

      <Hero />
      <OurPartners />
      <AboutUs />
      <WhyChooseUs />
      <MapComponent />
      <Testimonials />
      <OurTeam />
      {/* <EventsAndAchievements /> */}
      {/* <FixedBackgroundSection /> */}
      <FixedBackgroundSection/>
      <BusinessBookingSection />
    </>
  );
};

export default Home;
