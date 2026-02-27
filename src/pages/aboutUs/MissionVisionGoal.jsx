import React from 'react';
import { Send, Eye, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },   // bigger offset for more movement
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }  // smoother easing and longer duration
  },
};

export default function MissionVisionGoal() {
  return (
    <section className="bg-[#0a0a0f] text-white w-full px-4 md:px-10 py-16">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
      >
        {/* Mission */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="bg-[#aa5c82] rounded-full p-3">
            <Send className="text-white w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">Our Mission</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            To empower businesses by delivering innovative digital solutions that enhance their online presence and fuel sustainable growth in a competitive market.
          </p>
        </div>

        {/* Vision */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="bg-[#aa5c82] rounded-full p-3">
            <Eye className="text-white w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">Our Vision</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            To be recognized globally as a trusted digital agency, renowned for exceptional quality, groundbreaking innovation, and unwavering dedication to client success.

          </p>
        </div>

        {/* Goal */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="bg-[#aa5c82] rounded-full p-3">
            <Lightbulb className="text-white w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">Our Goal</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
          We strive to surpass client expectations through customized solutions, fostering strong partnerships built on trust, collaboration, and shared achievements.

          </p>
        </div>
      </motion.div>
    </section>
  );
}
