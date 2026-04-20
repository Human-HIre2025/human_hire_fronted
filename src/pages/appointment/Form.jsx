import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ChevronDown,
  Calendar,
  User,
  Settings,
  ChevronRight,
  CheckCircle2,
  PhoneCall,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import appointmentService from "../../services/appointmentService";
// import Popup from "../../components/UI/Popup"; // Commented out as in your snippet
import { useSiteSettings } from "../../context/SiteSettingsContext";

export default function ContactSection() {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("Web Development");
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const { settings } = useSiteSettings();
  const generalData =
    settings?.data?.find((item) => item.category === "General Information")
      ?.data || {};

  const { phoneNumber } = generalData;

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const stepCompleted = {
    1: !!selectedService,
    2: !!selectedDate && !!timeSlot,
    3:
      !!formData.firstName &&
      !!formData.lastName &&
      !!formData.email &&
      !!formData.phone,
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formattedDate = selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : "";
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const timeParts = timeSlot.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!timeParts) throw new Error("Invalid time slot format");
      const hours = parseInt(timeParts[1]);
      const minutes = timeParts[2];
      const period = timeParts[3].toUpperCase();
      const endHours = hours === 12 ? 1 : hours + 1;
      const endPeriod = hours === 11 && period === "AM" ? "PM" : period;
      const formattedTimeSlot = `${timeSlot} - ${endHours}:${minutes} ${endPeriod}`;

      const appointmentData = {
        service: selectedService,
        date: formattedDate,
        timeSlot: formattedTimeSlot,
        name: fullName,
        email: formData.email,
        phone: formData.phone,
      };

      const response =
        await appointmentService.createAppointment(appointmentData);
      setPopupMessage("Appointment created successfully!");
      setPopupType("success");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
      setStep(4);
    } catch (error) {
      setPopupMessage(error.message || "Failed to create appointment");
      setPopupType("error");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={fadeUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-3 sm:space-y-4 lg:space-y-5"
          >
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-[#fef5f0]">
              Service Selection
            </h2>
            <label className="text-xs sm:text-sm md:text-base font-extrabold block">
              SERVICE:
            </label>
            <div className="relative">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-[#fef5f0] px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-lg appearance-none text-xs sm:text-sm md:text-base focus:outline-none focus:border-[#b44a84]"
              >
                {/* <option>Permanent Staffing</option>
                <option>Contract Staffing</option>
                <option>Contract-to-Hire Solutions</option>
                <option>Payroll Management & Compliance</option>
                <option>Background Verification & Screening</option>
                <option>Learning & Development</option>
                <option>Audit & HR Compliance Services</option>
                <option>Offshore Development & Staffing</option>
                <option>Talent Mapping & Market Intelligence</option>
                <option>Executive Search & Leadership Hiring</option>
                <option>Recruitment Process Outsourcing (RPO)</option>
                <option>Global Mobility & Visa Assistance</option>
                <option>Remote Staffing Solutions</option>
                <option>Employee Engagement & Retention Advisory</option>
                <option>HR Technology & ATS Implementation</option> */}
                <option>Permanent Staffing</option>
                <option>Contract Staffing</option>
                <option>Payroll Management</option>
                <option>L&D Services</option>
                <option>Executive Search</option>
              </select>
              <ChevronDown className="absolute right-3 sm:right-4 lg:right-5 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={fadeUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-3 sm:space-y-4 lg:space-y-5"
          >
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-[#fef5f0]">
              Date & Time
            </h2>
            <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-[#1c1c1e] border border-white/20 rounded p-3 sm:p-4 flex justify-center xl:justify-start">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setTimeSlot("");
                  }}
                  minDate={new Date()}
                  inline
                  className="w-full text-xs sm:text-sm"
                  calendarClassName="bg-[#1c1c1e] text-[#fef5f0] border-none rounded text-xs sm:text-sm"
                />
              </div>
              {selectedDate && (
                <div className="flex-1 bg-[#1c1c1e] border border-white/20 rounded p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-[#fef5f0] mb-2 sm:mb-3">
                    Available Time Slots
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {[
                      "10:00 AM",
                      "11:00 AM",
                      "12:00 PM",
                      "2:00 PM",
                      "4:00 PM",
                      "6:00 PM",
                    ].map((slot) => (
                      <button
                        key={slot}
                        className={`w-full px-2 py-2 text-xs sm:text-sm border rounded transition-colors ${
                          timeSlot === slot
                            ? "bg-[#ff87be] border-[#ff87be] text-[#fef5f0]"
                            : "bg-transparent border-white text-[#fef5f0] hover:border-[#ff87be]"
                        }`}
                        onClick={() => setTimeSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={fadeUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-3 sm:space-y-4 lg:space-y-5"
          >
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-[#fef5f0]">
              Your Information
            </h2>
            <div className="grid gap-3 sm:gap-4">
              {["firstName", "lastName", "email", "phone"].map((field) => (
                <div key={field}>
                  <label className="text-xs sm:text-sm text-gray-400 mb-1 block uppercase">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    placeholder={`Enter your ${field
                      .replace(/([A-Z])/g, " $1")
                      .toLowerCase()}`}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    className="w-full bg-[#1c1c1e] text-[#fef5f0] border border-white/50 focus:border-[#b44a84] px-3 sm:px-4 py-2 sm:py-2.5 rounded text-xs sm:text-sm outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            key="confirmation"
            variants={fadeUp}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-[#fef5f0] space-y-3 sm:space-y-4 max-w-full sm:max-w-md mx-auto py-4"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#ff87be]">
              Appointment Confirmed!
            </h2>
            <div className="bg-[#1c1c1e] p-4 rounded-lg space-y-2 border border-white/10">
              <p className="text-xs sm:text-sm">
                <strong className="text-gray-400">Service:</strong>{" "}
                {selectedService}
              </p>
              <p className="text-xs sm:text-sm">
                <strong className="text-gray-400">Date:</strong>{" "}
                {selectedDate?.toLocaleDateString("en-US")}
              </p>
              <p className="text-xs sm:text-sm">
                <strong className="text-gray-400">Time:</strong> {timeSlot}
              </p>
              <p className="text-xs sm:text-sm">
                <strong className="text-gray-400">Name:</strong>{" "}
                {formData.firstName} {formData.lastName}
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedService("Web Development");
                setSelectedDate(null);
                setTimeSlot("");
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                });
                setStep(1);
              }}
              className="mt-4 bg-[#b44a84] hover:bg-[#a64d79] px-6 py-2.5 rounded text-[#fef5f0] text-sm font-semibold w-full transition-colors"
            >
              Book Another Appointment
            </button>
          </motion.div>
        );
    }
  };

  return (
    <section className="bg-black text-[#fef5f0] w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col max-w-full sm:max-w-5xl lg:max-w-7xl mx-auto min-h-[85vh] bg-[#15171e] p-4 sm:p-6 lg:p-8 rounded-lg space-y-6">
        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row flex-1 gap-4 lg:gap-6">
          {/* Sidebar Navigation */}
          {/* FIXED: Removed fixed min-w classes that broke collapse. Added conditional widths for md screens. */}
          <div
            className={`bg-[#a64d79] rounded-lg transition-all duration-300 ease-in-out flex flex-col justify-between flex-shrink-0 overflow-hidden
              w-full ${isMenuCollapsed ? "md:w-16 lg:w-20" : "md:w-48 lg:w-64"}
            `}
          >
            <div className="p-3 sm:p-4 space-y-2">
              {[1, 2, 3].map((s, index) => {
                const icons = [
                  <Settings size={20} className="flex-shrink-0" />,
                  <Calendar size={20} className="flex-shrink-0" />,
                  <User size={20} className="flex-shrink-0" />,
                ];
                const labels = ["Service", "Date & Time", "Your Info"];
                return (
                  <div
                    key={s}
                    onClick={() => setStep(s)}
                    className={`flex items-center text-sm cursor-pointer text-[#fef5f0] px-3 py-3 rounded-md transition-colors whitespace-nowrap overflow-hidden ${
                      step === s
                        ? "bg-[#b44a84] font-bold"
                        : "hover:bg-[#b44a84]/50"
                    }`}
                    title={isMenuCollapsed ? labels[index] : ""}
                  >
                    <div className="flex items-center justify-center w-6 h-6">
                      {icons[index]}
                    </div>

                    {/* Label with opacity transition for smooth collapse */}
                    <span
                      className={`ml-3 transition-opacity duration-300 ${isMenuCollapsed ? "opacity-0 w-0 hidden md:block" : "opacity-100"}`}
                    >
                      {labels[index]}
                    </span>

                    {stepCompleted[s] && (
                      <CheckCircle2
                        className={`ml-auto w-4 h-4 text-[#fef5f0] ${isMenuCollapsed ? "hidden" : "block"}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-3 sm:p-4 border-t border-white/20">
              {/* Contact Info in Sidebar - Hides on collapse */}
              <div
                className={`transition-all duration-300 overflow-hidden ${isMenuCollapsed ? "h-0 opacity-0" : "h-auto opacity-100"} mb-4 text-xs`}
              >
                <div className="font-semibold mb-1">Contact Us</div>

                {/* Phone */}
                <a
                  href={`tel:${("+44 7400 075848").replace(/\s+/g, "")}`}
                  className="mb-1 block opacity-80 hover:opacity-100 hover:text-[#ff87be] transition"
                >
                  {"+44 7400 075848"}
                </a>

                {/* Email */}
                <a
                  href="mailto:hr@humanhirecorp.com"
                  className="block opacity-80 break-words hover:opacity-100 hover:text-[#ff87be] transition"
                >
                  hr@humanhirecorp.com
                </a>
              </div>

              {/* Collapse Button */}
              <button
                onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
                className="text-[#fef5f0] flex items-center justify-center w-full hover:bg-[#b44a84]/50 p-2 rounded transition-colors"
              >
                {/* On mobile, we use a simple text or icon toggle. On desktop, we handle the sidebar logic */}
                {isMenuCollapsed ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <div className="flex items-center w-full justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Collapse
                    </span>
                    <ChevronLeft className="w-5 h-5" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Dynamic Content Section */}
          <div className="flex-1 flex flex-col relative bg-[#1c1c1e]/50 rounded-lg p-4 sm:p-6 lg:p-8 min-h-[400px]">
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>

            {/* Buttons Area */}
            {step !== 4 && (
              <div className="mt-8 flex justify-end">
                {step < 3 ? (
                  <button
                    disabled={!stepCompleted[step]}
                    onClick={handleNext}
                    className="bg-[#b44a84] hover:bg-[#a64d79] px-6 py-2.5 rounded-lg text-[#fef5f0] disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition-all w-full sm:w-auto"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    disabled={!stepCompleted[3] || loading}
                    onClick={handleSubmit}
                    className="bg-[#b44a84] hover:bg-[#a64d79] px-6 py-2.5 rounded-lg text-[#fef5f0] disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition-all w-full sm:w-auto flex items-center justify-center"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        Processing...
                      </span>
                    ) : (
                      "Submit Appointment"
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Area */}
        <div className="flex flex-col gap-4 text-center">
          <div className="text-gray-500 text-xs">
            Your information is never sold or shared. It is used for the sole
            purpose of contacting you.
          </div>

          <div className="bg-[#1c1c1e] p-4 rounded-lg flex flex-col sm:flex-row justify-center items-center gap-2 text-sm border border-white/10">
            <span>You can reach us directly at</span>

            <a
              href={`tel:${"+44 7400 075848"}`}
              className="flex items-center gap-2 text-[#ff87be] font-bold cursor-pointer hover:opacity-80"
            >
              <span className="bg-[#a64d79] p-1.5 rounded-full text-white">
                <PhoneCall size={14} />
              </span>

              {"+44 7400 075848"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
