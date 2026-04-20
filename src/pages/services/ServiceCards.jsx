// import { Phone } from "lucide-react";
// import React, { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useSiteSettings } from "../../context/SiteSettingsContext";
// gsap.registerPlugin(ScrollTrigger);

// const services = [
//   {
//     title: "Talent Acquisition",
//     description:
//       "We connect businesses with top talent by sourcing, screening, and delivering highly qualified candidates tailored to your needs.",
//     image:
//       "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop",
//     features: [
//       "Candidate sourcing",
//       "Skill assessment",
//       "Interview coordination",
//       "Onboarding support",
//     ],
//   },
//   {
//     title: "Employer Branding",
//     description:
//       "Enhance your company’s reputation to attract and retain the best candidates with our strategic employer branding solutions.",
//     image:
//       "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop",
//     features: [
//       "Brand strategy development",
//       "Social media campaigns",
//       "Employee advocacy programs",
//       "Career site optimization",
//     ],
//   },
//   {
//     title: "Recruitment Process Outsourcing",
//     description:
//       "Let us manage your recruitment operations efficiently so you can focus on growing your business while we handle talent acquisition end-to-end.",
//     image:
//       "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1470&auto=format&fit=crop",
//     features: [
//       "End-to-end hiring",
//       "Candidate database management",
//       "Compliance & reporting",
//       "Cost-effective recruitment",
//     ],
//   },
//   {
//     title: "Workforce Consulting",
//     description:
//       "Optimize your workforce planning and talent management strategies with our expert consulting services tailored to your business goals.",
//     image:
//       "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1370&auto=format&fit=crop",
//     features: [
//       "Workforce analytics",
//       "Talent strategy alignment",
//       "Succession planning",
//       "Diversity & inclusion initiatives",
//     ],
//   },
// ];

// export default function ServiceCards() {
//   const cardsRef = useRef([]);
//   const ctaRef = useRef(null);

//   const { settings, error } = useSiteSettings();
//   const generalData =
//     settings?.data?.find((item) => item.category === "General Information")
//       ?.data || {};

//       const { phoneNumber } = generalData;

//   useEffect(() => {
//     // Animate cards one by one
//     cardsRef.current.forEach((card, index) => {
//       if (!card) return;

//       gsap.fromTo(
//         card,
//         { opacity: 0, y: 80 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1.8,
//           ease: "power4.out",
//           delay: index * 0.2,
//           scrollTrigger: {
//             trigger: card,
//             start: "top 85%",
//             toggleActions: "play none none none",
//           },
//         }
//       );
//     });

//     // Animate CTA at the bottom
//     if (ctaRef.current) {
//       gsap.fromTo(
//         ctaRef.current,
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1.6,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: ctaRef.current,
//             start: "top 85%",
//           },
//         }
//       );
//     }
//   }, []);

//   return (
//     <section className="bg-black py-16">
//       <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {services.map((service, index) => (
//           <div
//             key={index}
//             ref={(el) => (cardsRef.current[index] = el)}
//             className="group bg-[#111] text-white shadow-md border-b-4 border-r-4 border-[#353537] p-6 flex flex-col gap-6 min-h-[360px] transition-colors duration-300
//               hover:border-b-0 hover:border-r-0 hover:border-t-4 hover:border-l-4 hover:border-[#a64d79]"
//           >
//             {/* Top Row: Image and Feature List */}
//             <div className="flex flex-col md:flex-row gap-6">
//               {/* Image */}
//               <div className="w-full md:w-[350px] h-[200px] shrink-0 overflow-hidden">
//                 <img
//                   src={service.image}
//                   alt={service.title}
//                   className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//                   loading="lazy" 
//                 />
//               </div>

//               {/* Features */}
//               <ul className="flex-1 space-y-3 text-sm">
//                 {service.features.map((item, idx) => (
//                   <li key={idx} className="flex items-start">
//                     <div className="w-2 h-2 rounded-full border-2 border-[#a64d79] bg-transparent mr-3" />
//                     <span>{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Bottom Row: Title, Description, CTA */}
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
//               <div>
//                 <h3 className="text-lg font-bold mb-1">{service.title}</h3>
//                 <p className="text-gray-300 text-sm max-w-[300px] md:max-w-[350px]">
//                   {service.description}
//                 </p>
//               </div>

