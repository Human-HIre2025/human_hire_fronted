// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import {
//   CheckCircle2,
//   Settings,
//   Calendar,
//   User,
//   ChevronRight,
//   Phone,
//   Mail,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import contactimg from "../../assets/about/hero.jpg";
// import { motion, AnimatePresence } from "framer-motion";
// import Popup from "../../components/UI/Popup";
// import appointmentService from "../../services/appointmentService";
// import { useSiteSettings } from "../../context/SiteSettingsContext";

// const BusinessBookingSection = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [step, setStep] = useState(1);
//   const [service, setService] = useState("Permanent Staffing");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [timeSlot, setTimeSlot] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [popupType, setPopupType] = useState("success");
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//   });
//   const { settings, error } = useSiteSettings();
//   const generalData =
//     settings?.data?.find((item) => item.category === "General Information")
//       ?.data || {};

//   const { phoneNumber, contactEmail } = generalData;

//   useEffect(() => {
//     if (step === 4) {
//       setShowPopup(true);
//       setTimeout(() => setShowPopup(false), 3000);
//     }
//   }, [step]);

//   const handleNext = () => {
//     if (step < 3) setStep((prev) => prev + 1);
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       const formattedDate = selectedDate
//         ? selectedDate.toISOString().split("T")[0]
//         : "";
//       const fullName = `${formData.firstName} ${formData.lastName}`.trim();
//       const appointmentData = {
//         service,
//         date: formattedDate,
//         timeSlot,
//         name: fullName,
//         email: formData.email,
//         phone: formData.phone,
//       };
//       const response = await appointmentService.createAppointment(
//         appointmentData
//       );
//       setLoading(false);
//       setPopupMessage(response.message || "Appointment created successfully!");
//       setPopupType("success");
//       setStep(4);
//     } catch (error) {
//       setPopupMessage(error.message || "Failed to create appointment");
//       setPopupType("error");
//       setShowPopup(true);
//       setTimeout(() => setShowPopup(false), 3000);
//       setLoading(false);
//     }
//   };

//   const renderSlots = () => {
//     if (!selectedDate) return null;
//     const slots = [
//       "9:00 AM - 10:00 AM",
//       "9:30 AM - 10:30 AM",
//       "10:00 AM - 11:00 AM",
//       "10:30 AM - 11:30 AM",
//       "11:00 AM - 12:00 PM",
//       "11:30 AM - 12:30 PM",
//     ];
//     return (
//       <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mt-4">
//         {slots.map((slot) => (
//           <button
//             key={slot}
//             onClick={() => setTimeSlot(slot)}
//             className={`px-3 py-2 rounded border text-xs sm:text-sm transition-all ${
//               timeSlot === slot
//                 ? "bg-[#ff87be] border-[#ff87be] text-white"
//                 : "bg-transparent border-white/30 text-white hover:border-[#ff87be]"
//             }`}
//           >
//             {slot}
//           </button>
//         ))}
//       </div>
//     );
//   };

//   const stepCompleted = {
//     1: !!service,
//     2: !!selectedDate && !!timeSlot,
//     3:
//       !!formData.firstName &&
//       !!formData.lastName &&
//       !!formData.email &&
//       !!formData.phone,
//   };

//   const fadeUp = {
//     initial: { opacity: 0, y: 10 },
//     animate: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -10 },
//   };

//   return (
//     <div className="bg-black text-[#fef5f0] py-8 lg:py-16 px-4 md:px-10 min-h-screen relative overflow-x-hidden">
//       {showPopup && (
//         <Popup
//           message={popupMessage}
//           type={popupType}
//           onClose={() => setShowPopup(false)}
//         />
//       )}

//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10">
//         {/* Left Section */}
//         <div className="lg:w-1/2 flex flex-col justify-between bg-[#15171e] p-6 lg:p-8 rounded-2xl">
//           <div>
//             <h1 className="text-2xl md:text-4xl font-extrabold leading-tight mb-6 text-center lg:text-left">
//               <span className="text-[#a64d79]">Connecting You to Talent</span>{" "}
//               <span className="text-[#fef5f0]">That Drives Results.</span>
//             </h1>
//             <p className="text-gray-300 text-sm md:text-lg leading-relaxed text-center lg:text-left mb-8">
//               We align exceptional talent with your strategic goals, ensuring
//               every hire makes a measurable impact.
//             </p>

