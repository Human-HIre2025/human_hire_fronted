import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bg from "../../assets/jobseeker/img.jpg";
import friendlyEnv from "../../assets/seekers/seekers (4).png";
import collabCulture from "../../assets/seekers/seekers (3).png";
import workLifeBalance from "../../assets/seekers/seekers (2).png";
import careerGrowth from "../../assets/seekers/seekers (1).png";

gsap.registerPlugin(ScrollTrigger);

const CareersSection = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 60, // slight increase for smoother motion
        opacity: 0,
        duration: 1.6, // slower
        stagger: 0.4, // more spaced out
        ease: "power2.out", // smoother
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-black py-12 px-4 sm:px-6 lg:px-8">
      {/* Main Section */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Text Section */}
        <div className="lg:w-1/2 text-[#fef5f0] space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
            <span className="block">
              Be a part of a dynamic team that{" "}
              <span className="text-[#a64d79]">
                pushes the boundaries of innovative thinking.
              </span>
            </span>
          </h1>

          <p className="text-gray-300">
            We're always on the lookout for bright, innovative minds to join our
            family. We believe in fostering a work environment that's not only
            challenging and rewarding, but also fun and inclusive. If you have a
            passion for digital solutions and a drive to constantly learn, grow,
            and innovate, you might just be the perfect fit for our team.
          </p>
          <a
            href="#"
            className="inline-block border-b-2 text-sm border-b-[#a64d79] font-extrabold hover:underline transition-all duration-300"
          >
            VIEW CURRENT JOBS →
          </a>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 h-[50vh] lg:h-[60vh] overflow-hidden">
          <img
            src={bg}
            alt="Team working together"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            img: friendlyEnv,
            title: "Friendly Environment",
            desc: "Work on cutting-edge projects, pushing the boundaries of technology.",
          },
          {
            img: collabCulture,
            title: "Collaborative Culture",
            desc: "Be part of a team that values open communication, teamwork, and mutual support.",
          },
          {
            img: workLifeBalance,
            title: "Work-Life Balance",
            desc: "We understand the importance of personal time and support a healthy work-life balance.",
          },
          {
            img: careerGrowth,
            title: "Career Growth",
            desc: "We offer internal promotion and many chances for career advancement.",
          },
        ].map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="border-1 flex justify-evenly flex-col border-gray-300 h-[300px] py-10 px-6 text-[#fef5f0] text-center"
          >
            <div className="flex justify-center mb-4">
              <img
                src={card.img}
                alt={card.title}
                className="w-12 h-12"
                loading="lazy"
              />
            </div>
            <div className="wraper">
              <h3 className="text-xl font-extrabold mb-2">{card.title}</h3>
              <p className="text-gray-400">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareersSection;
