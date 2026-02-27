import React from "react";
import hero from '../../assets/about/original2.jpeg'
const Hero = () => {
  const parallaxStyle = {
    backgroundImage: `url(${hero})`,
    backgroundAttachment: window.innerWidth <= 768 ? "scroll" : "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "50vh",
  };
  
  return (
    <section style={parallaxStyle} className="relative flex justify-center items-center text-white">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-center">About Us</h1>
      </div>
    </section>
  );
};

export default Hero;
