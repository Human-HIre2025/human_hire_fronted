import React, { useEffect, useRef, useState, useMemo } from "react";
import clientService from "../../services/clientsServices";
import { gsap } from "gsap";
import getOptimizedImageUrl from "../../utils/getOptimizedImageUrl ";

const OurPartners = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const widthRef = useRef(0); // ✅ cache width (NO repeated reflow)

  /* ---------------- FETCH CLIENTS ---------------- */
  useEffect(() => {
    let mounted = true;

    const fetchClients = async () => {
      try {
        const response = await clientService.getClients();
        if (mounted) setClients(response.data || []);
      } catch {
        if (mounted) setError("Failed to load partners data");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchClients();
    return () => (mounted = false);
  }, []);

  const duplicatedClients = useMemo(
    () => [...clients, ...clients],
    [clients]
  );

  /* ---------------- GSAP ANIMATION ---------------- */
  useEffect(() => {
    if (!carouselRef.current || clients.length === 0) return;

    const carousel = carouselRef.current;

    //  Wait till next frame → layout stable
    requestAnimationFrame(() => {
      //  Read layout ONCE only
      if (!widthRef.current) {
        widthRef.current = carousel.scrollWidth / 2;
      }

      animationRef.current = gsap.to(carousel, {
        x: -widthRef.current,
        duration: 90,
        ease: "none",
        repeat: -1,
        force3D: true, // ✅ GPU optimization
      });
    });

    const pause = () => animationRef.current?.pause();
    const resume = () => animationRef.current?.resume();

    carousel.addEventListener("mouseenter", pause);
    carousel.addEventListener("mouseleave", resume);

    return () => {
      animationRef.current?.kill();
      carousel.removeEventListener("mouseenter", pause);
      carousel.removeEventListener("mouseleave", resume);
    };
  }, [clients]);

  /* ---------------- LOADING / ERROR ---------------- */
  if (loading || error || clients.length === 0) {
    return (
      <section className="bg-black py-12 overflow-hidden">
        <div className="flex items-center justify-center mb-10">
          <div className="w-3 h-3 rounded-full border-2 border-[#a64d79] mr-3" />
          <h2 className="text-[#fef5f0] text-sm font-semibold uppercase">
            Our Partners
          </h2>
        </div>
        <div className="flex justify-center items-center h-32">
          <div className={`text-${error ? "red-400" : "[#fef5f0]"}`}>
            {error || "Loading partners..."}
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <section className="bg-black py-12 overflow-hidden">
      <div className="flex items-center justify-center mb-10">
        <div className="w-3 h-3 rounded-full border-2 border-[#a64d79] mr-3" />
        <h2 className="text-[#fef5f0] text-sm font-semibold uppercase">
          Our Partners
        </h2>
      </div>

      <div className="relative w-full overflow-hidden px-6">
        <div
          ref={carouselRef}
          className="flex gap-12 whitespace-nowrap w-max will-change-transform"
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client._id}-${index}`}
              className="flex items-center justify-center min-w-[120px] sm:min-w-[150px] md:min-w-[200px] h-[80px] sm:h-[100px] md:h-[120px]"
            >
              <img
                src={getOptimizedImageUrl(client.logo)}
                alt={client.clientName}
                loading="lazy"
                className="h-[60px] sm:h-[80px] md:h-[100px] w-auto object-contain hover:scale-105 transition-transform duration-300 filter brightness-[1.25] contrast-[1.2] saturate-[1.5]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