//             <div className="flex bg-black overflow-hidden border border-gray-800 rounded-lg mb-8 group">
//               <div className="w-1/3 h-24 sm:h-32">
//                 <img src={contactimg} alt="Team" className="w-full h-full object-cover opacity-80" />
//               </div>
//               <div className="flex-1 p-4 flex flex-col justify-center bg-zinc-900 group-hover:bg-[#a64d79] transition-colors duration-300">
//                 <div className="text-lg sm:text-2xl font-black text-white">{phoneNumber || "+44 7400 075848"}</div>
//                 <div className="text-[10px] sm:text-sm font-bold text-gray-400 uppercase tracking-widest group-hover:text-white">
//                   {contactEmail || "HR@HUMANHIRECORP.COM"}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <Link to="/book-an-appointment" className="w-full">
//             <button className="w-full py-4 font-black text-white bg-[#b44a84] hover:bg-[#a64d79] transition duration-300 rounded-lg text-sm tracking-widest">
//               BOOK AN APPOINTMENT
//             </button>
//           </Link>
//         </div>

//         {/* Right Section (Booking Area) */}
//         <div className="lg:w-1/2 flex flex-col bg-[#15171e] p-4 sm:p-6 lg:p-8 rounded-2xl relative min-h-[500px]">
//           <div className="flex flex-row h-full gap-4 lg:gap-6 items-stretch">
//             {/* Responsive Sidebar */}
//             <div
//               className={`bg-[#a64d79] rounded-2xl transition-all duration-300 flex flex-col justify-between p-3 flex-shrink-0 ${
//                 isCollapsed ? "w-14" : "w-44 sm:w-52 lg:w-60"
//               }`}
//             >
//               <div className="space-y-3">
//                 {[1, 2, 3].map((s) => {
//                   const icons = [<Settings size={20} />, <Calendar size={20} />, <User size={20} />];
//                   const labels = ["Service Selection", "Date & Time", "Your Information"];
//                   return (
//                     <div
//                       key={s}
//                       onClick={() => setStep(s)}
//                       className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all ${
//                         step === s ? "bg-[#b44a84] shadow-lg" : "hover:bg-[#b44a84]/50"
//                       }`}
//                     >
//                       <div className="flex-shrink-0">{icons[s - 1]}</div>
//                       {!isCollapsed && (
//                         <span className="text-xs sm:text-sm font-bold truncate transition-opacity duration-300">
//                           {labels[s - 1]}
//                         </span>
//                       )}
//                       {stepCompleted[s] && !isCollapsed && (
//                         <CheckCircle2 size={14} className="ml-auto text-green-300" />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="mt-auto pt-6 border-t border-white/20">
//                 {!isCollapsed ? (
//                   <div className="text-[10px] sm:text-xs space-y-2 mb-4">
//                     <p className="font-black uppercase opacity-60">Get in Touch</p>
//                     <p className="truncate">{phoneNumber || "+44 7400"}</p>
//                     <p className="truncate lowercase">{contactEmail || "hr@human"}</p>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center gap-4 mb-4">
//                     <Phone size={16} className="opacity-70" />
//                     <Mail size={16} className="opacity-70" />
//                   </div>
//                 )}
//                 <button
//                   onClick={() => setIsCollapsed(!isCollapsed)}
//                   className="flex items-center justify-center w-full p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
//                 >
//                    <span className={`text-[10px] font-bold mr-2 ${isCollapsed ? 'hidden' : 'block'}`}>Collapse</span>
//                    <ChevronRight size={16} className={`transition-transform duration-300 ${isCollapsed ? "" : "rotate-180"}`} />
//                 </button>
//               </div>
//             </div>

