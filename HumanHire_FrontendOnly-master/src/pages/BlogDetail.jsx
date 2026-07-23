import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import carouselService from "../services/carouselService";
import getOptimizedImageUrl from "../utils/getOptimizedImageUrl ";
import SEO from "../components/SEO";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        // Fallback: If getCarouselImageById throws 404 because the API doesn't exist, fetch all and filter
        let data;
        try {
          data = await carouselService.getCarouselImageById(id);
        } catch (apiError) {
          const allBlogs = await carouselService.getCarouselImagesByType("event");
          data = allBlogs.find((b) => b._id === id);
        }
        
        if (data) {
          setBlog(data);
        } else {
          setError("Blog post not found.");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog post.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

  if (loading) {
    return (
      <div className="py-20 text-center bg-black text-pink-500 min-h-screen flex items-center justify-center font-bold text-2xl tracking-widest animate-pulse pt-32">
        LOADING...
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="py-20 text-center bg-black text-white min-h-screen pt-32 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-400 mb-8">{error || "The article you are looking for does not exist."}</p>
        <Link to="/blogs" className="text-pink-500 flex items-center gap-2 hover:text-pink-400">
          <ArrowLeft size={16} /> Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black font-sans antialiased overflow-x-hidden selection:bg-pink-600 selection:text-white min-h-screen pb-20 pt-24">
      <SEO
        title={`${getTitle(blog.text)} | Recruitment & HR Insights`}
        description={getTextPreview(blog.text, 150)}
        canonical={`https://humanhirecorp.com/blog/${blog._id}`}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-0">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Articles
        </Link>

        <div className="relative h-[40vh] md:h-[60vh] w-full rounded-[2rem] overflow-hidden mb-12 shadow-2xl border border-white/5">
          <img
            src={getOptimizedImageUrl(blog.imageUrl)}
            alt={getTitle(blog.text)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full">
            <span className="inline-block px-4 py-1.5 bg-pink-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-md mb-6 shadow-lg shadow-pink-500/20">
              {blog.category || "Insight"}
            </span>
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter">
              {getTitle(blog.text)}
            </h1>
          </div>
        </div>

        <div className="px-4 md:px-12">
          <div
            className="prose prose-invert prose-pink max-w-none text-gray-300 text-lg md:text-xl leading-relaxed
              prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              prose-strong:text-pink-500 prose-a:text-pink-400 prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: blog.text }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
