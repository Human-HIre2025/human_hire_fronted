import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clientService from "../../services/clientsServices";
import getOptimizedImageUrl from "../../utils/getOptimizedImageUrl ";
import bg from "../../assets/cutout2.webp";

gsap.registerPlugin(ScrollTrigger);

export default function Banner() {
  const logoRefs = useRef([]);
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
    let scrollTriggers = [];

    if (clients.length > 0) {
      logoRefs.current.forEach((el, i) => {
        if (!el) return;

        const animation = gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: i * 0.05, // slight delay for stagger effect
          },
        );

        // Store the ScrollTrigger instance
        if (animation.scrollTrigger) {
          scrollTriggers.push(animation.scrollTrigger);
        }
      });
    }

    return () => {
      // Only kill ScrollTriggers created by this component
      scrollTriggers.forEach((trigger) => trigger.kill());
    };
  }, [clients]);

  return (
    <section className="relative min-h-[100vh]  bg-black pb-40">
      {/* Fixed Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-fixed"
        style={{
          backgroundImage: `url(${bg})`,
          filter: "brightness(0.7)",
        }}
      />

      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <div className="relative min-h-[100vh] h-full w-full flex flex-col py-20">
        {/* Title */}
        <div className="flex items-center justify-center mb-10 z-10">
          <div className="w-3 h-3 rounded-full border-2 border-[#a64d79] bg-transparent mr-3" />
          <h2 className="text-[#fef5f0] text-sm font-semibold uppercase ">
            Our Clients
          </h2>
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center max-w-xl mx-auto gap-12 items-center z-10 text-center">
          <div className="space-y-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Partners in success, stronger together
            </h1>
            <p className="text-gray-300 leading-relaxed max-w-3xl">
              Discover the breadth of industries we've worked with,
              demonstrating our versatile capabilities. Highlighting the
              businesses we've collaborated with, creating mutually successful
              partnerships.
            </p>
          </div>
        </div>

        {/* Logos */}
        <div className="flex w-full items-center justify-between gap-20 mt-12 z-10">
          {loading ? (
            <div className="text-center text-white w-full">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#a64d79]"></div>
              <p className="mt-4">Loading clients...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-400 w-full">
              <p>Error: {error}</p>
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center text-gray-400 w-full">
              <p>No clients to display at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-8 gap-y-6 max-w-7xl mx-auto justify-center">
              {clients.map((client, index) => (
                <div
                  key={client._id}
                  ref={(el) => (logoRefs.current[index] = el)}
                  className="flex items-center justify-center opacity-0"
                >
                  <img
                    src={getOptimizedImageUrl(client.logo)}
                    alt={client.clientName}
                    className="w-32 h-32 sm:w-40 sm:h-40 object-contain z-10 transition-opacity duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="hidden w-32 h-32 sm:w-40 sm:h-40 items-center justify-center text-white text-xs text-center p-4 border border-gray-600 rounded-lg bg-gray-800/50"
                    style={{ display: "none" }}
                  >
                    {client.clientName}
                  </div>
                </div>
              ))}

              {/* Fill remaining spaces if needed for visual balance */}
              {clients.length < 6 &&
                [...Array(6 - (clients.length % 6))].map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="w-32 h-32 sm:w-40 sm:h-40"
                  ></div>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