//               <a
//                 href="#"
//                 className="text-sm font-semibold uppercase text-white border-b border-[#a64d79] hover:opacity-80"
//               >
//                 Service Details →
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* CTA Section */}
//       <div
//         ref={ctaRef}
//         className="w-full h-48 flex flex-col md:flex-row items-center justify-center gap-12 mt-12"
//       >
//         <Link to="/get-started">
//           <button className="cursor-pointer bg-[#a64d79] hover:bg-[#c96d95] text-white px-6 py-3 transition-colors duration-300">
//             Get Started
//           </button>
//         </Link>
//         <div className="flex items-center gap-4">
//           <Phone
//             color="#fff"
//             size={40}
//             className="bg-[#a64d79] px-1 rounded-full hover:bg-[#c96d95] transition-colors duration-300"
//           />
//           <div>
//             <p className="text-white font-bold text-lg">{phoneNumber}</p>
//             <p className="text-[#959596] text-sm">TALK TO AN EXPERT</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }





import { Phone, ChevronRight, Check } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteSettings } from "../../context/SiteSettingsContext";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Talent Acquisition",
    description:
      "We connect businesses with top talent by sourcing, screening, and delivering highly qualified candidates tailored to your needs.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop",
    features: [
      "Candidate sourcing",
      "Skill assessment",
      "Interview coordination",
      "Onboarding support",
    ],
    details: {
      intro:
        "We deliver end-to-end talent acquisition solutions designed to help organizations hire faster, smarter, and more efficiently.",
      sections: [
        {
          heading: "What We Do",
          items: [
            "Role-specific sourcing using proven channels",
            "Thorough candidate screening",
            "Interview coordination & offer management",
            "Background verification support",
          ],
        },
        {
          heading: "Why Choose Us",
          items: [
            "Access to pre-vetted talent pools",
            "Reduced time-to-hire",
            "Scalable hiring for startups to enterprises",
            "Industry-focused recruitment expertise",
          ],
        },
      ],
    },
  },
  {
    title: "Employer Branding",
    description:
      "Enhance your company’s reputation to attract and retain the best candidates with our strategic employer branding solutions.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop",
    features: [
      "Brand strategy development",
      "Social media campaigns",
      "Employee advocacy programs",
      "Career site optimization",
    ],
    details: {
      intro:
        "Attract the right talent by building a strong, authentic employer brand that reflects your company culture and values.",
      sections: [
        {
          heading: "Our Services",
          items: [
            "Employer value proposition (EVP)",
            "Career page content optimization",
            "Employee advocacy programs",
            "Digital employer branding strategies",
          ],
        },
        {
          heading: "Impact",
          items: [
            "Higher candidate engagement",
            "Improved quality of applicants",
            "Stronger talent retention",
          ],
        },
      ],
    },
  },
  {
    title: "Recruitment Process Outsourcing",
    description:
      "Let us manage your recruitment operations efficiently so you can focus on growing your business while we handle talent acquisition end-to-end.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1470&auto=format&fit=crop",
    features: [
      "End-to-end hiring",
      "Candidate database management",
      "Compliance & reporting",
      "Cost-effective recruitment",
    ],
    details: {
      intro:
        "Our RPO solutions help you outsource part or all of your recruitment function while maintaining full transparency and control.",
      sections: [
        {
          heading: "RPO Capabilities",
          items: [
            "End-to-end hiring ownership",
            "Dedicated recruitment teams",
            "ATS and database management",
            "Compliance & hiring analytics",
          ],
        },
        {
          heading: "Best For",
          items: [
            "High-volume hiring",
            "Multi-location recruitment",
            "Fast-growing organizations",
          ],
        },
      ],
    },
  },
  {
    title: "Workforce Consulting",
    description:
      "Optimize your workforce planning and talent management strategies with our expert consulting services tailored to your business goals.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1370&auto=format&fit=crop",
    features: [
      "Workforce analytics",
      "Talent strategy alignment",
      "Succession planning",
      "Diversity & inclusion initiatives",
    ],
    details: {
      intro:
        "We partner with organizations to align workforce strategy with business goals through data-driven insights and planning.",
      sections: [
        {
          heading: "Consulting Services",
          items: [
            "Workforce planning and analytics",
            "Talent strategy alignment",
            "Succession planning",
            "Organizational structure optimization",
          ],
        },
        {
          heading: "Business Outcomes",
          items: [
            "Smarter workforce decisions",
            "Improved productivity",
            "Long-term talent sustainability",
          ],
        },
      ],
    },
  },
];

