import React from "react";
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
