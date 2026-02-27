import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg from "../../assets/home/bg4.jpg";

gsap.registerPlugin(ScrollTrigger);

const FixedBackgroundSection = () => {
  // const overlayRef = useRef(null);
  const playButtonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.to(playButtonRef.current, {
      scale: 1.05,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.fromTo(
      textRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="relative min-h-[70vh] sm:min-h-[80vh] w-full border-t-4 border-[#a64d79]">
        {/* Fixed Background Image */}
        <div className="fixed inset-0 w-full h-full -z-10">
          <img
            src={bg}
            alt="Background"
            className="w-full h-full object-cover"
            loading="lazy" 
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* Semi-transparent Black Overlay */}
          <div className="absolute inset-0 bg-black/60 -z-10"></div>

          {/* Content wrapper with top border and z-20 */}
          <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col justify-center items-center text-center px-4 sm:px-8 pb-12 sm:pb-16 md:pb-20 pt-0 ">

            {/* Text Content */}
            <div ref={textRef} className="mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#fef5f0] leading-tight">
                <span className="block">Watch the creative process</span>
                <span className="block">behind our digital works.</span>
              </h1>
            </div>

            {/* Play Button */}
            <div>
              <button
                ref={playButtonRef}
                className="relative group focus:outline-none focus:ring-4 focus:ring-[#a64d79] focus:ring-opacity-50 rounded-full transition-all duration-300"
                aria-label="Play video"
              >
                {/* Ping animation ring */}
                <div className="absolute inset-0 bg-[#a64d79] bg-opacity-20 rounded-full animate-ping"></div>

                {/* Main button */}
                <div className="relative w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 bg-gradient-to-br from-[#a64d79] to-pink-600 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-[#a64d79]/25 group-hover:scale-105 transition-all duration-300">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#fef5f0] ml-1 group-hover:ml-2 transition-all duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Hover effect ring */}
                <div className="absolute inset-0 border-2 border-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedBackgroundSection;
