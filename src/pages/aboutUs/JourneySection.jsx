import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img from "../../assets/about/img1.jpg";
import img2 from "../../assets/about/img2.png";

gsap.registerPlugin(ScrollTrigger);

export default function JourneySection() {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;

    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        delay: 2.7, // delay before animation starts
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getById(el)?.kill();
    };
  }, []);

  return (
    <section className="bg-black text-[#fef5f0] w-full px-4 md:px-0 py-12">
      <div
        ref={contentRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
      >
        {/* Heading */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Fueling careers. <br />{" "}
            <span className="text-[#aa5c82]">Lifting businesses.</span>
          </h2>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            At our heart, we are a people-first recruitment firm dedicated to
            uniting exceptional talent with visionary companies. Whether you’re
            a business striving to discover extraordinary candidates or a
            professional embarking on your next transformative opportunity, we
            seamlessly bridge the divide with unmatched expertise, deep insight,
            and genuine care. Partner with us to craft futures and cultivate
            lasting success.
          </p>
        </div>

        {/* Left Image */}
        <div>
          <img
            src={img}
            alt="Interview process"
            className="w-full h-[65vh] object-cover"
            loading="lazy"
          />
        </div>

        {/* Right Image */}
        <div>
          <img
            src={img2}
            alt="Team Collaboration"
            className="w-full h-[65vh] object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
