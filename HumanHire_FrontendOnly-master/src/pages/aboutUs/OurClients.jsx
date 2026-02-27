import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clientService from "../../services/clientsServices";
import getOptimizedImageUrl from "../../utils/getOptimizedImageUrl ";

gsap.registerPlugin(ScrollTrigger);

const OurClients = () => {
  const overlayRef = useRef(null);
  const playButtonRef = useRef(null);
  const textRef = useRef(null);
  const clientsRef = useRef(null);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await clientService.getClients();
        if (response.success) {
          setClients(response.data);
        } else {
          setError("Failed to fetch clients");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    let playButtonAnimation = null;
    let textScrollTrigger = null;
    let clientsScrollTrigger = null;

    // Animate play button with a subtle pulse effect
    playButtonAnimation = gsap.to(playButtonRef.current, {
      scale: 1.05,
      duration: 1.5, // Reduced duration for faster effect on small devices
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Animate text with stagger effect
    if (textRef.current && textRef.current.children.length > 0) {
      const textAnimation = gsap.fromTo(
        textRef.current.children,
        { y: 20, opacity: 0 }, // Reduced y offset for small devices
        {
          y: 0,
          opacity: 1,
          duration: 0.5, // Reduced duration
          ease: "power2.out",
          stagger: 0.15, // Tighter stagger
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%", // Adjusted for smaller screens
            toggleActions: "play none none reverse",
          },
        }
      );
      textScrollTrigger = textAnimation.scrollTrigger;
    }

    // Animate client logos when they're loaded
    if (clients.length > 0 && clientsRef.current) {
      const clientsAnimation = gsap.fromTo(
        clientsRef.current.children,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4, // Reduced duration
          ease: "power2.out",
          stagger: 0.08, // Tighter stagger
          scrollTrigger: {
            trigger: clientsRef.current,
            start: "top 95%", // Adjusted for smaller screens
            toggleActions: "play none none reverse",
          },
        }
      );
      clientsScrollTrigger = clientsAnimation.scrollTrigger;
    }

    return () => {
      if (playButtonAnimation) playButtonAnimation.kill();
      if (textScrollTrigger) textScrollTrigger.kill();
      if (clientsScrollTrigger) clientsScrollTrigger.kill();
    };
  }, [clients]);

  return (
    <div className="relative bg-black">
      <div
        className="relative min-h-[50vh] sm:min-h-[80vh] lg:min-h-[90vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2071&q=80')`,
          backgroundAttachment: "fixed", // Fallback to scroll on mobile
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2071&q=80"
          alt="Client showcase background"
          className="absolute inset-0 w-full h-full object-cover opacity-0"
          aria-hidden="true"
        />

        {/* Main Content */}
        <div
          ref={overlayRef}
          className="relative z-10 max-w-5xl sm:max-w-7xl mx-auto flex flex-col justify-center items-center min-h-[50vh] sm:min-h-[80vh] lg:min-h-[90vh] px-3 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16 border-t-2 sm:border-t-4 border-[#a64d79]"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

          {/* Text Content */}
          <div
            ref={textRef}
            className="relative z-20 mb-4 sm:mb-8 lg:mb-12 text-center"
          >
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#fef5f0] leading-tight">
              <span className="block max-w-[16rem] sm:max-w-sm md:max-w-md lg:max-w-lg font-bold">
                Experience a workplace where innovation comes to life.
              </span>
            </h1>
          </div>

          {/* Play Button */}
          <div className="relative z-20 flex justify-center mb-4 sm:mb-8 lg:mb-12">
            <button
              ref={playButtonRef}
              className="relative group focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-[#a64d79] focus:ring-opacity-50 rounded-full transition-all duration-300"
              aria-label="Play video about our workplace innovation"
            >
              {/* Outer ring */}
              <div className="absolute inset-0 bg-[#a64d79] bg-opacity-20 rounded-full animate-ping"></div>

              {/* Button core */}
              <div className="relative w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#a64d79] to-pink-600 rounded-full flex items-center justify-center shadow-xl sm:shadow-2xl group-hover:shadow-[#a64d79]/25 transition-all duration-300 group-hover:scale-105">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#fef5f0] ml-0.5 sm:ml-1 group-hover:ml-0.5 sm:group-hover:ml-1.5 transition-all duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {/* Hover Ring */}
              <div className="absolute inset-0 border-1 sm:border-2 border-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
            </button>
          </div>

          {/* Clients Section */}
          <div className="relative z-20 w-full max-w-3xl sm:max-w-5xl lg:max-w-6xl mx-auto">
            <div className="text-center mb-4 sm:mb-8 lg:mb-10">
              <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-[#fef5f0] mb-2 sm:mb-3 lg:mb-4">
                Our Trusted Clients
              </h2>
              <p className="text-gray-300 text-[0.65rem] sm:text-sm lg:text-base">
                We're proud to work with these amazing organizations
              </p>
            </div>

            {loading ? (
              <div className="text-center text-white">
                <div className="inline-block animate-spin rounded-full h-5 w-5 sm:h-8 sm:w-8 border-b-2 border-[#a64d79]"></div>
                <p className="mt-2 sm:mt-4 text-[0.65rem] sm:text-sm">
                  Loading clients...
                </p>
              </div>
            ) : error ? (
              <div className="text-center text-red-400">
                <p className="text-[0.65rem] sm:text-sm">Error: {error}</p>
              </div>
            ) : clients.length === 0 ? (
              <div className="text-center text-gray-400">
                <p className="text-[0.65rem] sm:text-sm">
                  No clients to display at the moment.
                </p>
              </div>
            ) : (
              <div
                ref={clientsRef}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 lg:gap-8"
              >
                {clients.map((client) => (
                  <div
                    key={client._id}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-[#a64d79]/50"
                  >
                    <div className="aspect-square flex items-center justify-center">
                      <img
                        src={getOptimizedImageUrl(client.logo)}
                        alt={`${client.clientName} logo`}
                        className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div
                        className="hidden w-full h-full items-center justify-center text-white text-[0.6rem] sm:text-xs text-center p-1 sm:p-2"
                        style={{ display: "none" }}
                      >
                        {client.clientName}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurClients;
