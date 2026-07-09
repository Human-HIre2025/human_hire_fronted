import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Preloader from "./components/UI/Preloader";
import "./App.css";
import { useSiteSettings } from "./context/SiteSettingsContext";
import Maintenance from "./assets/maintanance.jpg";
import ScrollToTop from "./components/ScrollToTop";
import EventsAndAchievements from "./pages/home/EventsAndAchievements";

// Lazy load pages
const Home = React.lazy(() => import("./pages/Home"));
const Services = React.lazy(() => import("./pages/Services"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const OurPeople = React.lazy(() => import("./pages/OurPeople"));
const JobSeekers = React.lazy(() => import("./pages/JobSeekers"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const Appointment = React.lazy(() => import("./pages/Appointment"));
const Terms = React.lazy(() => import("./pages/Terms"));
const Privacy = React.lazy(() => import("./pages/Privacy"));

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [canRenderPreloader, setCanRenderPreloader] = useState(false);

  const [animationKey, setAnimationKey] = useState(0);
  const { settings, error } = useSiteSettings();

  const maintanace =
    settings?.data?.find((item) => item.category === "Maintenance Mode")
      ?.data || {};

  useEffect(() => {
    requestAnimationFrame(() => {
      setCanRenderPreloader(true);
    });
  }, []);

  // useEffect(() => {
  //   const FIRST_LOAD_MIN = 2000; // show preloader at least 2s on first load
  //   const ROUTE_LOAD_MIN = 1000; // show preloader at least 1s on route change
  //   const isFirstLoad = animationKey === 0;

  //   setShowPreloader(true);
  //   setLoading(true);
  //   setAnimationKey((prev) => prev + 1);

  //   const minTime = isFirstLoad ? FIRST_LOAD_MIN : ROUTE_LOAD_MIN;
  //   const startTime = Date.now();

  //   const finishLoading = () => {
  //     const elapsed = Date.now() - startTime;
  //     const remaining = Math.max(minTime - elapsed, 0);

  //     setTimeout(() => {
  //       setLoading(false);
  //       setShowPreloader(false);
  //       document.body.classList.add("loaded");
  //     }, remaining);
  //   };

  //   if (
  //     document.readyState === "complete" ||
  //     document.readyState === "interactive"
  //   ) {
  //     finishLoading();
  //   } else {
  //     window.addEventListener("DOMContentLoaded", finishLoading);
  //   }

  //   return () => {
  //     window.removeEventListener("DOMContentLoaded", finishLoading);
  //   };
  // }, [location.pathname]);

  useEffect(() => {
    const FIRST_LOAD_MIN = 2000;
    const ROUTE_LOAD_MIN = 1000;

    setShowPreloader(true);
    setLoading(true);

    const minTime =
      document.readyState === "complete" ? ROUTE_LOAD_MIN : FIRST_LOAD_MIN;

    const startTimer = setTimeout(() => {

      setLoading(false);


      const exitTimer = setTimeout(() => {
        setShowPreloader(false);
        document.body.classList.add("loaded");
      }, 800); 

      return () => clearTimeout(exitTimer);
    }, minTime);

    return () => clearTimeout(startTimer);
  }, [location.pathname]);

  if (maintanace?.enabled) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={Maintenance} alt="Maintenance" className="w-xl mx-auto" />
        <h1
          className="text-center text-black text-2xl font-bold mt-10 px-2"
          dangerouslySetInnerHTML={{ __html: maintanace?.message }}
        ></h1>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {canRenderPreloader && showPreloader && (
        <Preloader visible={loading} animationKey={animationKey} />
      )}
      <div className="main-content">
        <Header />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/our-people" element={<OurPeople />} />
            <Route path="/job-seekers" element={<JobSeekers />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/book-an-appointment" element={<Appointment />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/blogs" element={<EventsAndAchievements />} />
            <Route path="/blog" element={<Navigate to="/blogs" replace />} />
            <Route path="/about-us" element={<Navigate to="/about" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </>
  );
}

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <AppContent />
  </BrowserRouter>
);

export default App;