//             {/* Step Content Area */}
//             <div className="flex-1 min-w-0 overflow-y-auto pr-1">
//               <AnimatePresence mode="wait">
//                 {step === 1 && (
//                   <motion.div key="s1" {...fadeUp} className="space-y-4">
//                     <h2 className="text-lg font-black">Service Selection</h2>
//                     <div className="space-y-2">
//                         <label className="text-xs font-bold opacity-70">* SERVICE:</label>
//                         <select
//                         value={service}
//                         onChange={(e) => setService(e.target.value)}
//                         className="w-full bg-[#1c1c1e] text-white border border-white/20 px-4 py-3 rounded-xl text-sm focus:border-[#b44a84] outline-none"
//                         >
//                             <option>Permanent Staffing</option>
//                             <option>Contract Staffing</option>
//                             <option>Payroll Management</option>
//                             <option>L&D Services</option>
//                             <option>Executive Search</option>
//                         </select>
//                     </div>
//                   </motion.div>
//                 )}

//                 {step === 2 && (
//                   <motion.div key="s2" {...fadeUp} className="space-y-4">
//                     <h2 className="text-lg font-black">Date & Time</h2>
//                     <div className="datepicker-container overflow-hidden rounded-xl border border-white/10">
//                       <DatePicker
//                         selected={selectedDate}
//                         onChange={(date) => { setSelectedDate(date); setTimeSlot(""); }}
//                         minDate={new Date()}
//                         inline
//                       />
//                     </div>
//                     {selectedDate && renderSlots()}
//                   </motion.div>
//                 )}

//                 {step === 3 && (
//                   <motion.div key="s3" {...fadeUp} className="space-y-3">
//                     <h2 className="text-lg font-black">Your Information</h2>
//                     {["firstName", "lastName", "email", "phone"].map((field) => (
//                       <input
//                         key={field}
//                         type={field === "email" ? "email" : "text"}
//                         placeholder={field.replace(/([A-Z])/g, " $1").toUpperCase()}
//                         className="w-full bg-[#1c1c1e] border border-white/20 px-4 py-3 rounded-xl text-sm focus:border-[#b44a84] outline-none"
//                         value={formData[field]}
//                         onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
//                       />
//                     ))}
//                   </motion.div>
//                 )}

//                 {step === 4 && (
//                   <motion.div key="s4" {...fadeUp} className="bg-zinc-900/50 p-6 rounded-2xl border border-[#b44a84]/30 text-center">
//                     <CheckCircle2 size={48} className="mx-auto text-[#b44a84] mb-4" />
//                     <h2 className="text-xl font-black mb-4">Confirmed!</h2>
//                     <div className="text-left text-xs space-y-2 bg-black/30 p-4 rounded-xl mb-6">
//                         <p><span className="opacity-50">Service:</span> {service}</p>
//                         <p><span className="opacity-50">Time:</span> {timeSlot}</p>
//                         <p><span className="opacity-50">Email:</span> {formData.email}</p>
//                     </div>
//                     <button
//                       onClick={() => setStep(1)}
//                       className="w-full py-3 bg-[#b44a84] rounded-xl font-bold text-sm"
//                     >
//                       Book Another
//                     </button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Action Button */}
//           {step !== 4 && (
//             <div className="mt-8 flex justify-end">
//               <button
//                 disabled={!stepCompleted[step]}
//                 onClick={step === 3 ? handleSubmit : handleNext}
//                 className="w-full sm:w-auto px-10 py-3 bg-[#b44a84] hover:bg-[#a64d79] disabled:opacity-30 rounded-xl font-black transition-all text-sm tracking-widest shadow-lg"
//               >
//                 {loading ? "PROCESSING..." : step === 3 ? "SUBMIT" : "CONTINUE"}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <style jsx global>{`
//         .react-datepicker {
//           background-color: #1c1c1e !important;
//           border: none !important;
//           font-family: inherit !important;
//           width: 100% !important;
//           display: flex !important;
//           justify-content: center !important;
//         }
//         .react-datepicker__header {
//           background-color: #1c1c1e !important;
//           border-bottom: 1px solid rgba(255,255,255,0.1) !important;
//         }
//         .react-datepicker__day, .react-datepicker__day-name, .react-datepicker__current-month {
//           color: white !important;
//         }
//         .react-datepicker__day:hover {
//           background-color: #b44a84 !important;
//           border-radius: 8px;
//         }
//         .react-datepicker__day--selected {
//           background-color: #b44a84 !important;
//           border-radius: 8px;
//         }
//         .react-datepicker__day--disabled {
//             color: rgba(255,255,255,0.2) !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BusinessBookingSection;













