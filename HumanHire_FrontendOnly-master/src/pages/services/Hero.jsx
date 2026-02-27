import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Crown, PieChart, Gem } from "lucide-react";
import hero from "../../assets/services/hero.jpg";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const animatedElements = useRef([]);

  // Clear refs on rerender
  animatedElements.current = [];

  const addToRefs = (el) => {
    if (el && !animatedElements.current.includes(el)) {
      animatedElements.current.push(el);
    }
  };

  useEffect(() => {
    animatedElements.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  }, []);

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url(${hero})`,
          backgroundAttachment: window.innerWidth <= 768 ? "scroll" : "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "50vh",
        }}
        className="relative flex  items-center justify-center text-white"
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="relative z-10 text-5xl font-bold text-center">
          Services
        </h1>
      </section>

      {/* Next Section with animated elements */}
      <section className="relative z-20 bg-black min-h-screen flex items-center justify-center text-white">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="md:w-3/5 mb-8 md:mb-0 pr-4">
            <h2
              ref={addToRefs}
              className="text-2xl md:text-4xl font-extrabold leading-tight mt-4 sm:mt-0"
            >
              Strengthen your workforce with innovative hiring solutions{" "}
              <span className="text-[#a64d79]">
                tailored for today’s dynamic market.
              </span>
            </h2>

            <p ref={addToRefs} className="text-lg text-[#717173] mt-10">
              Our dedication to quality and excellence is unmatched. Backed by a
              team of seasoned recruitment specialists passionate about their
              craft, we consistently go the extra mile to surpass client
              expectations. From the initial consultation to the successful
              placement and ongoing support, we ensure every stage of the hiring
              process is handled with utmost precision and care.
            </p>
          </div>

          {/* Right Section */}
          <div
            ref={addToRefs}
            className="md:w-2/5 space-y-8 border-3 border-[#464649] p-6"
          >
            <div ref={addToRefs} className="flex items-start">
              <Crown className="text-[#a64d79] mr-3 h-6 w-6" />
              <p className="text-lg">
                Our innovative recruitment solutions drive operational
                excellence by simplifying hiring and lowering expenses
              </p>
            </div>
            <hr ref={addToRefs} className="border-gray-600 border-dashed" />
            <div ref={addToRefs} className="flex items-start">
              <PieChart className="text-[#a64d79] mr-3 h-6 w-6" />
              <p className="text-lg">
                Through strategic talent acquisition, we boost your employer
                brand and position you for long-term success.
              </p>
            </div>
            <hr ref={addToRefs} className="border-gray-600 border-dashed" />
            <div ref={addToRefs} className="flex items-start">
              <Gem className="text-[#a64d79] mr-3 h-6 w-6" />
              <p className="text-lg">
                Every engagement is customized to meet your specific
                requirements, ensuring impactful hires that propel your business
                ahead.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
