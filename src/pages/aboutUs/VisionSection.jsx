import React, { useEffect, useRef } from "react";
import {
  Star,
  Network,
  Crown,
  RefreshCcw,
  DollarSign,
  Users,
  Layers,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img from "../../assets/vision.jpeg";
gsap.registerPlugin(ScrollTrigger);

export default function VisionSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.set(el, { autoAlpha: 0, y: 50 });

    const anim = gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-0 text-center"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
        {/* Left Column */}
        <div className="text-[#fef5f0] space-y-8 w-full lg:w-3/5 flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Your Vision, Seamlessly Connected.
          </h1>

          <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
            From day one, our mission has been to help organizations build
            stronger teams by connecting them with exceptional talent across the
            globe. As a trusted global recruitment partner, we work closely with
            businesses across industries to deliver tailored hiring solutions
            that drive growth, enhance workforce quality, and create long-term
            impact. By combining deep market insight with a human-first
            approach, we ensure every hire is not just qualified but the right
            cultural and strategic fit.
          </p>

          <div className="flex flex-col md:flex-row gap-8 mt-10 items-center justify-center">
            {/* Image */}
            <div className="flex-shrink-0">
              <img
                src={img}
                alt="Person with VR headset"
                className="w-52 h-64 object-cover rounded"
                loading="lazy"
              />
            </div>

            {/* Stats and Features */}
            <div className="space-y-6 flex flex-col justify-center items-center w-full">
              {/* Stats */}
              <div className="flex flex-col sm:flex-row sm:space-x-6 gap-6 sm:gap-0 items-center justify-center">
                <div className="flex items-center gap-4">
                  <div className="bg-[#a64d79] rounded-full w-12 h-12 flex items-center justify-center">
                    <Star size={24} className="text-[#fef5f0]" />
                  </div>
                  <div>
                    <div className="text-base font-extrabold">
                      400+ successful placements
                    </div>
                    <div className="text-base font-extrabold">rating!</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#a64d79] rounded-full w-12 h-12 flex items-center justify-center">
                    <Network size={24} className="text-[#fef5f0]" />
                  </div>
                  <div>
                    <div className="text-base font-extrabold">
                      98% client retention
                    </div>
                    <div className="text-base font-extrabold">retention!</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 pt-4 border-t border-gray-700 w-full">
                <div className="flex items-start gap-3 justify-center text-left">
                  <div className="bg-[#a64d79] rounded-full w-8 h-8 flex items-center justify-center mt-1">
                    <Crown size={16} className="text-[#fef5f0]" />
                  </div>
                  <p className="text-gray-300 text-sm max-w-xs">
                    Customized hiring strategies aligned with your business
                    goals and workforce needs
                  </p>
                </div>

                <div className="flex items-start gap-3 justify-center text-left">
                  <div className="bg-[#a64d79] rounded-full w-8 h-8 flex items-center justify-center mt-1">
                    <RefreshCcw size={16} className="text-[#fef5f0]" />
                  </div>
                  <p className="text-gray-300 text-sm max-w-xs">
                    End-to-end recruitment support, from sourcing to onboarding
                    and beyond
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Purple Card */}
        <div className="bg-[#a64d79] text-[#fef5f0] px-6 sm:px-10 py-12 rounded w-full lg:w-2/5 space-y-12 flex flex-col items-center">
          {[
            {
              icon: <DollarSign size={24} className="text-[#a64d79]" />,
              title: "Competitive Pricing",
              desc: "We offer flexible and transparent pricing models for permanent and contractual hiring, ensuring high-quality talent acquisition without compromising on value.",
            },
            {
              icon: <Users size={24} className="text-[#a64d79]" />,
              title: "Client-Centric Focus",
              desc: "Your hiring needs are at the heart of everything we do. We take the time to understand your requirements, culture, and timelines to deliver candidates who truly fit.",
            },
            {
              icon: <Layers size={24} className="text-[#a64d79]" />,
              title: "Tailor-made Strategies",
              desc: "We don't believe in a one-size-fits-all approach. Every solution we provide is tailored to your unique business goals and challenges.",
            },
          ].map(({ icon, title, desc }, i) => (
            <div
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left"
              key={i}
            >
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                {icon}
              </div>
              <div>
                <h3 className="text-xl font-extrabold mb-2">{title}</h3>
                <p className="text-pink-100 leading-relaxed text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
