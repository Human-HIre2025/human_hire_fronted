import bgImage from "../../assets/appointment/BookAMeet.avif";

const Hero = () => {
  const parallaxStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div
      style={parallaxStyle}
      className="relative flex justify-center items-center px-4 sm:px-6 lg:px-8 min-h-[50vh] sm:min-h-[60vh] lg:min-h-[65vh]"
    >
      {/* Black Overlay: Opacity 60% (0.6) rakhi hai taki dull effect aaye */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[95%] sm:max-w-3xl lg:max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#fef5f0] font-extrabold text-center">
          Book a Meeting
        </h1>
      </div>
    </div>
  );
};

export default Hero;
