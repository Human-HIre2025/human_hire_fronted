import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Briefcase,
  Palette,
  BarChart as ChartBar,
  HeartPulse,
  GraduationCap,
} from "lucide-react";
import sales from "../../assets/sales.jpg";
import media from '../../assets/media.png';
import healthcare from '../../assets/heathcareimg.webp';

const JobCategories = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [previousIndex, setPreviousIndex] = useState(null);

  const categories = [
    {
      title: "Technology Hiring",
      icon: <Code className="w-10 h-10" />,
      description:
        "Recruit top-tier software engineers, DevOps specialists, cloud professionals, and IT support talent for fast-moving digital teams.",
      color: "from-[#9AE3E8] to-[#60A8E0]",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop",
    },
    {
      title: "Executive & Corporate Hiring",
      icon: <Briefcase className="w-10 h-10" />,
      description:
        "Identify and place senior leaders, functional heads, business analysts, and corporate administrators who drive organizational success.",
      color: "from-[#60A8E0] to-[#2A3B8F]",
      image:
        "https://images.unsplash.com/photo-1666009373802-7cfe80ddd2ce?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Creative Talent Hiring",
      icon: <Palette className="w-10 h-10" />,
      description:
        "Source skilled designers, content creators, media professionals, and digital creatives to strengthen brand and user experience.",
      color: "from-[#8E44AD] to-[#2A3B8F]",
      image: media,
    },
    {
      title: "Sales & Growth Hiring",
      icon: <ChartBar className="w-10 h-10" />,
      description:
        "Hire sales executives, marketing specialists, business development professionals, and revenue-focused professionals to scale operations.",
      color: "from-[#9AE3E8] to-[#8E44AD]",
      image: sales,
    },
    {
      title: "Healthcare Talent Hiring",
      icon: <HeartPulse className="w-10 h-10" />,
      description:
        "Provide qualified doctors, nurses, pharmacists, and healthcare administrators to meet critical clinical and operational needs.",
      color: "from-[#60A8E0] to-[#8E44AD]",
      image: healthcare,
    },
    {
      title: "BPO & Support Hiring",
      icon: <GraduationCap className="w-10 h-10" />,
      description:
        "Place skilled customer support agents, voice and non-voice process executives, operations specialists, and back-office professionals at scale.",
      color: "from-[#2A3B8F] to-[#9AE3E8]",
      image:
        "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?q=80&w=1473&auto=format&fit=crop",
    },
  ];

  // Preload images to prevent loading delays
  useEffect(() => {
    categories.forEach((category) => {
      const img = new Image();
      img.src = category.image;
    });
  }, []);

  // Update previousIndex when hoveredIndex changes
  useEffect(() => {
    if (hoveredIndex !== null) {
      setPreviousIndex(hoveredIndex);
    }
  }, [hoveredIndex]);

  return (
    <section className="py-20 bg-[#121212] relative overflow-hidden">
      {/* Background Images with Crossfade */}
      {categories.map((category, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out"
          style={{
            backgroundImage: `url(${category.image})`,
            opacity:
              hoveredIndex === index
                ? 1
                : previousIndex === index && hoveredIndex !== null
                ? 0
                : 0,
            zIndex: 1,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-white">
            Specialized Talent Categories
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mt-4">
            Specialised roles require more than just talent they demand the
            right fit. We combine deep industry insight with smart recruitment
            to connect you with professionals who meet your exact criteria.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              category={category}
              index={index}
              isHovered={hoveredIndex === index}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({ category, index, isHovered, setHoveredIndex }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setHoveredIndex(index)}
      onHoverEnd={() => setHoveredIndex(null)}
      className="h-full relative"
    >
      <motion.div
        style={{ perspective: 1000 }}
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? -5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`h-full bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-md overflow-hidden transition-all duration-300 relative`}
      >
        <div className="p-6 h-full flex flex-col relative z-10">
          {/* Icon with gradient background kept as-is */}
          <div
            className={`w-16 h-16 rounded-lg bg-gradient-to-br ${category.color} mb-5 flex items-center justify-center text-white shadow-lg`}
          >
            {category.icon}
          </div>

          <h3 className="text-xl font-semibold text-[#9AE3E8] mb-3 manrope">
            {category.title}
          </h3>
          <p className="text-[#fff]/80 text-sm syne flex-grow">
            {category.description}
          </p>

          {/* Animated bottom line with glass/frosted effect */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
            className="h-[2px] bg-white/30 backdrop-blur-sm rounded-full mt-4 shadow-[0_0_6px_rgba(255,255,255,0.2)]"
          />
        </div>

        {/* Animated gradient overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-white/10 backdrop-blur-md pointer-events-none rounded-xl"
        />
      </motion.div>
    </motion.div>
  );
};

export default JobCategories;
