// import React, { useState, useEffect, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/autoplay";
// import { Autoplay } from "swiper/modules";
// import {
//   Anchor,
//   Search,
//   CheckCircle,
//   User,
//   Building,
//   MapPin,
// } from "lucide-react";
// import { RiDoubleQuotesL } from "react-icons/ri";
// import { getSuccessStoriesByType } from "../../services/successStoryService";

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const tabs = ["Recruitment", "Marketing", "Healthcare"];

// const tabDisplayMap = {
//   Recruitment: {
//     label: "Human Hire Corp",
//     link: "https://humanhirecorp.com",
//   },
//   Marketing: {
//     label: "Being & Brand",
//     link: "/about",
//   },
//   Healthcare: {
//     label: "Humalife Healthcare",
//     link: "https://www.humalifehealthcare.com/",
//   },
// };

// // Mapping from tab label to API type parameter
// const tabKeyMap = {
//   Recruitment: "recruitment",
//   Marketing: "marketing",
//   Healthcare: "healthcare",
// };

// // Default icons for timeline items based on label
// const getTimelineIcon = (label) => {
//   switch (label.toLowerCase()) {
//     case "challenge":
//       return Anchor;
//     case "solution":
//       return Search;
//     case "results":
//       return CheckCircle;
//     default:
//       return CheckCircle; // Fallback icon
//   }
// };

// // Static fallback timeline data for each type
// const fallbackTimelines = {
//   recruitment: [
//     {
//       label: "Challenge",
//       Icon: Anchor,
//       content:
//         "A fast-growing global IT company was struggling to meet its aggressive hiring targets for mid-to-senior level tech roles across India and the UK. Despite multiple hiring partners, they faced: Low candidate quality High drop-out rates during the interview process Long time-to-fill critical positions This slowed down their project delivery and affected internal team productivity.",
//     },
//     {
//       label: "Solution",
//       Icon: Search,
//       content:
//         "HumanHire Corp partnered with the client to revamp their recruitment strategy with a dedicated account management and delivery team. Leveraging our 110+ recruiters and delivery centers in India, UK, and the Philippines, we took a deep-dive approach to understand the client's tech stack, culture, and hiring expectations. We implemented:A customized sourcing strategy using job boards, referrals & talent mapping A rigorous pre-screening process to ensure role alignment Interview coordination, candidate engagement, and feedback follow-up to reduce drop-offs Weekly progress reporting and strategic hiring insights",
//     },
//     {
//       label: "Results",
//       Icon: CheckCircle,
//       content: (
//         <ul className="list-disc list-inside text-left">
//           <li>
//             85+ positions filled within 60 days across Java, DevOps, Data, and
//             Cloud roles
//           </li>
//           <li>Time-to-hire reduced from 45 days to 18 days on average</li>
//           <li>Interview-to-offer ratio improved by 65%</li>
//           <li>92% candidate retention in the first 6 months</li>
//           <li>
//             Recognized as the preferred recruitment partner for ongoing tech and
//             non-tech hiring
//           </li>
//         </ul>
//       ),
//     },
//   ],
//   marketing: [
//     {
//       label: "Challenge",
//       Icon: Anchor,
//       content:
//         "A rising e-commerce company in the UK needed to build a high-performing digital marketing and branding team to support its expansion into European markets. Internal recruiters struggled to find candidates with niche skills in SEO, paid ads, influencer marketing, and content strategy. The urgency was high and quality expectations were strict.A rising e-commerce company in the UK needed to build a high-performing digital marketing and branding team to support its expansion into European markets. Internal recruiters struggled to find candidates with niche skills in SEO, paid ads, influencer marketing, and content strategy. The urgency was high and quality expectations were strict.",
//     },
//     {
//       label: "Solution",
//       Icon: Search,
//       content:
//         "Being & Brand assigned a specialized marketing hiring team that understood the nuances of brand and performance marketing. We: Conducted competitor benchmarking and salary mapping Built talent pipelines for each marketing vertical Pre-screened candidates for creativity, analytics, and campaign experience Provided weekly dashboards and interview support",
//     },
//     {
//       label: "Results",
//       Icon: CheckCircle,
//       content: (
//         <ul className="list-disc list-inside text-left">
//           <li>
//             Filled 35+ marketing roles in 6 weeks across UK and remote markets
//           </li>
//           <li>Time-to-hire improved by 70%</li>
//           <li>
//             Client's campaign ROI increased by 40% within 3 months of team
//             onboarding
//           </li>
//           <li>Retention rate of 95% in first 6 months</li>
//           <li>
//             Client designated Humalife as their long-term talent acquisition partner
//           </li>
//         </ul>
//       ),
//     },
//   ],
//   healthcare: [
//     {
//       label: "Challenge",
//       Icon: Anchor,
//       content:
//         "A leading Revenue Cycle Management (RCM) company in the US needed to scale operations in India by rapidly hiring skilled professionals for roles such as Medical Coders, Billing Executives, and AR Specialists. Their in-house HR team lacked the bandwidth to handle volume hiring with tight deadlines and compliance requirements. Attrition and poor candidate quality further slowed down operations.",
//     },
//     {
//       label: "Solution",
//       Icon: Search,
//       content:
//         "Humalife Healthcare stepped in with a dedicated recruitment support model tailored for the client’s needs. By leveraging our strong healthcare talent network, structured screening process, and quick turnaround time, we ensured a steady pipeline of qualified candidates. Our team focused on compliance, cultural fit, and retention strategies to reduce attrition and improve workforce stability, enabling the client to scale smoothly without compromising quality.",
//     },
//     {
//       label: "Results",
//       Icon: CheckCircle,
//       content: (
//         <ul className="list-disc list-inside text-left">
//           <li> Hired 120+ healthcare professionals in 3 months</li>
//           <li>Reduced hiring TAT (turnaround time) by 60%</li>
//           <li>Maintained 97% accuracy in profile shortlisting</li>
//           <li>90%+ employee retention in the first quarter</li>
//           <li>
//             Strengthened client operations and improved revenue cycle
//             performance
//           </li>
//         </ul>
//       ),
//     },
//   ],
// };

