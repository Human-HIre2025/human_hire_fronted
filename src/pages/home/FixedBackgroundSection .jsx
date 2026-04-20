import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg from "../../assets/cutout2.webp";

gsap.registerPlugin(ScrollTrigger);

const FixedBackgroundSection = () => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
        },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      className="relative min-h-[80vh] w-full bg-center bg-no-repeat md:bg-fixed"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4">
        <div ref={textRef} className="text-center max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#fef5f0] leading-tight">
            {/* <span className="block">
              Recruitment made easy, efficient, and effective—for every role
              that matters.
            </span>
            <span className="block">
              and effective—for every role that matters.
            </span> */}

            <span className="block">
              Hiring, done the human way, because meaningful careers and strong
              teams are built on understanding,
            </span>
            <span className="block">
              empathy, and the right human connections.
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default FixedBackgroundSection;
