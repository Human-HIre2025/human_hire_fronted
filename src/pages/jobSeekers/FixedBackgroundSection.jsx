import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg from "../../assets/cutout2.webp";

gsap.registerPlugin(ScrollTrigger);

const FixedBackgroundSection = () => {
  const overlayRef = useRef(null);
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
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="relative min-h-[70vh] sm:min-h-[80vh] w-full border-t-4 border-[#a64d79]">
        {/* Fixed Background Image */}
        <div className="absolute inset-0 -z-10 bg-black">
          <img src={bg} alt="" className="w-full h-full object-cover" />
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
                <span className="block">
                  Recruitment made easy, efficient, and effective—for every role
                  that matters.
                </span>
                <span className="block">
                  and effective—for every role that matters.
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedBackgroundSection;
