import React, { useEffect, useState } from "react";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const parallaxStyle = {
    minHeight: "40vh",
    backgroundAttachment: isMobile ? "scroll" : "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div
      style={parallaxStyle}
      className="hero-bg relative flex justify-center items-center"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-5xl text-[#fef5f0] font-extrabold text-center">
          Job Seekers
        </h1>
      </div>
    </div>
  );
};

export default Hero;
