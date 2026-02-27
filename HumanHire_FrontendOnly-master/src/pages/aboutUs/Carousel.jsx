import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1 from '../../assets/vision/img1.png';
import img2 from '../../assets/vision/img2.jpg';
import img3 from '../../assets/vision/img3.jpg';
import img4 from '../../assets/vision/img4.png';
import img5 from '../../assets/vision/img5.jpg';
gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    img: img1,
    title: 'Candidate Screening',
    desc: 'Our experts carefully evaluate each candidate to ensure a perfect job fit.',
  },
  {
    img: img2,
    title: 'Resume Shortlisting',
    desc: 'We filter resumes with precision using AI-powered tools and expert judgment.',
  },
  {
    img: img3,
    title: 'Interview Coordination',
    desc: 'Seamless scheduling and coordination for stress-free interview experiences.',
  },
  {
    img: img4,
    title: 'Employer Branding',
    desc: 'We help showcase your brand as an employer of choice to attract top talent.',
  },
  {
    img: img5,
    title: 'HR Consultation',
    desc: 'Strategic HR support to optimize hiring and talent retention practices.',
  },
];

export default function HoverCarousel() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const el = swiperRef.current;

    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getById(el)?.kill();
    };
  }, []);

  return (
    <section className="bg-[#0a0a0f] py-16 px-4 md:px-0">
      <div ref={swiperRef} className="max-w-7xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
          }}
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative overflow-hidden group border border-gray-700 h-[550px]">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy" 
                />

                {/* Hover overlay */}
                {/* <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center p-4 pointer-events-none">
                  <div className="pointer-events-auto">
                    <h3 className="text-2xl font-extrabold text-[#fef5f0] mb-2">{slide.title}</h3>
                    <p className="text-gray-300 text-sm">{slide.desc}</p>
                  </div>
                </div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
