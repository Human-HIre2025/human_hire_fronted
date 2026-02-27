import React, { useEffect, useRef } from "react";
import { Tag, Crown, Users } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VisionSection() {
  const textRef = useRef([]);
  const iconRef = useRef([]);

  useEffect(() => {
    // Fade-up text blocks
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: textRef.current[0],
          start: "top 80%",
        },
      }
    );

    // Fade-up icons
    gsap.fromTo(
      iconRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: iconRef.current[0],
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section className="flex flex-col lg:flex-row bg-black py-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row w-full">
        {/* Left Section */}
        <div className="bg-[#a64d79] text-white w-full lg:w-1/2 p-10 lg:p-20">
          <h2
            ref={(el) => (textRef.current[0] = el)}
            className="text-3xl md:text-4xl font-extrabold leading-tight"
          >
            Let’s turn your hiring vision into a success story.
          </h2>
          <p
            ref={(el) => (textRef.current[1] = el)}
            className="text-white/90 text-base leading-relaxed mt-4"
          >
            In today&apos;s competitive job market, attracting the right talent is
            more crucial than ever. That&apos;s why we continuously refine our
            sourcing techniques, recruitment strategies, and talent engagement
            processes to ensure our clients get the best candidates quickly and
            efficiently. We’re more than a staffing partner—we’re your ally in
            achieving long‑term workforce success.
          </p>
        </div>

        {/* Right Section */}
        <div className="bg-[#15171e] text-white w-full lg:w-1/2 p-10 lg:p-20 flex flex-col gap-10 justify-center">
          {/* Card 1 */}
          <div className="flex items-start gap-5">
            <div
              ref={(el) => (iconRef.current[0] = el)}
              className="bg-[#a64d79] p-3 rounded-full"
            >
              <Tag size={24} color="#fff" />
            </div>
            <div ref={(el) => (textRef.current[2] = el)}>
              <h3 className="text-lg font-bold">Cost‑effective Hiring</h3>
              <p className="text-white/80">
                We deliver high‑quality recruitment services at affordable rates,
                helping you reduce hiring costs without compromising on talent.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-start gap-5">
            <div
              ref={(el) => (iconRef.current[1] = el)}
              className="bg-[#a64d79] p-3 rounded-full"
            >
              <Crown size={24} color="#fff" />
            </div>
            <div ref={(el) => (textRef.current[3] = el)}>
              <h3 className="text-lg font-bold">Customized Talent Solutions</h3>
              <p className="text-white/80">
                We don’t believe in one‑size‑fits‑all. Every role and organization is
                different, and our hiring approach reflects that.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-start gap-5">
            <div
              ref={(el) => (iconRef.current[2] = el)}
              className="bg-[#a64d79] p-3 rounded-full"
            >
              <Users size={24} color="#fff" />
            </div>
            <div ref={(el) => (textRef.current[4] = el)}>
              <h3 className="text-lg font-bold">People first Approach</h3>
              <p className="text-white/80">
                We prioritize both candidate experience and client goals ensuring
                long term placement success and brand trust.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