// // Type-specific carousel images
// const typeImages = {
//   recruitment: [
//     "https://images.unsplash.com/photo-1686771416282-3888ddaf249b?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Job interview
//     "https://images.unsplash.com/photo-1554224155-cfa08c2a758f?q=80&w=826&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Resume review
//     "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", // Team meeting
//     "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", // Office collaboration
//   ],
//   marketing: [
//     "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80", // Digital campaign
//     "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80", // Strategy meeting
//     "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", // Team collaboration
//     "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Creative brainstorming
//   ],
//   healthcare: [
//     "https://plus.unsplash.com/premium_photo-1681842906523-f27efd0d1718?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Hospital staff
//     "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Medical professional
//     "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Patient care
//     "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=800&q=80", // Medical team
//   ],
// };

// export default function SuccessStoriesSection() {
//   const [activeTab, setActiveTab] = useState("Recruitment");
//   const [allStories, setAllStories] = useState([]);
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const wrapperRef = useRef(null);
//   const contentRef = useRef(null);
//   const intervalRef = useRef(null);

//   // Auto-cycle through stories with GSAP animation
//   useEffect(() => {
//     if (allStories.length > 1) {
//       intervalRef.current = setInterval(() => {
//         setCurrentStoryIndex((prevIndex) => {
//           const nextIndex = (prevIndex + 1) % allStories.length;

//           // GSAP transition animation
//           if (contentRef.current) {
//             gsap.to(contentRef.current, {
//               opacity: 0,
//               y: 20,
//               duration: 0.3,
//               ease: "power2.out",
//               onComplete: () => {
//                 // After fade out, change content and fade in
//                 gsap.to(contentRef.current, {
//                   opacity: 1,
//                   y: 0,
//                   duration: 0.3,
//                   ease: "power2.out",
//                 });
//               },
//             });
//           }

//           return nextIndex;
//         });
//       }, 5000); // 5 seconds interval
//     }

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [allStories.length]);

//   // Cleanup interval on tab change
//   useEffect(() => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
//     setCurrentStoryIndex(0);
//   }, [activeTab]);

//   useEffect(() => {
//     const el = wrapperRef.current;
//     if (!el) return;

//     // Reset initial state for animation (in case of tab change)
//     gsap.set(el, { autoAlpha: 0, y: 50 });

