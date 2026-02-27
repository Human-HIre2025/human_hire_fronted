import React, { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";
import bgimg from "../../assets/testimonial/background.jpg";
import avatar from "../../assets/testimonial/avatar.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import testimonialService from "../../services/testimonialServices";
import getOptimizedImageUrl from "../../utils/getOptimizedImageUrl ";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [brightness, setBrightness] = useState(0.4);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  const animationRef = useRef(null);
  const isPaused = useRef(false);
  const scrollTriggerInstances = useRef([]);
  const gsapTimelines = useRef([]);

  const testimonialRefs = useRef([]);
  testimonialRefs.current = [];
  const addToTestimonialRefs = (el) => {
    if (el && !testimonialRefs.current.includes(el)) {
      testimonialRefs.current.push(el);
    }
  };

  // Fallback testimonials in case API fails
  const fallbackTestimonials = [
    {
      authorName: "Aarav Mehta",
      authorPosition: "Software Engineer at TechNova",
      authorImg: avatar,
      review:
        "This recruitment firm helped me find my dream job in just two weeks. The process was smooth and highly professional.",
    },
    {
      authorName: "Priya Sharma",
      authorPosition: "HR Manager at FinEdge Corp",
      authorImg: avatar,
      review:
        "They consistently deliver top-tier candidates who match our company culture perfectly.",
    },
    {
      authorName: "Rohan Kapoor",
      authorPosition: "Marketing Lead at Brandly",
      authorImg: avatar,
      review:
        "Efficient and transparent—our hiring cycle was cut down significantly thanks to their streamlined process.",
    },
    {
      authorName: "Sneha Verma",
      authorPosition: "Data Analyst at DataPeak",
      authorImg: avatar,
      review:
        "I'm grateful for their continuous support and expert guidance throughout my job hunt.",
    },
  ];

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await testimonialService.getTestimonials();

        if (response.success && response.data && response.data.length > 0) {
          setTestimonials(response.data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError(err.message || "Failed to fetch testimonials");
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Scroll-based brightness effect with proper cleanup
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let isActive = false;
    let rafId = null;

    const handleScroll = () => {
      if (!isActive) return;

      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionTop = rect.top + window.scrollY;
        const sectionHeight = rect.height;

        const scrollPosition = window.scrollY + windowHeight - sectionTop;
        const scrollFraction = Math.min(
          Math.max(scrollPosition / sectionHeight, 0),
          1
        );

        const newBrightness = 0.4 + scrollFraction * 0.9;
        setBrightness(newBrightness);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isActive = true;
          window.addEventListener("scroll", handleScroll, { passive: true });
          handleScroll();
        } else {
          isActive = false;
          window.removeEventListener("scroll", handleScroll);
          if (rafId) {
            cancelAnimationFrame(rafId);
          }
          setBrightness(0.4);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      isActive = false;
      observer.unobserve(section);
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Fixed infinite marquee animation using CSS transforms
  useEffect(() => {
    if (testimonials.length === 0) return;

    const marquee = marqueeRef.current;
    if (!marquee) return;

    let isComponentMounted = true;
    let translateX = 0;
    const speed = 0.5; // Pixels per frame

    const animate = () => {
      if (!isComponentMounted || !marquee) return;

      if (!isPaused.current) {
        translateX -= speed;

        // Calculate the width of one complete set of testimonials
        const singleSetWidth = marquee.scrollWidth / 2; // We duplicate the testimonials

        // Reset position when we've scrolled through one complete set
        if (Math.abs(translateX) >= singleSetWidth) {
          translateX = 0;
        }

        marquee.style.transform = `translateX(${translateX}px)`;
      }

      if (isComponentMounted) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      isComponentMounted = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [testimonials]);

  // GSAP animations with proper scoping and cleanup
  useEffect(() => {
    if (testimonials.length === 0) return;

    gsapTimelines.current.forEach((tl) => tl.kill());
    scrollTriggerInstances.current.forEach((st) => st.kill());
    gsapTimelines.current = [];
    scrollTriggerInstances.current = [];

    testimonialRefs.current.forEach((el, i) => {
      if (!el) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "restart none none reset",
          onUpdate: (self) => {
            if (self.isActive) {
              // Animation is active for this element only
            }
          },
        },
      });

      tl.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: i * 0.1,
          ease: "power3.out",
        }
      );

      gsapTimelines.current.push(tl);

      if (tl.scrollTrigger) {
        scrollTriggerInstances.current.push(tl.scrollTrigger);
      }
    });

    return () => {
      gsapTimelines.current.forEach((tl) => tl.kill());
      scrollTriggerInstances.current.forEach((st) => st.kill());
      gsapTimelines.current = [];
      scrollTriggerInstances.current = [];
    };
  }, [testimonials]);

  // Final cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      gsapTimelines.current.forEach((tl) => tl.kill());
      scrollTriggerInstances.current.forEach((st) => st.kill());

      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger &&
          sectionRef.current &&
          sectionRef.current.contains(trigger.trigger)
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  if (loading) {
    return (
      <section
        ref={sectionRef}
        className="relative w-full min-h-[60vh] sm:min-h-[70vh] flex text-[#fef5f0] overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={bgimg}
            alt="Background"
            className="w-full h-full object-cover transition duration-300"
            style={{ filter: `brightness(${brightness})` }}
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-[#a64d79] mx-auto mb-4"></div>
            <p className="text-[#fef5f0]/80 text-xs sm:text-sm">
              Loading testimonials...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[60vh] sm:min-h-[70vh] flex text-[#fef5f0] overflow-hidden"
      data-component="testimonials"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgimg}
          alt="Background"
          className="w-full h-full object-cover transition duration-300"
          style={{ filter: `brightness(${brightness})` }}
          loading="lazy" 
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mx-auto ">
          {/* Section Heading */}
          <div className="flex justify-center items-center mb-4 sm:mb-6">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-[#a64d79] mr-2 sm:mr-4" />
            <h2 className="text-[#fef5f0] text-xs sm:text-sm font-semibold uppercase">
              Testimonials
            </h2>
          </div>

          {/* Sub-heading */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-extrabold mt-6 sm:mt-8 lg:mt-10 mb-8 sm:mb-10 lg:mb-12">
            What our clients say
          </h3>

          {/* Infinite Marquee Container */}
          <div
            ref={containerRef}
            className="carousel-container overflow-hidden w-full"
            onMouseEnter={() => (isPaused.current = true)}
            onMouseLeave={() => (isPaused.current = false)}
            onTouchStart={() => (isPaused.current = true)}
            onTouchEnd={() => (isPaused.current = false)}
          >
            <div
              ref={marqueeRef}
              className="marquee flex flex-nowrap gap-3 sm:gap-4 md:gap-6 will-change-transform "
              style={{
                width: "fit-content",
              }}
            >
              {/* Render testimonials twice for seamless infinite scroll */}
              {testimonials
                .concat(testimonials)
                .concat(testimonials)
                .concat(testimonials)
                .concat(testimonials)
                .map((testimonial, index) => (
                  <div
                    key={`${
                      testimonial._id || testimonial.authorName
                    }-${index}`}
                    ref={addToTestimonialRefs}
                    className="testimonial-card w-[75vw] xs:w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px] flex-shrink-0 backdrop-blur-md bg-white/10 rounded-2xl p-3 sm:p-4 md:p-6 border border-white/20 shadow-xl h-auto min-h-[180px] sm:min-h-[200px] md:min-h-[240px]"
                    data-testimonial-index={index}
                  >
                    <Quote className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#fef5f0]/60 mb-2 sm:mb-3" />
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                      <img
                        src={getOptimizedImageUrl(
                          testimonial.authorImg || avatar
                        )}
                        alt={testimonial.authorName}
                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-white/30 flex-shrink-0"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = avatar;
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-extrabold text-xs sm:text-sm md:text-base truncate">
                          {testimonial.authorName}
                        </h3>
                        <p className="text-[#fef5f0]/70 text-xs sm:text-sm truncate">
                          {testimonial.authorPosition}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#fef5f0]/90 italic text-xs sm:text-sm md:text-base leading-relaxed line-clamp-4">
                      {testimonial.review}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          animation-play-state: running;
        }

        .testimonial-card {
          transition: transform 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
