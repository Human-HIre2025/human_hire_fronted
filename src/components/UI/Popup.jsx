import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // ✅ REQUIRED

/* ---------------- CHECKMARK ICON ---------------- */
const Checkmark = ({ isError }) => (
  <svg
    viewBox="0 0 52 52"
    className={`w-20 h-20 ${isError ? "stroke-red-600" : "stroke-pink-600"}`}
    fill="none"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <motion.path
      d={
        isError
          ? "M16 16 L36 36 M36 16 L16 36"
          : "M14 27 L22 35 L38 19"
      }
      strokeDasharray="34"
      strokeDashoffset="34"
      initial={{ strokeDashoffset: 34 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  </svg>
);

/* ---------------- TYPEWRITER TEXT ---------------- */
const TypewriterText = ({ text }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(idx));
      idx++;
      if (idx >= text.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <h3 className="text-2xl font-bold tracking-tight text-gray-900 select-none relative inline-block mb-4">
      {displayed}
      <motion.span
        className="absolute left-0 bottom-0 h-[3px] bg-gradient-to-r from-pink-600 to-purple-600"
        style={{ width: "100%" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </h3>
  );
};

/* ---------------- POPUP ---------------- */
const Popup = ({ message, type, onClose }) => {
  const isError = type === "error";

  const gradientClass = isError
    ? "from-red-600 to-orange-600"
    : "from-pink-600 to-purple-600";

  const bgGradientClass = isError
    ? "from-red-100 via-orange-100 to-yellow-100"
    : "from-pink-100 via-purple-100 to-blue-100";

  return (
    <>
      {/* OVERLAY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black backdrop-blur-sm z-40"
      />

      {/* MODAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotateX: 20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.7, rotateX: -20 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 max-w-md w-full"
        style={{ perspective: 1000 }}
      >
        <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-white/20 overflow-hidden">
          {/* BACKGROUND GRADIENT */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${bgGradientClass} opacity-30 z-0`}
          />

          {/* CONTENT */}
          <div className="relative z-20 flex flex-col items-center gap-4 text-gray-800">
            <Checkmark isError={isError} />
            <TypewriterText text={message} />

            <p className="text-center text-sm text-gray-600 max-w-xs">
              {isError
                ? "Please try again or contact support if the issue persists."
                : "You're all set! We'll reach out soon to confirm your details."}
            </p>

            {/* BUTTON (SAFE – NO DYNAMIC TAILWIND) */}
            <button
              onClick={onClose}
              className={`relative overflow-hidden rounded-full px-10 py-3 mt-2 font-semibold text-white bg-gradient-to-r ${gradientClass} transition-all duration-300 shadow-md hover:shadow-lg`}
            >
              <span className="relative z-10">Got It!</span>
              <motion.div
                className="absolute inset-0 bg-white opacity-20"
                initial={{ scaleX: 0, x: "-100%" }}
                whileHover={{ scaleX: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Popup;
