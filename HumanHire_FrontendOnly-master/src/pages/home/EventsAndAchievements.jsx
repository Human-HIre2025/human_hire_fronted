import React, { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import carouselService from "../../services/carouselService";
import getOptimizedImageUrl from "../../utils/getOptimizedImageUrl ";
import { PenTool, Calendar, X, ArrowRight, Search } from "lucide-react";
import SEO from "../../components/SEO";

gsap.registerPlugin(ScrollTrigger);

const EventsAndAchievements = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogsData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const setCardRef = useCallback((el, index) => {
    if (el) cardRefs.current[index] = el;
  }, []);

  const handleOpenBlog = (blog) => {
    setSelectedBlog(blog);
    window.history.pushState({}, "", `/blogs?post=${blog._id}`);
  };

  const handleCloseBlog = () => {
    setSelectedBlog(null);
    window.history.pushState({}, "", "/blogs");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await carouselService.getCarouselImagesByType("event");
        setBlogsData(res);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (blogsData.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const postId = params.get("post");
      if (postId) {
        const found = blogsData.find((b) => b._id === postId);
        if (found) {
          setSelectedBlog(found);
        }
      }
    }
  }, [blogsData]);

  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedBlog]);

  useEffect(() => {
    if (loading || blogsData.length === 0) return;
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        ScrollTrigger.batch(cardRefs.current, {
          start: "top 85%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
              }
            );
          },
        });
      }, sectionRef);
      return () => ctx.revert();
    }, 100);
    return () => clearTimeout(timer);
  }, [loading, blogsData]);

  const getTextPreview = (htmlText, maxLength = 120) => {
    if (!htmlText) return "Explore our latest insights and updates.";
    const plainText = htmlText.replace(/<[^>]+>/g, "").trim();
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  const getTitle = (htmlText) => {
    const match = htmlText.match(/<h[1-2][^>]*>([\s\S]*?)<\/h[1-2]>/i);
    if (match) return match[1].replace(/<[^>]+>/g, "");
    const boldMatch = htmlText.match(/<strong>([\s\S]*?)<\/strong>/i);
    if (boldMatch) return boldMatch[1].replace(/<[^>]+>/g, "");
    return getTextPreview(htmlText, 60);
  };

  if (loading) return <div className="py-20 text-center bg-black text-pink-500 h-screen flex items-center justify-center font-bold text-2xl tracking-widest animate-pulse">LOADING...</div>;
  if (error) return <div className="py-20 text-center bg-black text-white">{error}</div>;

  const featuredBlogs = blogsData.slice(0, 2);
  const remainingBlogs = blogsData.slice(2);

  return (
    <div ref={sectionRef} className="bg-black font-sans antialiased overflow-x-hidden selection:bg-pink-600 selection:text-white">
      <SEO
        title={
          selectedBlog
            ? `${getTitle(selectedBlog.text)} | Recruitment & HR Insights`
            : "Recruitment & HR Insights"
        }
        description={
          selectedBlog
            ? getTextPreview(selectedBlog.text, 150)
            : "Read expert tips on RPO staffing, HR solutions, workforce consulting & global hiring trends from the Humanhire Corp blog."
        }
        canonical={
          selectedBlog
            ? `https://humanhirecorp.com/blogs?post=${selectedBlog._id}`
            : "https://humanhirecorp.com/blogs"
        }
      />

      {/* SECTION 1: LATEST POSTS */}
      <section className="pt-24 pb-20 px-6 lg:px-20 relative overflow-hidden">
        {/* Decorative Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-white text-2xl md:text-4xl font-bold text-center mb-20 tracking-tighter">
            Our <span className="text-pink-500">latest</span> posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {featuredBlogs.map((blog, index) => (
              <div
                key={blog._id}
                ref={(el) => setCardRef(el, index)}
                onClick={() => handleOpenBlog(blog)}
                className="group flex flex-col h-full cursor-pointer max-w-xl mx-auto"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-3xl mb-10 relative border border-white/10 group-hover:border-pink-500/50 transition-colors duration-500 shadow-2xl">
                  <img
                    src={getOptimizedImageUrl(blog.imageUrl)}
                    alt="Blog"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>

                <div className="flex flex-col flex-grow px-2">
                  <span className="text-pink-500 font-black text-xs uppercase tracking-[0.3em] mb-4">
                    Featured Insight
                  </span>
                  <h3 className="text-white text-2xl md:text-2xl font-bold leading-[1.15] mb-6 group-hover:text-pink-400 transition-colors duration-300">
                    {getTitle(blog.text)}
                  </h3>

                  <div className="flex items-center gap-6 mb-8 text-gray-400 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center">
                        <PenTool size={14} className="text-pink-500" />
                      </div>
                      <span>Admin</span>
                    </div>
                    <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                      <Calendar size={14} className="text-pink-500" />
                      <span>Feb 19, 2026</span>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-10 line-clamp-3 text-lg leading-relaxed">
                    {getTextPreview(blog.text, 180)}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenBlog(blog);
                    }}
                    className="w-fit flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-pink-500 hover:text-white transition-all duration-300 transform group-hover:translate-x-2"
                  >
                    Read Article <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: ALL ARTICLES GRID (BLACK THEME) */}
      <section className="bg-black py-24 px-6 lg:px-20 relative">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-600/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-white text-3xl md:text-3xl font-bold tracking-tight mb-2">
                All <span className="text-pink-500">Articles</span>
              </h2>
              <div className="h-1.5 w-24 bg-pink-600 rounded-full" />
            </div>

            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-full py-3 pl-11 pr-5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
              />
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {remainingBlogs.map((blog, index) => (
              <div
                key={blog._id}
                ref={(el) => setCardRef(el, index + 2)}
                onClick={() => handleOpenBlog(blog)}
                className="bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col h-full hover:border-pink-500/30 transition-all duration-500 group relative shadow-2xl cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={getOptimizedImageUrl(blog.imageUrl)}
                    alt="Blog"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-pink-500 text-[10px] font-black uppercase tracking-widest">
                    AI Agents
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h4 className="text-white text-xl font-bold mb-6 line-clamp-2 leading-tight group-hover:text-pink-400 transition-colors">
                    {getTitle(blog.text)}
                  </h4>

                  <div className="flex items-center gap-4 mb-8 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-pink-500" /> Feb 16, 2026</span>
                    <span className="w-1 h-1 rounded-full bg-pink-600" />
                    <span>5 Min Read</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenBlog(blog);
                    }}
                    className="mt-auto w-full py-3 rounded-2xl bg-white/5 text-white font-bold text-xs uppercase tracking-[0.2em] border border-white/10 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all duration-300"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="mt-24 flex justify-center">
            <button className="group relative px-12 py-5 bg-transparent text-white font-black text-sm uppercase tracking-widest overflow-hidden border border-white/20 rounded-xl hover:border-pink-500 transition-colors duration-500">
              <span className="relative z-10">See more articles</span>
              <div className="absolute inset-0 bg-pink-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
          </div> */}
        </div>
      </section>

      {/* CREATIVE DARK MODAL */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl"
          >
            <div className="absolute inset-0" onClick={handleCloseBlog} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative bg-[#080808] w-full max-w-5xl max-h-[90vh] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(236,72,153,0.1)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-8 right-8 z-30 p-3 bg-white/5 hover:bg-pink-600 text-white rounded-2xl transition-all backdrop-blur-md border border-white/10"
                onClick={handleCloseBlog}
              >
                <X size={24} />
              </button>

              <div className="overflow-y-auto custom-scrollbar">
                <div className="relative h-[40vh] md:h-[55vh] w-full">
                  <img
                    src={getOptimizedImageUrl(selectedBlog.imageUrl)}
                    alt="Detail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-10 md:p-16">
                    <span className="inline-block px-4 py-1.5 bg-pink-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-md mb-6">
                      Deep Dive
                    </span>
                    <h2 className="text-white text-3xl md:text-5xl font-black leading-none tracking-tighter">
                      {getTitle(selectedBlog.text)}
                    </h2>
                  </div>
                </div>

                <div className="p-10 md:p-16 pt-0">
                  <div
                    className="prose prose-invert prose-pink max-w-none text-gray-300 text-lg leading-relaxed
                      prose-headings:text-white prose-headings:font-bold 
                      prose-strong:text-pink-500 prose-a:text-pink-400"
                    dangerouslySetInnerHTML={{ __html: selectedBlog.text }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #080808;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #222;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ec4899;
        }
      `}</style>
    </div>
  );
};

export default EventsAndAchievements;