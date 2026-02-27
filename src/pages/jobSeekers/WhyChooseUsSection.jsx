import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image1 from "../../assets/seekers/seekers (5).jpg"; // Adjust path as needed
import image2 from "../../assets/seekers/seekers (6).jpg";
import { AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUsSection = () => {
  const imageRef = useRef(null);
  const imageContainerRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightListRefs = useRef([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  useEffect(() => {
    gsap.to(imageRef.current, {
      x: "-100%",
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: imageContainerRef.current,
        start: "top 50%",
        toggleActions: "play none none reverse",
      },
      onComplete: () => {
        imageRef.current.src = image2;
        gsap.fromTo(
          imageRef.current,
          { x: "100%" },
          {
            x: "0%",
            duration: 1,
            ease: "power2.inOut",
          }
        );
      },
    });

    gsap.fromTo(
      leftTextRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftTextRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    rightListRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          delay: i * 0.15,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleDropdown = (index) => {
    setIsDropdownOpen(isDropdownOpen === index ? null : index);
  };

  const items = [
  {
    title: "Specialized Recruitment",
    content:
      "We focus exclusively on talent acquisition, offering in-depth knowledge of hiring trends and industry demands.",
  },
  {
    title: "Customized Talent Matching",
    content:
      "We evaluate both skillset and culture fit to ensure long-term alignment between clients and candidates.",
  },
  {
    title: "Robust Screening Process",
    content:
      "Every candidate undergoes rigorous vetting, including interviews, background checks, and skill assessments.",
  },
  {
    title: "Scalable Hiring Support",
    content:
      "Whether you're hiring for one role or scaling an entire team, we adapt our process to meet your needs.",
  },
  {
    title: "Dedicated Client Success Team",
    content:
      "Our recruiters stay with you throughout the hiring journey, ensuring responsiveness and continuous support.",
  },
  {
    title: "Retention-Focused Results",
    content:
      "Our placements are built to last — we prioritize retention, performance, and mutual satisfaction.",
  },
];


  return (
    <div className="relative bg-black py-12 px-4 sm:px-6 lg:px-8">
      {/* Main Section */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Section: Text and Image */}
        <div className="lg:w-2/3 flex flex-col lg:flex-row items-center gap-8">
          {/* Text */}
          <div ref={leftTextRef} className="lg:w-1/2 text-white space-y-6 opacity-0">
            <h2 className="text-white text-xs font-semibold uppercase flex items-center">
              <div className="w-3 h-3 rounded-full border-2 border-[#a64d79] bg-transparent mr-3" />
              WHY CHOOSE US
            </h2>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              <span className="block">Connecting Talent,</span>
              <span className="block">Empowering Growth.</span>
            </h1>
            <p className="text-[#cfcbca] text-sm">
              At Human Hire, we don’t just fill positions we build lasting partnerships by
              matching the right talent to your company’s vision. With dedication and integrity, we
              empower your business to thrive through strategic recruitment.
            </p>
          </div>

          {/* Image */}
          <div
            ref={imageContainerRef}
            className="lg:w-1/2 h-[40vh] lg:h-[60vh] overflow-hidden"
          >
            <img
              ref={imageRef}
              src={image1}
              alt="Connecting Talent"
              className="w-full h-full object-cover"
              loading="lazy" 
            />
          </div>
        </div>

        {/* Right Section: List */}
        <div className="lg:w-1/3 text-white space-y-4">
          {items.map((item, index) => {
            const isOpen = isDropdownOpen === index;
            return (
              <div
                key={index}
                className="border-b border-gray-700 py-2 opacity-0"
                ref={(el) => (rightListRefs.current[index] = el)}
              >
                <h3
                  className="text-lg font-semibold flex justify-between items-center cursor-pointer"
                  onClick={() => toggleDropdown(index)}
                >
                  {item.title}
                  <span className="text-gray-400">{isOpen ? "▲" : "▼"}</span>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-300 mt-2">{item.content}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsSection;
