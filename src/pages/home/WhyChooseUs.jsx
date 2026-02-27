// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import logoCircle from "../../assets/logos/human-hire-logo.png";

// gsap.registerPlugin(ScrollTrigger);

// const WhyChooseUs = () => {
//   const stepsRef = useRef([]);
//   const imageRef = useRef(null);
//   const wrapperRef = useRef(null);

//   useEffect(() => {
//     const steps = stepsRef.current;
//     gsap.set(steps, { opacity: 0, y: 50, zIndex: 0 });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: wrapperRef.current,
//         start: "top -10%",
//         end: "+=1000",
//         scrub: 0.3,
//         pin: "#whyChooseUs",
//         pinSpacing: true,
//         invalidateOnRefresh: true,
//         refreshPriority: 1,
//       },
//     });

//     steps.forEach((step, i) => {
//   tl.fromTo(
//     step,
//     { opacity: 0, y: 50, zIndex: 0 },
//     { opacity: 1, y: 0, zIndex: 10, duration: 1, ease: "power2.out" },
//     i * 1 // tighter timing
//   );

//   if (i !== steps.length - 1) {
//     tl.to(
//       step,
//       {
//         opacity: 0,
//         y: -50,
//         zIndex: 0,
//         duration: 1,
//         ease: "power2.in",
//         immediateRender: false,
//       },
//       i * 1 + 0.8 // fade out starts just before next fade in finishes
//     );
//   }
// });

//     // Image rotation
//     gsap.to(imageRef.current, {
//       rotation: 360,
//       scale: 1.05,
//       ease: "none",
//       scrollTrigger: {
//         trigger: wrapperRef.current,
//         start: "top 20%",
//         end: "bottom bottom",
//         scrub: 0.5,
//         invalidateOnRefresh: true,
//       },
//       transformOrigin: "center center",
//     });

//     // Cleanup
//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//       gsap.killTweensOf(steps);
//       gsap.killTweensOf(imageRef.current);
//     };
//   }, []);

//   return (
//     <div
//       ref={wrapperRef}
//       id="whyChooseUsWrapper"
//       className="why-choose-us-wrapper bg-black text-[#fef5f0] min-h-[150vh] sm:min-h-[200vh] px-4 sm:px-6 md:px-8 py-6 sm:py-8"
//     >
//       {/* Title */}
//       <div className="flex items-center justify-center mb-4 sm:mb-6">
//         <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-[#a64d79] bg-transparent mr-2 sm:mr-3" />
//         <h2 className="text-[#fef5f0] text-sm font-semibold uppercase">
//           History
//         </h2>
//       </div>

//       {/* Intro */}
//       <div className="text-center max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8">
//         <h1 className="text-3xl sm:text-4xl md:text-4xl font-extrabold mb-2 sm:mb-3">
//           How We Got Here
//         </h1>
//         <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mt-4">
//         Turning talent into triumph through dedication and innovation.
// With a global presence and a human touch, we transform talent into the driving force of business growth.
//         </p>
//       </div>