//     const anim = gsap.to(el, {
//       autoAlpha: 1,
//       y: 0,
//       duration: 1.5,
//       ease: "power2.out",
//       scrollTrigger: {
//         trigger: el,
//         start: "top 80%",
//         toggleActions: "play none none none",
//       },
//     });

//     // Cleanup on unmount or before next animation
//     return () => {
//       anim.scrollTrigger?.kill();
//       anim.kill();
//     };
//   }, [activeTab]);

//   // Fetch success stories for the active tab
//   useEffect(() => {
//     const fetchSuccessStories = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const type = tabKeyMap[activeTab];
//         // console.log(`Fetching stories for type: ${type}`); // Debug log
//         const response = await getSuccessStoriesByType(type);
//         // console.log(`API response for ${type}:`, response); // Debug log

//         // Check if response is valid and contains stories
//         if (
//           !response.data ||
//           !Array.isArray(response.data.stories) ||
//           response.data.stories.length === 0
//         ) {
//           throw new Error(`No success stories found for type: ${type}`);
//         }

//         // Map all stories from API response
//         const mappedStories = response.data.stories.map((story) => ({
//           testimonial: {
//             quote: story.testimonial.review || "No quote available",
//             author: story.testimonial.author || "Unknown Author",
//           },
//           details: {
//             client: story.clientInfo.client || "Unknown Client",
//             industry: story.clientInfo.industry || "Unknown Industry",
//             region: story.clientInfo.region || "Unknown Region",
//           },
//           timeline: (story.timeline || fallbackTimelines[type]).map((item) => ({
//             label: item.label || "Unknown",
//             Icon: getTimelineIcon(item.label || ""),
//             content: Array.isArray(item.results) ? (
//               <ul className="list-disc list-inside text-left">
//                 {item.results.map((result, i) => (
//                   <li key={i}>{result.text || result}</li>
//                 ))}
//               </ul>
//             ) : typeof item.content === "string" &&
//               item.content.includes("\n") ? (
//               <ul className="list-disc list-inside text-left">
//                 {item.content.split("\n").map((line, i) => (
//                   <li key={i}>{line}</li>
//                 ))}
//               </ul>
//             ) : (
//               item.content || item.description || "No content available"
//             ),
//           })),
//           images: typeImages[type], // Type-specific images
//         }));

//         setAllStories(mappedStories);
//         setCurrentStoryIndex(0);
//       } catch (err) {
//         console.error("Error fetching stories:", err); // Debug log
//         setError(err.message || `Failed to load stories for ${activeTab}`);
//         setAllStories([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSuccessStories();
//   }, [activeTab]);

//   // Get current story data
//   const currentStory = allStories[currentStoryIndex];

//   // Render loading state
//   if (loading) {
//     return (
//       <section className="bg-[#0a0a0f] text-[#fef5f0] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
//         <div className="wrapper text-[#fef5f0] max-w-7xl mx-auto">
//           <div className="flex items-center justify-center mb-8 sm:mb-10">
//             <div className="w-3 h-3 rounded-full border-2 border-[#a64d79] bg-transparent mr-3" />
//             <h2 className="text-[#fef5f0] text-sm sm:text-base font-semibold uppercase">
//               Our Success Stories
//             </h2>
//           </div>
//           <div className="flex justify-center items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#a64d79]"></div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // Render error state
//   if (error) {
//     return (
//       <section className="bg-[#0a0a0f] text-[#fef5f0] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
//         <div className="wrapper text-[#fef5f0] max-w-7xl mx-auto">
//           <div className="flex items-center justify-center mb-8 sm:mb-10">
//             <div className="w-3 h-3 rounded-full border-2 border-[#a64d79] bg-transparent mr-3" />
//             <h2 className="text-[#fef5f0] text-sm sm:text-base font-semibold uppercase">
//               Our Success Stories
//             </h2>
//           </div>
//           <div className="flex justify-center items-center">
//             <p className="text-sm sm:text-base">Error: {error}</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // Render empty state
//   if (!currentStory) {
//     return (
//       <section className="bg-[#0a0a0f] text-[#fef5f0] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
//         <div
//           className="wrapper text-[#fef5f0] max-w-7xl mx-auto"
//           ref={wrapperRef}
//         >
//           <div className="flex items-center justify-center mb-8 sm:mb-10">
//             <div className="w-3 h-3 rounded-full border-2 border-[#a64d79] bg-transparent mr-3" />
//             <h2 className="text-[#fef5f0] text-sm sm:text-base font-semibold uppercase">
//               Our Success Stories
//             </h2>
//           </div>
//           <div className="flex justify-center items-center">
//             <p className="text-sm sm:text-base">
//               No success stories available for {activeTab}.
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="bg-[#0a0a0f] text-[#fef5f0] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
//       <div
//         className="wrapper text-[#fef5f0] max-w-7xl mx-auto"
//         ref={wrapperRef}
//       >
//         {/* Title */}
//         <div className="flex items-center justify-center mb-8 sm:mb-10">
//           <div className="w-3 h-3 rounded-full border-2 border-[#a64d79] bg-transparent mr-3" />
//           <h2 className="text-[#fef5f0] text-sm sm:text-base font-semibold uppercase">
//             Our Success Stories
//           </h2>
//         </div>

