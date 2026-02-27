import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import testimonialService from "../../services/testimonialServices";
import getOptimizedImageUrl from "../../utils/getOptimizedImageUrl ";

const fallbackTestimonials = [
  {
    review:
      "We now have a fantastic recruitment platform that perfectly encapsulates the essence of our company thanks to them. Their service has exceeded all of our expectations, making us extremely happy.",
    authorName: "Samantha Milner",
    authorPosition: "Hocud PLC",
    authorImg: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    review:
      "Their hiring solutions helped us reduce our time-to-hire drastically. Professional, fast, and reliable—just what we needed.",
    authorName: "Ravi Sharma",
    authorPosition: "TechCore Pvt Ltd",
    authorImg: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    review:
      "Thanks to their strategic approach, we hired top-tier candidates for critical roles. Highly recommended for any growing business.",
    authorName: "Priya Iyer",
    authorPosition: "TalentBridge",
    authorImg: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction === "next" ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction === "next" ? -300 : 300,
    opacity: 0,
  }),
};

export default function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("next");

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

  const paginate = (dir) => {
    if (testimonials.length === 0) return;

    setDirection(dir);
    setCurrent((prev) =>
      dir === "next"
        ? (prev + 1) % testimonials.length
        : (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => paginate("next"), 7000);
    return () => clearInterval(interval);
  }, [current, testimonials.length]);

  if (loading) {
    return (
      <section className="bg-[#15171e] text-white py-20 px-4 text-center relative w-full overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/30 mx-auto mb-4"></div>
              <p className="text-white/80">Loading testimonials...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="bg-[#15171e] text-white py-20 px-4 text-center relative w-full overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center justify-center min-h-[500px]">
            <p className="text-white/80">No testimonials available</p>
          </div>
        </div>
      </section>
    );
  }

  const testimonial = testimonials[current];

  return (
    <section className="bg-[#15171e] text-white py-16 md:py-24 px-4 text-center relative w-full overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        {/* Quote Icon Background */}
        <Quote className="absolute text-white/5 w-40 h-40 md:w-64 md:h-64 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 select-none pointer-events-none" />

        {/* Improved Wrapper: min-h increased to 600px for mobile safety */}
        <div className="relative w-full min-h-[600px] md:min-h-[450px] flex items-center justify-center z-10 py-12">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={testimonial._id || testimonial.authorName}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col justify-center items-center px-4"
            >
              <TestimonialItem testimonial={testimonial} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fixed Navigation Buttons - Highest Z-index and direct placement */}
        <button
          onClick={() => paginate("prev")}
          aria-label="Previous testimonial"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-50 p-3 md:p-6 cursor-pointer bg-transparent"
        >
          <ChevronLeft className="w-8 h-8 md:w-12 md:h-12 text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-90" />
        </button>
        
        <button
          onClick={() => paginate("next")}
          aria-label="Next testimonial"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-50 p-3 md:p-6 cursor-pointer bg-transparent"
        >
          <ChevronRight className="w-8 h-8 md:w-12 md:h-12 text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-90" />
        </button>
      </div>
    </section>
  );
}

function TestimonialItem({ testimonial }) {
  const { review, authorName, authorPosition, authorImg } = testimonial;

  return (
    <div className="flex flex-col justify-center items-center w-full px-8 md:px-24">
      {/* Testimonial Text - Font size slightly reduced on very small screens to fit */}
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-12 md:mb-16 leading-relaxed max-w-4xl italic font-light text-white/95">
        "{review}"
      </p>
      
      {/* Author Info */}
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-gray-800">
          <img
            src={getOptimizedImageUrl(authorImg)}
            alt={authorName}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://randomuser.me/api/portraits/women/44.jpg";
            }}
          />
        </div>
        <div className="text-center">
          <h4 className="font-bold text-lg md:text-xl text-white tracking-wide uppercase">{authorName}</h4>
          <p className="text-sm md:text-base text-white/50 mt-1 font-medium">{authorPosition}</p>
        </div>
      </div>
    </div>
  );
}