import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CheckCircle2,
  Settings,
  Calendar,
  User,
  ChevronRight,
  Phone,
  Mail,
  Globe,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import contactimg from "../../assets/about/hero.jpg";
import { motion, AnimatePresence } from "framer-motion";
import Popup from "../../components/UI/Popup";
import appointmentService from "../../services/appointmentService";
import { useSiteSettings } from "../../context/SiteSettingsContext";

// List of major time zones
const TIME_ZONES = [
  "Pacific/Midway",
  "America/Honolulu",
  "America/Anchorage",
  "America/Los_Angeles", // US West
  "America/Denver",
  "America/Chicago", // US Central
  "America/New_York", // US East
  "America/Sao_Paulo",
  "Europe/London", // UK
  "Europe/Paris",
  "Europe/Berlin",
  "Africa/Cairo",
  "Asia/Dubai",
  "Asia/Karachi",
  "Asia/Kolkata", // India
  "Asia/Bangkok",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

const BusinessBookingSection = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [step, setStep] = useState(1);
  const [service, setService] = useState("Permanent Staffing");
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  // Default to user's local time zone
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const { settings, error } = useSiteSettings();
  const generalData =
    settings?.data?.find((item) => item.category === "General Information")
      ?.data || {};

  const { phoneNumber, contactEmail } = generalData;

  useEffect(() => {
    if (step === 4) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  }, [step]);

  const handleNext = () => {
    if (step < 3) setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formattedDate = selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : "";
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      
      const appointmentData = {
        service,
        date: formattedDate,
        timeSlot,
        timeZone, // Added Time Zone to payload
        name: fullName,
        email: formData.email,
        phone: formData.phone,
      };

      const response = await appointmentService.createAppointment(
        appointmentData
      );
      setLoading(false);
      setPopupMessage(response.message || "Appointment created successfully!");
      setPopupType("success");
      setStep(4);
    } catch (error) {
      setPopupMessage(error.message || "Failed to create appointment");
      setPopupType("error");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      setLoading(false);
    }
  };

  const renderSlots = () => {
    if (!selectedDate) return null;
    const slots = [
      "9:00 AM - 10:00 AM",
      "9:30 AM - 10:30 AM",
      "10:00 AM - 11:00 AM",
      "10:30 AM - 11:30 AM",
      "11:00 AM - 12:00 PM",
      "11:30 AM - 12:30 PM",
    ];
    return (
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mt-4">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => setTimeSlot(slot)}
            className={`px-3 py-2 rounded border text-xs sm:text-sm transition-all ${
              timeSlot === slot
                ? "bg-[#ff87be] border-[#ff87be] text-white"
                : "bg-transparent border-white/30 text-white hover:border-[#ff87be]"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    );
  };

  const stepCompleted = {
    1: !!service,
    2: !!selectedDate && !!timeSlot && !!timeZone,
    3:
      !!formData.firstName &&
      !!formData.lastName &&
      !!formData.email &&
      !!formData.phone,
  };

  const fadeUp = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="bg-black text-[#fef5f0] py-8 lg:py-16 px-4 md:px-10 min-h-screen relative overflow-x-hidden">
      {showPopup && (
        <Popup
          message={popupMessage}
          type={popupType}
          onClose={() => setShowPopup(false)}
        />
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Left Section */}
        <div className="lg:w-1/2 flex flex-col justify-between bg-[#15171e] p-6 lg:p-8 rounded-2xl">
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight mb-6 text-center lg:text-left">
              <span className="text-[#a64d79]">Connecting You to Talent</span>{" "}
              <span className="text-[#fef5f0]">That Drives Results.</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-lg leading-relaxed text-center lg:text-left mb-8">
              We align exceptional talent with your strategic goals, ensuring
              every hire makes a measurable impact.
            </p>

            <div className="flex bg-black overflow-hidden border border-gray-800 rounded-lg mb-8 group">
              <div className="w-1/3 h-24 sm:h-32">
                <img src={contactimg} alt="Team" className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-center bg-zinc-900 group-hover:bg-[#a64d79] transition-colors duration-300">
                <div className="text-lg sm:text-2xl font-black text-white">{"+44 7400 075848"}</div>
                <div className="text-[10px] sm:text-sm font-bold text-gray-400 uppercase tracking-widest group-hover:text-white">
                  {"hr@humanhirecorp.com"}
                </div>
              </div>
            </div>
          </div>

          <Link to="/book-an-appointment" className="w-full">
            <button className="w-full py-4 font-black text-white bg-[#b44a84] hover:bg-[#a64d79] transition duration-300 rounded-lg text-sm tracking-widest">
              BOOK AN APPOINTMENT
            </button>
          </Link>
        </div>

        {/* Right Section (Booking Area) */}
        <div className="lg:w-1/2 flex flex-col bg-[#15171e] p-4 sm:p-6 lg:p-8 rounded-2xl relative min-h-[500px]">
          <div className="flex flex-row h-full gap-4 lg:gap-6 items-stretch">
            {/* Responsive Sidebar */}
            <div
              className={`bg-[#a64d79] rounded-2xl transition-all duration-300 flex flex-col justify-between p-3 flex-shrink-0 ${
                isCollapsed ? "w-14" : "w-44 sm:w-52 lg:w-60"
              }`}
            >
              <div className="space-y-3">
                {[1, 2, 3].map((s) => {
                  const icons = [<Settings size={20} />, <Calendar size={20} />, <User size={20} />];
                  const labels = ["Service Selection", "Date & Time", "Your Information"];
                  return (
                    <div
                      key={s}
                      onClick={() => setStep(s)}
                      className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all ${
                        step === s ? "bg-[#b44a84] shadow-lg" : "hover:bg-[#b44a84]/50"
                      }`}
                    >
                      <div className="flex-shrink-0">{icons[s - 1]}</div>
                      {!isCollapsed && (
                        <span className="text-xs sm:text-sm font-bold truncate transition-opacity duration-300">
                          {labels[s - 1]}
                        </span>
                      )}
                      {stepCompleted[s] && !isCollapsed && (
                        <CheckCircle2 size={14} className="ml-auto text-green-300" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto pt-6 border-t border-white/20">
                {!isCollapsed ? (
                  <div className="text-[10px] sm:text-xs space-y-2 mb-4">
                    <p className="font-black uppercase opacity-60">Get in Touch</p>
                    <p className="truncate">{"+1 302 440 6916"}</p>
                    <p className="truncate lowercase">{"hr@humanhirecorp.com"}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 mb-4">
                    <Phone size={16} className="opacity-70" />
                    <Mail size={16} className="opacity-70" />
                  </div>
                )}
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="flex items-center justify-center w-full p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                >
                   <span className={`text-[10px] font-bold mr-2 ${isCollapsed ? 'hidden' : 'block'}`}>Collapse</span>
                   <ChevronRight size={16} className={`transition-transform duration-300 ${isCollapsed ? "" : "rotate-180"}`} />
                </button>
              </div>
            </div>

            {/* Step Content Area */}
            <div className="flex-1 min-w-0 overflow-y-auto pr-1">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="s1" {...fadeUp} className="space-y-4">
                    <h2 className="text-lg font-black">Service Selection</h2>
                    <div className="space-y-2">
                        <label className="text-xs font-bold opacity-70">* SERVICE:</label>
                        <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-[#1c1c1e] text-white border border-white/20 px-4 py-3 rounded-xl text-sm focus:border-[#b44a84] outline-none"
                        >
                            <option>Permanent Staffing</option>
                            <option>Contract Staffing</option>
                            <option>Payroll Management</option>
                            <option>L&D Services</option>
                            <option>Executive Search</option>
                        </select>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" {...fadeUp} className="space-y-4">
                    <h2 className="text-lg font-black flex justify-between items-center">
                      Date & Time
                      <Clock size={16} className="opacity-50" />
                    </h2>
                    
                    {/* Time Zone Selector Added Here */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold opacity-70 flex items-center gap-1">
                        <Globe size={10} /> TIME ZONE
                      </label>
                      <div className="relative">
                        <select
                          value={timeZone}
                          onChange={(e) => setTimeZone(e.target.value)}
                          className="w-full bg-[#1c1c1e] text-white border border-white/20 px-3 py-2 rounded-xl text-xs sm:text-sm focus:border-[#b44a84] outline-none appearance-none"
                        >
                          {TIME_ZONES.map((tz) => (
                            <option key={tz} value={tz}>
                              {tz.replace(/_/g, " ")}
                            </option>
                          ))}
                          {!TIME_ZONES.includes(timeZone) && <option value={timeZone}>{timeZone}</option>}
                        </select>
                        <ChevronRight size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 pointer-events-none opacity-50"/>
                      </div>
                    </div>

                    <div className="datepicker-container overflow-hidden rounded-xl border border-white/10">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => { setSelectedDate(date); setTimeSlot(""); }}
                        minDate={new Date()}
                        inline
                      />
                    </div>
                    {selectedDate && renderSlots()}
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="s3" {...fadeUp} className="space-y-3">
                    <h2 className="text-lg font-black">Your Information</h2>
                    {["firstName", "lastName", "email", "phone"].map((field) => (
                      <input
                        key={field}
                        type={field === "email" ? "email" : "text"}
                        placeholder={field.replace(/([A-Z])/g, " $1").toUpperCase()}
                        className="w-full bg-[#1c1c1e] border border-white/20 px-4 py-3 rounded-xl text-sm focus:border-[#b44a84] outline-none"
                        value={formData[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      />
                    ))}
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="s4" {...fadeUp} className="bg-zinc-900/50 p-6 rounded-2xl border border-[#b44a84]/30 text-center">
                    <CheckCircle2 size={48} className="mx-auto text-[#b44a84] mb-4" />
                    <h2 className="text-xl font-black mb-4">Confirmed!</h2>
                    <div className="text-left text-xs space-y-2 bg-black/30 p-4 rounded-xl mb-6">
                        <p><span className="opacity-50">Service:</span> {service}</p>
                        <p className="flex justify-between">
                            <span><span className="opacity-50">Time:</span> {timeSlot}</span>
                        </p>
                        <p className="text-[10px] italic opacity-60 text-right">{timeZone}</p>
                        <p><span className="opacity-50">Email:</span> {formData.email}</p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="w-full py-3 bg-[#b44a84] rounded-xl font-bold text-sm"
                    >
                      Book Another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Button */}
          {step !== 4 && (
            <div className="mt-8 flex justify-end">
              <button
                disabled={!stepCompleted[step]}
                onClick={step === 3 ? handleSubmit : handleNext}
                className="w-full sm:w-auto px-10 py-3 bg-[#b44a84] hover:bg-[#a64d79] disabled:opacity-30 rounded-xl font-black transition-all text-sm tracking-widest shadow-lg"
              >
                {loading ? "PROCESSING..." : step === 3 ? "SUBMIT" : "CONTINUE"}
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .react-datepicker {
          background-color: #1c1c1e !important;
          border: none !important;
          font-family: inherit !important;
          width: 100% !important;
          display: flex !important;
          justify-content: center !important;
        }
        .react-datepicker__header {
          background-color: #1c1c1e !important;
          border-bottom: 1px solid rgba(255,255,255,0.1) !important;
        }
        .react-datepicker__day, .react-datepicker__day-name, .react-datepicker__current-month {
          color: white !important;
        }
        .react-datepicker__day:hover {
          background-color: #b44a84 !important;
          border-radius: 8px;
        }
        .react-datepicker__day--selected {
          background-color: #b44a84 !important;
          border-radius: 8px;
        }
        .react-datepicker__day--disabled {
            color: rgba(255,255,255,0.2) !important;
        }
      `}</style>
    </div>
  );
};

export default BusinessBookingSection;