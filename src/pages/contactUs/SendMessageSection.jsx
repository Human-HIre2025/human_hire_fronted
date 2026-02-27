import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Popup from "../../components/UI/Popup";
import { createContactSubmission } from "../../services/contactServices";
import { useSiteSettings } from "../../context/SiteSettingsContext";
import testimonialService from "../../services/testimonialServices";
import getOptimizedImageUrl from "../../utils/getOptimizedImageUrl ";

const SendMessageSection = () => {
  const socialIconClass =
    "bg-gray-800/50 p-4 rounded transition-all duration-300 \
   hover:bg-[#a64d79]/60 hover:opacity-90 \
   active:scale-95 cursor-pointer group backdrop-blur-sm";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialError, setTestimonialError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await testimonialService.getTestimonials();
        const data = res?.data || [];
        setTestimonials(data);
      } catch (err) {
        setTestimonialError("Unable to load testimonials");
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [testimonials]);

  const { settings } = useSiteSettings();

  // Get General Information section
  const generalInfo = settings?.data?.find(
    (item) => item.category === "General Information",
  );

  const socialLinks = generalInfo?.data?.socialMedia || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createContactSubmission(formData);
      setPopupMessage("Message sent successfully!");
      setPopupType("success");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        details: "",
      });
    } catch (error) {
      setPopupMessage(error.message || "Failed to send message");
      setPopupType("error");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-black py-20 px-4 sm:px-6 lg:px-8">
      {showPopup && (
        <Popup
          message={popupMessage}
          type={popupType}
          onClose={() => setShowPopup(false)}
        />
      )}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-32">
        {/* Left Section: Form */}
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-extrabold text-[#fef5f0] text-center mb-20">
            Send us a message
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#fef5f0] text-xs mb-2">
                  FIRST NAME
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-[#fef5f0] border border-gray-400 p-4 focus:outline-none focus:ring-2 focus:ring-[#a64d79]"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-[#fef5f0] text-xs mb-2">
                  LAST NAME
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-[#fef5f0] border border-gray-400 p-4 focus:outline-none focus:ring-2 focus:ring-[#a64d79]"
                  placeholder=""
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#fef5f0] text-xs mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-[#fef5f0] border border-gray-400 p-4 focus:outline-none focus:ring-2 focus:ring-[#a64d79]"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-[#fef5f0] text-xs mb-2">
                  PHONE NUMBER
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-[#fef5f0] border border-gray-400 p-4 focus:outline-none focus:ring-2 focus:ring-[#a64d79]"
                  placeholder=""
                />
              </div>
            </div>
            <div>
              <label className="block text-[#fef5f0] text-xs mb-2">
                SUBJECT
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full bg-transparent text-[#fef5f0] border border-gray-400 p-4 focus:outline-none focus:ring-2 focus:ring-[#a64d79]"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-[#fef5f0] text-xs mb-2">
                DETAILS
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                className="w-full bg-transparent text-[#fef5f0] border border-gray-400 p-4 h-64 focus:outline-none focus:ring-2 focus:ring-[#a64d79]"
                placeholder=""
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-sm bg-[#a64d79] font-extrabold text-[#fef5f0] py-3 rounded hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-[#a64d79] focus:ring-opacity-50 transition-all duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "SUBMIT"}
            </button>
          </form>
        </div>

        {/* Right Section: Sidebar and Testimonial */}
        <div className="lg:w-1/3 space-y-20">
          {/* Sidebar */}
          <Link to="/book-an-appointment">
            <button
              type="submit"
              className="w-full py-3 font-extrabold text-[#fef5f0] bg-[#b44a84] hover:bg-transparent hover:border text-sm hover:border-[#b44a84] transition duration-300"
            >
              BOOK AN APPOINTMENT
            </button>
          </Link>
          <div className="bg-[#15171e] p-12 text-xs mt-14">
            <ul className="space-y-4">
              <li>
                <a
                  href="/services"
                  className="text-[#fef5f0] hover:text-[#a64d79] transition-all duration-300 flex items-center"
                >
                  <span className="mr-2">➔</span> OUR SERVICES
                </a>
              </li>
              <li>
                <a
                  href="/job-seekers"
                  className="text-[#fef5f0] hover:text-[#a64d79] transition-all duration-300 flex items-center"
                >
                  <span className="mr-2">➔</span> CAREERS
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-[#fef5f0] hover:text-[#a64d79] transition-all duration-300 flex items-center"
                >
                  <span className="mr-2">➔</span> ABOUT US
                </a>
              </li>
            </ul>
            {/* Social Icons */}
          </div>
          {Object.keys(socialLinks).length > 0 && (
            <div className="flex gap-4 mt-6">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                >
                  <FaFacebookF className="text-[#a64d79] text-2xl group-hover:opacity-80" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                >
                  <FaTwitter className="text-[#a64d79] text-2xl group-hover:opacity-80" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                >
                  <FaLinkedin className="text-[#a64d79] text-2xl group-hover:opacity-80" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                >
                  <FaInstagram className="text-[#a64d79] text-2xl group-hover:opacity-80" />
                </a>
              )}
            </div>
          )}

          {/* Testimonial */}
          {testimonials.length > 0 && (
            <div className="bg-[#a64d79] p-12 text-[#fef5f0] flex flex-col items-start gap-4">
              <div>
                <p className="text-[#fef5f0] mb-2">
                  "{testimonials[activeIndex].review}"
                </p>
              </div>
              <div className="flex space-x-4">
                <img
                  src={getOptimizedImageUrl(
                    testimonials[activeIndex].authorImg,
                  )}
                  alt={testimonials[activeIndex].authorName}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <p className="font-extrabold">
                    {testimonials[activeIndex].authorName}
                  </p>
                  <p className="text-[#fef5f0] text-xs">
                    {testimonials[activeIndex].authorPosition}
                  </p>
                </div>
              </div>
            </div>
          )}

          {testimonialError && (
            <div className="text-red-500 mt-4 text-sm">{testimonialError}</div>
          )}

          {testimonialError && (
            <div className="text-red-500 bg-white p-4 mt-4 text-sm">
              {testimonialError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendMessageSection;