//       {/* Sticky two‑column section */}
//       <div
//         id="whyChooseUs"
//         className="why-choose-us sticky top-0 flex items-start justify-center min-h-[50vh] sm:min-h-[60vh] px-4 sm:px-6 md:px-8"
//       >
//         <div className="flex w-full max-w-7xl flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
//           {/* LEFT: animated steps */}
//           <div className="left-column flex-1 flex items-center justify-center relative">
//             <div className="step-container relative w-full max-w-sm sm:max-w-md min-h-[150px] sm:min-h-[200px]">
//               {[
//                 {
//                   title: "2018",
//                   text: "HumanHire Corp was founded to revolutionize recruitment through precision and people-first thinking. Began operations with a small team focused on high-quality, relationship-driven hiring.",
//                 },
//                 {
//                   title: "2019",
//                   text: "Opened offices in Jaipur, Pune, and Kolkata to scale domestic operations. Built robust internal hiring and training programs to support growth.",
//                 },
//                 {
//                   title: "2020",
//                   text: "Transitioned to fully remote delivery during the global pandemic. Expanded remote hiring solutions across multiple time zones and continents.",
//                 },
//                 {
//                   title: "2021",
//                   text: "Launched international operations with our London office in Covent Garden.",
//                 },
//                 {
//                   title: "2023",
//                   text: "Reached 300+ recruiters; deepened partnerships with top global clients. Achieved record client retention and implemented advanced recruitment tech tools.",
//                 },
//                 {
//                   title: "2024",
//                   text: "Strengthened global delivery for volume and niche tech staffing. Diversified service offerings across healthcare, fintech, and digital transformation roles.",
//                 },
//                 {
//                   title: "2025",
//                   text: "Scaled enterprise hiring and tech consulting across Europe and Southeast Asia. Expanded strategic partnerships with global IT leaders and Fortune 500 clients.",
//                 },
//               ].map((step, i) => (
//                 <div
//                   key={i}
//                   ref={(el) => (stepsRef.current[i] = el)}
//                   className="step absolute top-0 left-0 w-full opacity-0 pointer-events-none"
//                 >
//                   <div className="step-content">
//                     <h2 className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 font-extrabold">
//                       {step.title}
//                     </h2>
//                     <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
//                       {step.text}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT: rotating image */}
//           <div className="right-column flex-1 flex items-start justify-center relative mt-4 sm:mt-0">
//             <div className="relative">
//               <img
//                 ref={imageRef}
//                 src={logoCircle}
//                 alt="Why Choose Us"
//                 className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[500px] lg:h-[500px] rounded-full object-cover shadow-lg"
//                 loading="lazy"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WhyChooseUs;
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import logoCircle from "../../assets/logos/human-hire-logo.png";
import logo320 from "../../assets/logos/human-hire-logo-320.webp";
import logo400 from "../../assets/logos/human-hire-logo-400.webp";
import logo520 from "../../assets/logos/human-hire-logo-520.webp";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- DATA ---------------- */
const STEPS = [
  {
    title: "2018",
    text: "HumanHire Corp was founded to revolutionize recruitment through precision and people-first thinking. Began operations with a small team focused on high-quality, relationship-driven hiring.",
  },
  {
    title: "2019",
    text: "Opened offices in Jaipur, Pune, and Kolkata to scale domestic operations. Built robust internal hiring and training programs to support growth.",
  },
  {
    title: "2020",
    text: "Transitioned to fully remote delivery during the global pandemic. Expanded remote hiring solutions across multiple time zones and continents.",
  },
  {
    title: "2021",
    text: "Launched international operations with our London office in Covent Garden.",
  },
  {
    title: "2023",
    text: "Reached 300+ recruiters; deepened partnerships with top global clients. Achieved record client retention and implemented advanced recruitment tech tools.",
  },
  {
    title: "2024",
    text: "Strengthened global delivery for volume and niche tech staffing. Diversified service offerings across healthcare, fintech, and digital transformation roles.",
  },
  {
    title: "2025",
    text: "Scaled enterprise hiring and tech consulting across Europe and Southeast Asia. Expanded strategic partnerships with global IT leaders and Fortune 500 clients.",
  },
];