//         {/* Tabs */}
//         {/* Tabs */}
//         <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-1 mb-6 sm:mb-8 w-full sm:w-fit rounded-sm overflow-clip mx-auto">
//           {tabs.map((tab) => {
//             const { label, link } = tabDisplayMap[tab];
//             return (
//               <a
//                 key={tab}
//                 href={link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setActiveTab(tab); // update tab content
//                 }}
//                 className={`flex-1 sm:flex-none px-4 sm:px-8 lg:px-12 py-3 sm:py-4 font-extrabold text-xs sm:text-sm uppercase transition-all ${
//                   activeTab === tab
//                     ? "bg-[#a64d79] text-[#fef5f0]"
//                     : "bg-[#16171d] text-gray-300 hover:bg-[#22232a]"
//                 }`}
//               >
//                 {label}
//               </a>
//             );
//           })}
//         </div>

//         {/* Main Content */}
//         <div className="wrapper bg-[#15171e] p-4 sm:p-6 lg:p-8 rounded-sm">
//           {/* Carousel */}
//           <Swiper
//             modules={[Autoplay]}
//             spaceBetween={8}
//             slidesPerView={1}
//             loop={true}
//             autoplay={{ delay: 3000, disableOnInteraction: false }}
//             breakpoints={{
//               640: { slidesPerView: 2, spaceBetween: 12 },
//               768: { slidesPerView: 3, spaceBetween: 16 },
//               1024: { slidesPerView: 4, spaceBetween: 20 },
//             }}
//             className="my-6 sm:my-8 lg:my-10 px-4 sm:px-6 lg:px-10"
//           >
//             {currentStory.images.map((src, idx) => (
//               <SwiperSlide key={idx}>
//                 <img
//                   src={src}
//                   alt={`${activeTab} Image ${idx + 1}`}
//                   className="w-full h-40 sm:h-48 lg:h-52 object-cover rounded-sm"
//                   loading="lazy"
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {/* Testimonial + Client Info */}
//           <div className="mt-8 sm:mt-12 lg:mt-16">
//             {/* Story indicator dots (only show if multiple stories) */}
//             {allStories.length > 1 && (
//               <div className="flex justify-center items-center space-x-2 mb-6 sm:mb-8">
//                 {allStories.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentStoryIndex(index)}
//                     className={`w-2 h-2 rounded-full transition-all ${
//                       index === currentStoryIndex
//                         ? "bg-[#a64d79] w-6"
//                         : "bg-gray-500 hover:bg-gray-400"
//                     }`}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>

//           <div
//             className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
//             ref={contentRef}
//           >
//             {/* Testimonial */}
//             <div className="bg-[#a64d79] text-[#fef5f0] p-4 sm:p-6 lg:p-8 rounded-sm">
//               <div className="text-3xl sm:text-4xl lg:text-5xl flex justify-center text-center mb-3 sm:mb-4 leading-none">
//                 <RiDoubleQuotesL />
//               </div>
//               <p className="text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 text-center">
//                 {currentStory.testimonial.quote}
//               </p>
//               <p className="text-sm sm:text-base font-extrabold mt-4 sm:mt-6 text-center">
//                 {currentStory.testimonial.author}
//               </p>
//             </div>

