import React from "react";
import bg from "../../assets/seekers/seekers (9).jpg"; // Adjust the path as necessary

const Hero = () => {
  return (
    <div
      className="relative flex justify-center items-center px-4 sm:px-6 lg:px-8 hero-bg
                 min-h-[50vh] sm:min-h-[60vh] lg:min-h-[65vh] 
                 bg-fixed bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[95%] sm:max-w-2xl lg:max-w-3xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-extrabold tracking-wide text-[#fff6f1] 
                       leading-snug sm:leading-tight break-words">
          Embark with us on a path where collaboration meets excellence.
        </h1>
      </div>
    </div>
  );
};

export default Hero;
