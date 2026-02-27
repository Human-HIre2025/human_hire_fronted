import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- CLOUDINARY OPTIMIZED SOURCES ---------------- */
const videoSources = [
  "https://res.cloudinary.com/dfrbw0yzi/video/upload/f_auto,q_80,w_1920/about1_l1nwwl",
  "https://res.cloudinary.com/dfrbw0yzi/video/upload/f_auto,q_80,w_1920/about2_lqefc1",
  "https://res.cloudinary.com/dfrbw0yzi/video/upload/f_auto,q_80,w_1920/about3_s01bnf",
  "https://res.cloudinary.com/dfrbw0yzi/video/upload/f_auto,q_80,w_1920/about4_bvr3kz",
];

const AboutUs = () => {
  const sectionRef = useRef(null);
  const videoRefs = useRef([]);

  /* ---------------- DEVICE CHECK (DO NOT BLOCK MOBILE) ---------------- */
  const isLowEnd = useMemo(() => {
    if (typeof window === "undefined") return true;
    // ❗ Only block if user enabled Data Saver
    return navigator.connection?.saveData === true;
  }, []);

  /* ---------------- COLLECT VIDEO WRAPPERS ---------------- */
  const addToRefs = useCallback((el) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el);
    }
  }, []);

  /* ---------------- GSAP (UNCHANGED LOGIC) ---------------- */
  useEffect(() => {
    if (isLowEnd) return;

    const ctx = gsap.context(() => {
      videoRefs.current.forEach((el) => {
        if (!el) return;

        gsap.set(el, {
          y: 40,
          opacity: 0,
          willChange: "transform, opacity",
        });

        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLowEnd]);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-[#fef5f0] py-8 sm:py-12 lg:py-20 overflow-x-hidden"
    >
      {/* ---------------- TITLE ---------------- */}
      <div className="flex items-center justify-center mb-4 lg:mb-6 px-4">
        <div className="w-3 h-3 rounded-full border-2 border-[#a64d79] mr-3" />
        <h2 className="text-sm font-semibold uppercase">About Us</h2>
      </div>

      {/* ---------------- HEADING ---------------- */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
          We are <span>HUMANHIRE!</span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto mt-3">
          Trusted across four countries, we deliver tailored recruitment
          solutions that meet each client’s unique hiring needs.
        </p>
      </div>

      {/* ---------------- VIDEOS GRID ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 w-full">
        {!isLowEnd &&
          videoSources.map((src, idx) => (
            <div
              key={idx}
              ref={addToRefs}
              className="overflow-hidden aspect-[16/9]"
            >
              <video
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                disableRemotePlayback
              >
                {/* iOS / Safari */}
                <source src={`${src}.mp4`} type="video/mp4" />
                {/* Chrome / Android */}
                <source src={`${src}.webm`} type="video/webm" />
              </video>
            </div>
          ))}
      </div>
    </section>
  );
};

export default AboutUs;