//             {/* Client Details */}
//             <div className="text-[#fef5f0] flex flex-col justify-center gap-4 sm:gap-5 lg:gap-6">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <User size={24} sm={28} lg={32} />
//                 <div className="flex flex-col">
//                   <span className="font-extrabold text-sm sm:text-base">
//                     Client:
//                   </span>
//                   <span className="text-sm sm:text-base">
//                     {currentStory.details.client}
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <Building size={24} sm={28} lg={32} />
//                 <div className="flex flex-col">
//                   <span className="font-extrabold text-sm sm:text-base">
//                     Industry:
//                   </span>
//                   <span className="text-sm sm:text-base">
//                     {currentStory.details.industry}
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <MapPin size={24} sm={28} lg={32} />
//                 <div className="flex flex-col">
//                   <span className="font-extrabold text-sm sm:text-base">
//                     Region:
//                   </span>
//                   <span className="text-sm sm:text-base">
//                     {currentStory.details.region}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Timeline */}
//           <div className="mt-12 sm:mt-16 lg:mt-20">
//             <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6 lg:gap-10 relative">
//               <div className="absolute top-6 left-0 right-0 h-1 bg-[#d6d6d6] sm:block hidden"></div>
//               {currentStory.timeline.map((item, idx) => (
//                 <div key={idx} className="flex-1 text-center relative z-10">
//                   <div className="flex justify-center mb-3 sm:mb-4">
//                     <div className="bg-[#a64d79] border-4 border-[#d6d6d6] rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
//                       <item.Icon size={20} sm={24} className="text-[#fef5f0]" />
//                     </div>
//                   </div>
//                   <h4 className="text-[#fef5f0] font-extrabold text-sm sm:text-base mb-3 sm:mb-4">
//                     {item.label}
//                   </h4>
//                   <div className="bg-white/80 text-black min-h-[150px] sm:min-h-[180px] lg:min-h-[200px] flex justify-center px-4 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-sm border border-[#a64d79] text-xs sm:text-sm">
//                     {item.content}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }






import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import {
  X,
  ArrowRight,
  CheckCircle2,
  Target,
  Lightbulb,
  Building2,
  MapPin,
  Briefcase,
} from "lucide-react";
import { RiDoubleQuotesL } from "react-icons/ri";

// Swiper CSS imports
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import tcsImg from "../../assets/tcs.png";
import techMImg from "../../assets/tech-mahindra.png";
import hexaImg from "../../assets/hexaware.png";
import foundImg from "../../assets/foundever.png";
import concentrixImg from "../../assets/concentrix.png";
import teleperformanceImg from "../../assets/teleperformance.png";
import r1rcmImg from "../../assets/r1rcm.png";
import exlImg from "../../assets/exl.png";
import igtImg from "../../assets/igt.png";

