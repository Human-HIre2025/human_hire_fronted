import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import teamMemberService from "../../services/teamMemberServices";
import getOptimizedImageUrl from "../../utils/getOptimizedImageUrl ";

export default function Hero() {
  const [teamData, setTeamData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await teamMemberService.getFeaturedTeamMembers();
        setTeamData(res.data || []);
      } catch (error) {
        console.error("Error fetching featured team members:", error.message);
      }
    };

    fetchTeamMembers();
  }, []);

  useEffect(() => {
    if (teamData.length === 0) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [current, teamData.length]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) =>
      newDirection === 1
        ? (prev + 1) % teamData.length
        : (prev - 1 + teamData.length) % teamData.length
    );
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
  };

  const member = teamData[current];

  if (teamData.length === 0) {
    return (
      <section className="h-[80vh] bg-black text-[#fef5f0] flex items-center justify-center">
        <p className="text-xl">Loading team members...</p>
      </section>
    );
  }

  return (
    <section className="bg-black text-[#fef5f0] min-h-[80vh] flex items-center justify-center relative overflow-hidden px-4 md:px-12">
      {/* Left Arrow */}
      <button
        onClick={() => paginate(-1)}
        className="absolute top-1/2 left-2 sm:left-6 transform -translate-y-1/2 z-20 bg-[#1a1a1a] p-2 rounded-full hover:bg-[#2a2a2a] transition"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => paginate(1)}
        className="absolute top-1/2 right-2 sm:right-6 transform -translate-y-1/2 z-20 bg-[#1a1a1a] p-2 rounded-full hover:bg-[#2a2a2a] transition"
      >
        <ChevronRight size={28} />
      </button>

      <div className="relative w-full max-w-7xl flex flex-col-reverse md:flex-row items-center justify-between gap-10 py-16">
        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left px-4 sm:px-0 relative min-h-[200px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={member._id + "-text"}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="space-y-4"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
                {member.name}
              </h2>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
                {member.position}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0">
                {member.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 relative flex justify-center px-4 sm:px-0 min-h-[400px] translate-y-16">
          <AnimatePresence custom={direction} mode="wait">
            <motion.img
              key={member._id + "-image"}
              src={getOptimizedImageUrl(member.image)}
              alt={member.name}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] xl:w-[600px] object-contain"
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}