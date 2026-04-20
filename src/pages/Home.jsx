import React from "react";
import Hero from "./home/Hero";
import OurPartners from "./home/OurPartners";
import AboutUs from "./home/AboutUs";
import { Helmet } from "react-helmet-async";

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
     <Helmet>
        {/* Primary SEO */}
        <title>Human Hire Corp – Global Recruitment & Staffing Solutions</title>

        <meta
          name="description"
          content="Human Hire Corp provides professional recruitment, staffing, and HR solutions connects businesses worldwide with top talent."
        />

        <link rel="canonical" href="https://humanhirecorp.com/" />

        <meta name="robots" content="index, follow" />

        {/* ✅ Open Graph (WhatsApp / Facebook / LinkedIn) */}
        <meta property="og:title" content="Human Hire Corp – Global Recruitment & Staffing Solutions" />
        <meta property="og:description" content="Human Hire Corp provides professional recruitment, staffing, and HR solutions connects businesses worldwide with top talent." />
        <meta property="og:url" content="https://humanhirecorp.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://res.cloudinary.com/daqbrkrj0/image/upload/f_auto,q_auto:best,w_720/v1753959864/uploads/8a08b38d-da3c-400a-9660-c1ae927a2ba1.png" />

        {/* ✅ Twitter SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Human Hire Corp – Global Recruitment & Staffing Solutions" />
        <meta name="twitter:description" content="Human Hire Corp provides professional recruitment, staffing, and HR solutions connects businesses worldwide with top talent." />
        <meta name="twitter:image" content="https://res.cloudinary.com/daqbrkrj0/image/upload/f_auto,q_auto:best,w_720/v1753959864/uploads/8a08b38d-da3c-400a-9660-c1ae927a2ba1.png" />

        {/* ✅ Structured Data (Schema Markup) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Human Hire Corp",
            url: "https://humanhirecorp.com/",
            logo: "https://res.cloudinary.com/daqbrkrj0/image/upload/f_auto,q_auto:best,w_720/v1753959864/uploads/8a08b38d-da3c-400a-9660-c1ae927a2ba1.png",
            description:
              "Human Hire Corp provides professional recruitment, staffing, and HR solutions.",
          })}
        </script>
      </Helmet>
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