export default function ServiceCards() {
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);
  const contentRefs = useRef([]);
  const [activeService, setActiveService] = useState(null);

  const { settings } = useSiteSettings();
  const generalData =
    settings?.data?.find((item) => item.category === "General Information")
      ?.data || {};

  const { phoneNumber } = generalData;

  const toggleService = (index) => {
    // If clicking the same one, close it. If clicking a new one, open it.
    setActiveService(activeService === index ? null : index);
  };

  // Initial Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Expand/Collapse Animation
  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
      if (!el) return;

      if (activeService === index) {
        // OPEN ANIMATION
        gsap.to(el, {
          height: "auto",
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => ScrollTrigger.refresh(), // Recalculate page height
        });
      } else {
        // CLOSE ANIMATION
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => ScrollTrigger.refresh(),
        });
      }
    });
  }, [activeService]);

  return (
    <section className="bg-black py-20">
      {/* 
        GRID FIX: items-start ensures that if one card grows, 
        the neighbor doesn't stretch awkwardly.
      */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`group relative bg-[#111] text-white shadow-xl 
              border-b-4 border-r-4 border-[#353537] 
              p-6 md:p-8 flex flex-col gap-6 transition-all duration-300
              hover:border-b-0 hover:border-r-0 hover:border-t-4 hover:border-l-4 hover:border-[#a64d79]
              ${
                activeService === index
                  ? "border-b-0 border-r-0 border-t-4 border-l-4 border-[#a64d79] bg-[#141414]"
                  : ""
              }`}
          >
            {/* --- Top Section: Image & Features --- */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Container */}
              <div className="w-full md:w-1/2 h-[220px] shrink-0 overflow-hidden rounded-sm bg-gray-800">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Quick Features */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-4 md:hidden block">
                  {service.title}
                </h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  {service.features.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a64d79] mr-3 mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* --- Middle Section: Title, Desc, Toggle --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 border-t border-[#333] pt-5">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 hidden md:block">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  {service.description}
                </p>
              </div>

              <button
                onClick={() => toggleService(index)}
                className="shrink-0 text-sm font-bold uppercase tracking-wide text-white 
                  border-b-2 border-[#a64d79] pb-1 hover:text-[#a64d79] hover:border-white 
                  transition-colors flex items-center gap-2 cursor-pointer"
              >
                {activeService === index ? "Close Details" : "Service Details"}
                <ChevronRight
                  size={16}
                  className={`transition-transform duration-300 ${
                    activeService === index ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>

            {/* --- Expandable Details Section --- */}
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="h-0 overflow-hidden opacity-0"
            >
              {/* Inner container with darker background for contrast */}
              <div className="mt-6 bg-[#181818] rounded-lg p-6 border border-[#2a2a2a] shadow-inner">
                
                {/* Intro */}
                <p className="text-[#e0e0e0] italic text-sm md:text-base mb-6 border-l-2 border-[#a64d79] pl-4">
                  "{service.details.intro}"
                </p>

                {/* Grid for details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {service.details.sections.map((section, secIdx) => (
                    <div key={secIdx}>
                      <h4 className="text-[#a64d79] font-bold text-xs uppercase tracking-widest mb-4">
                        {section.heading}
                      </h4>
                      <ul className="space-y-3">
                        {section.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start text-sm text-gray-400"
                          >
                            <Check
                              size={14}
                              className="text-[#a64d79] mr-2 mt-1 shrink-0"
                            />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Inner CTA */}
                <div className="mt-8 pt-6 border-t border-[#333] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-white font-semibold text-sm">
                    Ready to build the right team?
                  </span>
                  <Link
                    to="/contact-us"
                    className="flex items-center gap-2 px-4 py-2 bg-[#a64d79] hover:bg-[#c96d95] text-white text-xs font-bold uppercase rounded transition-colors"
                  >
                    <Phone size={14} /> Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Page CTA */}
      <div
        ref={ctaRef}
        className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-20 px-4"
      >
        <Link to="/get-started">
          <button className="cursor-pointer bg-[#a64d79] hover:bg-[#c96d95] text-white px-8 py-4 font-bold tracking-wide shadow-lg hover:shadow-[#a64d79]/40 transition-all duration-300">
            GET STARTED
          </button>
        </Link>
        <div className="flex items-center gap-5">
          <div className="bg-[#a64d79] p-3 rounded-full hover:bg-[#c96d95] transition-colors duration-300 shadow-lg">
            <Phone color="#fff" size={32} />
          </div>
          <div>
            <p className="text-white font-bold text-xl tracking-tight">{"+44 7400 075848"}</p>
            <p className="text-[#959596] text-xs font-semibold tracking-widest uppercase mt-1">
              Talk to an Expert
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}