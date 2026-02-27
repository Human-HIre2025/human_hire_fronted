import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carouselService from "../../services/carouselService";
import getOptimizedImageUrl from "../../utils/getOptimizedImageUrl ";

gsap.registerPlugin(ScrollTrigger);

const OurTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardRefs = useRef([]);
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize cardRefs
  cardRefs.current = [];

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const response = await carouselService.getCarouselImagesByType("team");
        // Preload images to avoid rendering delays
        // const preloadImages = response.map(
        //   (member) =>
        //     new Promise((resolve) => {
        //       const img = new Image();
        //       img.src = member.imageUrl;
        //       img.onload = resolve;
        //       img.onerror = resolve; // Continue even if an image fails
        //     })
        // );
        // await Promise.all(preloadImages);
        setTeamMembers(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching team data:", err);
        setError("Failed to load team data");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  useEffect(() => {
    if (teamMembers.length > 0 && trackRef.current) {
      const ctx = gsap.context(() => {
        // Card entrance animations (batched for performance)
        gsap.fromTo(
          cardRefs.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        // Infinite scroll animation
        const updateAnimation = () => {
          const totalWidth = trackRef.current.scrollWidth / 2; // Half because duplicated
          if (animationRef.current) {
            animationRef.current.kill(); // Kill previous animation
          }
          animationRef.current = gsap.to(trackRef.current, {
            x: -totalWidth,
            duration: 60, // Increased duration for slower speed
            ease: "none",
            repeat: -1,
            onUpdate: () => {
              if (Math.abs(gsap.getProperty(trackRef.current, "x")) >= totalWidth) {
                gsap.set(trackRef.current, { x: 0 });
              }
            },
          });
        };

        // Initial animation setup
        updateAnimation();

        // Handle window resize to update totalWidth
        const handleResize = () => {
          ScrollTrigger.refresh(); // Refresh ScrollTrigger
          updateAnimation(); // Update animation with new dimensions
        };

        // Debounced resize handler
        let resizeTimeout;
        const debouncedResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(handleResize, 200);
        };

        window.addEventListener("resize", debouncedResize);

        // Cleanup resize listener
        return () => {
          window.removeEventListener("resize", debouncedResize);
        };
      }, trackRef.current);

      return () => ctx.revert();
    }
  }, [teamMembers]);

  const handlePause = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleResume = () => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  };

  if (loading || teamMembers.length === 0 || error) {
    return (
      <section className="bg-black py-8 sm:py-10 lg:py-12 text-[#fef5f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-[#a64d79] bg-transparent mr-2 sm:mr-4" />
            <h2 className="text-[#fef5f0] text-xs sm:text-sm font-semibold uppercase">Our Team</h2>
          </div>
          <div className="flex justify-center items-center h-[40vh] sm:h-[50vh]">
            <div className="text-red-400 text-xs sm:text-sm">
              {loading ? "Loading team members..." : error || "No team members available"}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black py-8 sm:py-10 lg:py-12 text-[#fef5f0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-[#a64d79] bg-transparent mr-2 sm:mr-4" />
          <h2 className="text-[#fef5f0] text-xs sm:text-sm font-semibold uppercase">Our Team</h2>
        </div>
      </div>

      <div className="overflow-hidden relative w-full">
        <div
          ref={trackRef}
          className="flex w-max will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)" }} 
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
        >
          {[...teamMembers, ...teamMembers].map((member, index) => (
            <div
              ref={addToRefs}
              key={`${member._id}-${index}`}
              className="w-[60vw] sm:w-[200px] md:w-[220px] lg:w-[240px] h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px] flex-shrink-0 opacity-0"
            >
              <div className="w-full h-full relative group">
                <img
                  src={getOptimizedImageUrl(member.imageUrl)}
                  alt={member.text}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-3 lg:p-4">
                  <p className="text-[#fef5f0] text-xs sm:text-sm lg:text-base font-medium text-center">
                    {member.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;