import React, { useEffect, useRef, useState } from "react";

const texts = ["Connecting Talent.", "Empowering Growth.", "Hiring Made Easy."];

const Hero = () => {
  const [currentText, setCurrentText] = useState("");
  const videoRef = useRef(null);

  /* ---------------- TYPING EFFECT ---------------- */
  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let timeout;

    const type = () => {
      const fullText = texts[textIndex];
      if (charIndex <= fullText.length) {
        setCurrentText(fullText.slice(0, charIndex));
        charIndex++;
        timeout = setTimeout(type, 80);
      } else {
        timeout = setTimeout(() => {
          charIndex = 0;
          textIndex = (textIndex + 1) % texts.length;
          type();
        }, 1200);
      }
    };

    type();
    return () => clearTimeout(timeout);
  }, []);

  /* ---------------- FORCE AUTOPLAY (iOS SAFE) ---------------- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    playVideo();
    document.addEventListener("touchstart", playVideo, { once: true });

    return () => {
      document.removeEventListener("touchstart", playVideo);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* POSTER IMAGE (LCP) */}
      <img
        src="/hero-poster.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        fetchpriority="high"
        loading="eager"
        decoding="async"
      />

      {/* VIDEO (ALL DEVICES) */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.webp"
      >
        <source
          src="https://res.cloudinary.com/dfrbw0yzi/video/upload/f_auto,q_80,w_720/home_fz58wh.mp4"
          media="(max-width: 768px)"
          type="video/mp4"
        />

        <source
          src="https://res.cloudinary.com/dfrbw0yzi/video/upload/f_auto,q_80,w_1920/home_fz58wh.mp4"
          type="video/mp4"
        />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* TEXT */}
      <div className="relative z-20 flex items-center justify-center h-full px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white min-h-[4rem]">
          {currentText}
          <span className="border-r-2 border-white animate-pulse ml-1" />
        </h1>
      </div>
    </section>
  );
};

export default Hero;
