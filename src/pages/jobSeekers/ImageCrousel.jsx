import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from '../../assets/jobseeker/hs21.jpg';
import img2 from '../../assets/jobseeker/hs24.jpg';
import img3 from '../../assets/jobseeker/hs25.jpg';
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "John Doe",
    image: img1,
  },
  {
    name: "Jane Smith",
    image: img2,
  },
  {
    name: "Aarav Patel",
    image: img3,
  },
  // {
  //   name: "Sara Khan",
  //   image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop",
  // },
  // {
  //   name: "Joe",
  //   image: "https://images.unsplash.com/photo-1610088441520-4352457e7095?q=80&w=1287&auto=format&fit=crop",
  // },
  // {
  //   name: "Joe",
  //   image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  // },
  // {
  //   name: "Zoya",
  //   image: "https://images.pexels.com/photos/160414/female-portrait-studio-attractive-160414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  // },
];

const ImageCrousel = () => {
  const imageRefs = useRef([]);
   const sectionRef = useRef(null);
  useEffect(() => {
    // Animate only the first set of team members
    gsap.fromTo(
      imageRefs.current,
      { scale: 0.6, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: "back.out(1.7)",
        // stagger: 0.3,
        scrollTrigger: {
          trigger: imageRefs.current[0],
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section className="bg-black py-12 text-white">
      <div className="overflow-hidden relative w-full">
        <div className="flex animate-scroll">
          {/* Original images with refs for GSAP */}
          {teamMembers.map((member, index) => (
            <div
              key={`original-${index}`}
              ref={(el) => (imageRefs.current[index] = el)}
              className="w-[250px] h-[420px] flex-shrink-0 opacity-0 scale-[0.6]"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}

          {/* Duplicates for infinite scroll (no refs or animation) */}
          {teamMembers.concat(teamMembers).map((member, index) => (
            <div
              key={`clone-${index}`}
              className="w-[250px] h-[420px] flex-shrink-0"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy" 
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-66.666%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ImageCrousel;