const SUCCESS_STORIES = [
  {
    id: 1,
    client: "TCS",
    image: tcsImg,
    title: "Large-Scale Cloud & Digital Hiring Across India and Europe",
    challengePara:
      "TCS was onboarding multiple enterprise clients simultaneously, requiring rapid deployment of cloud-native and agile development teams across India and Europe. Internal TA teams faced bandwidth issues due to volume and niche skill requirements.",
    industry: "IT Services & Consulting",
    region: "India, Poland, Germany",
    roles:
      "Cloud Engineers, Full-Stack Developers, DevOps Engineers, Scrum Masters",
    approach: [
      "Created role-specific sourcing strategies aligned with AWS, Azure, and GCP skill sets",
      "Activated local European recruitment partners to meet compliance and language requirements",
      "Implemented a multi-round screening framework (Technical + Domain + Cultural)",
      "Provided weekly hiring dashboards and SLA tracking",
    ],
    outcomes: [
      "Successfully closed 140+ IT roles in under 4 months",
      "Reduced time-to-hire by 38%",
      "Achieved a 97% joining rate, even for Europe-based roles",
      "Enabled project delivery timelines without resource shortages",
    ],
    testimonial:
      "HumanHire's expertise in niche cloud hiring enabled us to meet all project delivery timelines without resource shortages.",
  },
  {
    id: 2,
    client: "Tech Mahindra",
    image: techMImg,
    title: "Telecom & 5G Talent Deployment in India and Malaysia",
    challengePara:
      "With accelerated 5G rollouts, Tech Mahindra needed telecom professionals with hands-on experience in network modernization. Talent scarcity and cross-border hiring complexities added pressure.",
    industry: "Telecom & Digital Infrastructure",
    region: "India, Malaysia",
    roles: "Network Engineers, OSS/BSS Consultants, Project Managers",
    approach: [
      "Built a specialized telecom hiring team with domain recruiters",
      "Mapped talent from competitor ecosystems and niche telecom projects",
      "Conducted technical validation in partnership with telecom SMEs",
      "Managed visa-aligned hiring and region-specific onboarding support",
    ],
    outcomes: [
      "85+ telecom specialists deployed within 60 days",
      "Supported multi-country hiring with zero compliance issues",
      "Improved hiring velocity by 45% compared to previous cycles",
    ],
    testimonial:
      "Their domain knowledge in Telecom and network modernization made a significant difference in our speed-to-market.",
  },
  {
    id: 3,
    client: "Hexaware",
    image: hexaImg,
    title: "Agile Tech Hiring for BFSI Digital Programs",
    challengePara:
      "Hexaware was executing multiple BFSI digital transformation programs with strict delivery timelines. They needed fast, agile hiring while maintaining strong technical quality.",
    industry: "IT & Digital Transformation",
    region: "India",
    roles: "Java Developers, Automation Test Engineers, QA Leads",
    approach: [
      "Implemented sprint-based recruitment cycles aligned with project sprints",
      "Created a pre-vetted candidate bench for recurring roles",
      "Reduced interview stages through structured technical assessments",
      "Enabled rapid offer rollouts and joining follow-ups",
    ],
    outcomes: [
      "65+ roles filled in 45 days",
      "Offer-to-join ratio improved to 93%",
      "Reduced project staffing delays to near zero",
    ],
    testimonial:
      "The sprint-based recruitment model perfectly aligned with our project delivery cycles.",
  },
  {
    id: 4,
    client: "Foundever",
    image: foundImg,
    title: "Multilingual CX Hiring Across Europe",
    challengePara:
      "Foundever needed native and bilingual speakers for European CX programs, with strong customer-handling skills and cultural alignment across Spain, Portugal, and Germany.",
    industry: "Customer Experience & BPO",
    region: "Spain, Portugal, Germany",
    roles: "Multilingual Customer Support Executives, Team Leads",
    approach: [
      "Sourced language-specific talent using local job boards and referral networks",
      "Conducted language proficiency and customer simulation assessments",
      "Coordinated remote hiring and onboarding across multiple countries",
    ],
    outcomes: [
      "160+ multilingual hires completed",
      "Improved CSAT scores for client programs",
      "Reduced hiring turnaround time by 30%",
    ],
    testimonial:
      "Foundever achieved unprecedented hiring speeds for native speakers in complex European markets thanks to HumanHire.",
  },
  {
    id: 5,
    client: "Concentrix",
    image: concentrixImg,
    title: "High-Volume BPO Hiring Across India",
    challengePara:
      "Concentrix required rapid, large-scale hiring for new international client programs, with aggressive go-live deadlines for Voice and Non-Voice processes.",
    industry: "BPO & CX",
    region: "India",
    roles: "Voice & Non-Voice Process Executives, QA Analysts",
    approach: [
      "Conducted mass hiring drives (virtual + in-person)",
      "Built centralized screening and documentation workflows",
      "Provided daily hiring MIS and ramp-up tracking",
    ],
    outcomes: [
      "320+ hires in 90 days",
      "Maintained 90%+ joining rate",
      "Enabled uninterrupted client onboarding",
    ],
    testimonial:
      "Their ability to handle massive volume without compromising candidate quality is truly exceptional.",
  },
  {
    id: 6,
    client: "Teleperformance",
    image: teleperformanceImg,
    title: "APAC Workforce Expansion",
    challengePara:
      "Teleperformance required consistent CX talent across APAC markets with rapid ramp-up and strong retention to support their global operations.",
    industry: "Global BPO & CX",
    region: "India, Malaysia",
    roles: "Customer Support Associates, Operations Supervisors",
    approach: [
      "Designed region-specific sourcing strategies",
      "Conducted bulk hiring drives with standardized assessments",
      "Provided post-joining follow-ups to reduce early attrition",
    ],
    outcomes: [
      "210+ hires across APAC",
      "Reduced attrition in first 90 days",
      "Faster operational readiness across centers",
    ],
    testimonial:
      "We saw a marked improvement in our operational readiness thanks to their efficient APAC hiring model.",
  },
  {
    id: 7,
    client: "R1 RCM",
    image: r1rcmImg,
    title: "Healthcare Revenue Cycle Hiring",
    challengePara:
      "R1 RCM needed certified healthcare professionals with strict compliance and US healthcare domain expertise for Medical Coding and Billing.",
    industry: "Healthcare RCM",
    region: "India",
    roles: "Medical Coders, AR Analysts, Billing Specialists",
    approach: [
      "Sourced certified professionals with US healthcare exposure",
      "Conducted domain assessments aligned to RCM workflows",
      "Ensured HIPAA-compliant recruitment processes",
    ],
    outcomes: [
      "75+ certified hires completed",
      "Reduced training time by 25%",
      "Improved productivity across revenue cycle teams",
    ],
    testimonial:
      "HumanHire delivered HIPAA-compliant, certified talent that significantly boosted our RCM productivity.",
  },
  {
    id: 8,
    client: "EXL",
    image: exlImg,
    title: "Analytics & Data Talent Hiring",
    challengePara:
      "EXL faced intense competition for analytics talent with niche skills in BFSI and insurance domains, requiring a specialized sourcing approach.",
    industry: "Analytics & BPM",
    region: "India",
    roles: "Data Analysts, Data Scientists, Business Analysts",
    approach: [
      "Built analytics-specific talent pipelines",
      "Partnered with domain SMEs for skill validation",
      "Accelerated interview and offer cycles",
    ],
    outcomes: [
      "55+ analytics professionals hired",
      "Reduced hiring cycle time by 40%",
      "Enabled faster project onboarding",
    ],
    testimonial:
      "In a highly competitive market, they helped us secure top-tier analytics talent efficiently.",
  },
  {
    id: 9,
    client: "IGT Solutions",
    image: igtImg,
    title: "Travel & Hospitality Hiring During Peak Season",
    challengePara:
      "Seasonal demand spikes required rapid hiring of Travel Consultants and Reservation Executives without compromising service quality during peak timelines.",
    industry: "Travel & Hospitality BPO",
    region: "India",
    roles: "Travel Consultants, Reservation Executives, QA Leads",
    approach: [
      "Deployed seasonal hiring models",
      "Conducted large-scale virtual hiring drives",
      "Coordinated onboarding and training schedules",
    ],
    outcomes: [
      "180+ hires within peak season timelines",
      "Maintained SLA adherence",
      "Supported uninterrupted customer service delivery",
    ],
    testimonial:
      "We managed our seasonal surge seamlessly thanks to their rapid-response hiring strategy.",
  },
];