const WhyChooseUs = () => {
  const stepsRef = useRef([]);
  const bulletsRef = useRef([]); // Ref for the bullet points
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  /* ---------------- ANIMATION LOGIC ---------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial state for Text
      gsap.set(stepsRef.current, { opacity: 0, y: 40 });
      gsap.set(stepsRef.current[0], { opacity: 1, y: 0 });

      // 2. Initial state for Bullets (First one active)
      bulletsRef.current.forEach((bullet, index) => {
        if (index === 0) {
          gsap.set(bullet, { backgroundColor: "#06b6d4", scale: 1.5, opacity: 1 }); // Active: Cyan
        } else {
          gsap.set(bullet, { backgroundColor: "#4b5563", scale: 1, opacity: 0.5 }); // Inactive: Grey
        }
      });

      // Helper function to animate bullets
      const updateBullets = (activeIndex) => {
        bulletsRef.current.forEach((bullet, index) => {
          if (index === activeIndex) {
            gsap.to(bullet, { 
              backgroundColor: "pink", // Cyan highlight
              scale: 1.5, 
              opacity: 1, 
              duration: 0.3 
            });
          } else {
            gsap.to(bullet, { 
              backgroundColor: "pink", // Grey
              scale: 1, 
              opacity: 0.5, 
              duration: 0.3 
            });
          }
        });
      };

      // 3. ScrollTrigger Logic
      stepsRef.current.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `${i * 400}px center`,
          end: `${(i + 1) * 400}px center`,
          onEnter: () => {
            // Animate Text
            gsap.to(step, { opacity: 1, y: 0, duration: 0.4 });
            if (i > 0) {
              gsap.to(stepsRef.current[i - 1], {
                opacity: 0,
                y: -40,
                duration: 0.4,
              });
            }
            // Animate Bullets
            updateBullets(i);
          },
          onEnterBack: () => {
            // Animate Text
            gsap.to(step, { opacity: 1, y: 0, duration: 0.4 });
            if (i < stepsRef.current.length - 1) {
              gsap.to(stepsRef.current[i + 1], {
                opacity: 0,
                y: 40,
                duration: 0.4,
              });
            }
            // Animate Bullets
            updateBullets(i);
          },
        });
      });

      // 4. Image rotation (smooth + lightweight)
      gsap.to(imageRef.current, {
        rotation: 360,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black text-[#fef5f0]">
      {/* ---------------- HEADER ---------------- */}
      <div className="text-center py-16 px-4">
        <h2 className="uppercase text-sm tracking-wider">History</h2>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-2">
          How We Got Here
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto mt-4">
          Turning talent into triumph through dedication and innovation. With a
          global presence and a human touch, we transform talent into the
          driving force of business growth.
        </p>
      </div>

      {/* ---------------- STICKY CONTENT ---------------- */}
      <div className="sticky top-0 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="flex flex-col-reverse md:flex-row w-full max-w-7xl gap-8 md:gap-12 px-6">
          
          {/* LEFT: TEXT & BULLETS */}
          <div className="flex-1 flex items-center justify-center md:justify-start">
            <div className="flex flex-row items-center gap-6 sm:gap-8 w-full max-w-xl">
              
              {/* --- NEW: VERTICAL BULLETS --- */}
              <div className="flex flex-col gap-4 sm:gap-6 items-center z-10">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    ref={(el) => (bulletsRef.current[i] = el)}
                    className="w-3 h-3 rounded-full bg-gray-600 transition-colors"
                  />
                ))}
              </div>

              {/* --- TEXT CONTAINER --- */}
              <div className="relative w-full h-[300px] sm:h-[250px] flex items-center">
                {STEPS.map((step, i) => (
                  <div
                    key={i}
                    ref={(el) => (stepsRef.current[i] = el)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 w-full"
                  >
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4 text-white">
                      {step.title}
                    </h2>

                    <p className="text-gray-300 text-sm sm:text-[15px] leading-[24px] sm:leading-[26px]">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="flex-1 flex justify-center items-center">
            <img
              ref={imageRef}
              src={logo520}
              srcSet={`
                ${logo320} 320w,
                ${logo400} 400w,
                ${logo520} 520w
              `}
              sizes="
                (max-width: 640px) 70vw,
                (max-width: 1024px) 45vw,
                (max-width: 1440px) 360px,
                420px
              "
              alt="Why Choose Us"
              loading="lazy"
              className="
                aspect-square
                rounded-full
                object-cover

                w-[60vw] max-w-[200px]          /* Mobile */
                sm:w-[45vw] sm:max-w-[280px]   /* Tablet */
                lg:w-[360px] lg:max-w-[360px]  /* Desktop */
                xl:w-[420px] xl:max-w-[420px]  /* Large desktop */

                will-change-transform
              "
            />
          </div>
        </div>
      </div>

      {/* ---------------- SCROLL SPACE ---------------- */}
      <div style={{ height: `${STEPS.length * 400}px` }} />
    </section>
  );
};

export default WhyChooseUs;