export default function SuccessStoriesSection() {
  const [selectedStory, setSelectedStory] = useState(null);

  const openDetails = (story) => {
    setSelectedStory(story);
    document.body.style.overflow = "hidden";
  };

  const closeDetails = () => {
    setSelectedStory(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="bg-[#0a0a0f] text-white py-20 px-4 overflow-hidden">
      {/* Linear Scroller CSS Fix */}
      <style>
        {`
          .success-swiper .swiper-wrapper {
            transition-timing-function: linear !important;
          }
        `}
      </style>

      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full border border-[#a64d79]" />
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-300">
              Success Stories
            </h2>
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-center">
            Our Proven Impact{" "}
            <span className="text-[#a64d79]">Across Industries</span>
          </h3>
        </div>

        {/* Cyclic Carousel (Marquee Style) */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          loop={true}
          speed={8000}
          allowTouchMove={false}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          className="success-swiper pb-10 overflow-visible"
        >
          {SUCCESS_STORIES.map((story) => (
            <SwiperSlide key={story.id} className="py-10">
              <div
                onClick={() => openDetails(story)}
                className="group cursor-pointer bg-[#111218] rounded-[2rem] overflow-hidden border border-white/5 hover:border-[#a64d79]/40 transition-all duration-500 min-h-[600px] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.8)] 
scale-[1.05] sm:scale-100"
              >
                {/* Image Section */}
                <div className="relative h-64 bg-gray-900 overflow-hidden shrink-0">
                  <div className="relative h-64 bg-[#0f1016] flex items-center justify-center overflow-hidden shrink-0 p-6">
                    <img
                      src={story.image}
                      alt={story.client}
                      className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-6 left-6 z-20">
                    <span className="bg-[#a64d79] text-white text-[11px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-xl">
                      Success Story
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h4 className="text-[20px] sm:text-[22px] font-bold mb-4 leading-snug text-left group-hover:text-[#a64d79] transition-colors">
                    {story.title}
                  </h4>
                  <p className="text-gray-400 text-[14px] sm:text-[15px] leading-relaxed line-clamp-4 mb-6 sm:mb-8">
                    {story.challengePara}
                  </p>

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-widest text-gray-500">
                        Client:
                      </span>
                      <span className="text-sm font-bold uppercase text-[#a64d79]">
                        {story.client}
                      </span>
                    </div>
                    <div className="bg-[#a64d79] p-3 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal Details Page UI */}
      {selectedStory && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0d0e14] rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">

            {/* Modal Header */}
            <div className="relative h-64 md:h-80 w-full shrink-0">
              <img
                src={selectedStory.image}
                className="w-full h-full object-cover opacity-60"
                alt="header"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0e14]/50 to-[#0d0e14]" />
              <button
                onClick={closeDetails}
                className="absolute top-6 right-6 text-white hover:text-[#a64d79] bg-black/40 p-3 rounded-full z-50 transition-all border border-white/10"
              >
                <X size={24} />
              </button>

              <div className="absolute bottom-10 left-8 md:left-12 right-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-0.5 w-16 bg-[#a64d79]" />
                  <span className="text-[#a64d79] font-black tracking-[0.4em] uppercase text-[10px]">
                    HumanHire Case Study
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1]">
                  {selectedStory.title}
                </h2>
              </div>
            </div>

            {/* Grid Content */}
            <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-10">
                {/* 1. Client Overview */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="text-[#a64d79]" size={22} />
                    <h5 className="text-xl font-black uppercase tracking-widest text-white">
                      Client Overview
                    </h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                    <div className="flex gap-3">
                      <Briefcase size={16} className="text-[#a64d79] shrink-0 mt-1" />
                      <p className="text-sm">
                        <span className="text-gray-500 font-bold">Industry:</span>{" "}
                        {selectedStory.industry}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <MapPin size={16} className="text-[#a64d79] shrink-0 mt-1" />
                      <p className="text-sm">
                        <span className="text-gray-500 font-bold">Regions:</span>{" "}
                        {selectedStory.region}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. The Challenge */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Target className="text-[#a64d79]" size={22} />
                    <h5 className="text-xl font-black uppercase tracking-widest text-white">
                      The Challenge
                    </h5>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <p className="text-gray-400 text-sm leading-relaxed italic border-l-2 border-[#a64d79] pl-4">
                      {selectedStory.challengePara}
                    </p>
                  </div>
                </div>

                {/* 3. Our Approach */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="text-[#a64d79]" size={22} />
                    <h5 className="text-xl font-black uppercase tracking-widest text-white">
                      Our Approach
                    </h5>
                  </div>
                  <div className="space-y-3">
                    {selectedStory.approach.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-all">
                        <div className="mt-1">
                          <CheckCircle2 size={16} className="text-[#a64d79]" />
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-[#a64d79] p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                  <h5 className="text-white font-black text-2xl mb-8 uppercase tracking-widest border-b border-white/20 pb-4">
                    The Outcomes
                  </h5>
                  <div className="space-y-6">
                    {selectedStory.outcomes.map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="shrink-0 bg-white/20 p-1.5 rounded-lg h-fit">
                          <CheckCircle2 size={14} className="text-white" />
                        </div>
                        <p className="text-sm font-bold leading-tight text-white">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 relative">
                  <RiDoubleQuotesL className="text-[#a64d79]/20 absolute top-4 left-4" size={60} />
                  <p className="text-gray-300 italic text-sm leading-relaxed relative z-10">
                    "{selectedStory.testimonial}"
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-xs font-black text-[#a64d79] uppercase tracking-widest">
                      Leadership Team
                    </p>
                    <p className="text-xs font-bold text-gray-500 uppercase">
                      {selectedStory.client}
                    </p>
                  </div>
                </div>

                <button className="w-full bg-white text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-[#a64d79] hover:text-white transition-all shadow-xl">
                  Connect with Talent Experts
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}