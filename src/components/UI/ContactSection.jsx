import React, { useState } from "react";
import businessDetailsService from "../../services/businessDetailsService";
import Popup from "../../components/UI/Popup";
import { useSiteSettings } from "../../context/SiteSettingsContext";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Website Design",
    projectDetails: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const { settings, error } = useSiteSettings();

  const generalData =
    settings?.data?.find((item) => item.category === "General Information")
      ?.data || {};

  const { phoneNumber } = generalData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "Permanent Staffing",
      projectDetails: "",
    });
  };

  const showNotification = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response =
        await businessDetailsService.createBusinessDetail(formData);
      showNotification(
        "Business projectDetails submitted successfully!",
        "success",
      );
      resetForm();
    } catch (error) {
      showNotification(
        error.message || "Failed to submit business projectDetails",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="text-[#fef5f0] w-full px-4 md:px-8 py-16 bg-black">
      {showPopup && (
        <Popup
          message={popupMessage}
          type={popupType}
          onClose={() => setShowPopup(false)}
        />
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row w-full gap-y-8 lg:gap-x-6">
        {/* Left */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between bg-[#15171e] p-8 sm:p-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              <span className="text-[#b44a84]">Connecting You to Talent</span>
              <br /> That Drives Results.
            </h2>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed mt-10">
              We align exceptional talent with your strategic goals, ensuring
              every hire makes a measurable impact. Through insight-driven
              recruitment, we connect ambition with opportunity—where
              performance meets purpose.
            </p>
          </div>

          {/* Image + Contact */}
          <div className="mt-10 flex border border-gray-600 w-full h-[120px] bg-transparent hover:bg-[#b44a84] hover:border-[#b44a84] transition-colors duration-300 cursor-pointer group">
            {/* Left half with overflow-hidden */}
            <div className="w-1/2 h-full overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg"
                alt="Expert"
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Right half */}
            <div className="w-1/2 bg-black bg-opacity-50 group-hover:bg-transparent flex flex-col justify-center items-center text-center p-3 transition-colors duration-300">
              <p className="text-lg font-extrabold text-[#fef5f0]">
                {"+44 7400 075848"}
              </p>
              <p className="text-sm text-[#fef5f0]">TALK TO AN EXPERT</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:w-1/2 bg-[#15171e] p-8 sm:p-12">
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-transparent border border-gray-600 text-[#fef5f0] focus:outline-none focus:ring-2 focus:ring-[#b44a84]"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-transparent border border-gray-600 text-[#fef5f0] focus:outline-none focus:ring-2 focus:ring-[#b44a84]"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-transparent border border-gray-600 text-[#fef5f0] focus:outline-none focus:ring-2 focus:ring-[#b44a84]"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Required Service</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-transparent border border-gray-600 text-[#fef5f0] focus:outline-none focus:ring-2 focus:ring-[#b44a84]"
                >
                  <option className="bg-black text-[#fef5f0]">
                    Permanent Staffing
                  </option>
                  <option className="bg-black text-[#fef5f0]">
                    Contract Staffing
                  </option>
                  <option className="bg-black text-[#fef5f0]">
                    Payroll Management
                  </option>
                  <option className="bg-black text-[#fef5f0]">
                    L&D Services
                  </option>
                  <option className="bg-black text-[#fef5f0]">
                    Executive Search
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Project Details</label>
              <textarea
                rows="5"
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleInputChange}
                className="w-full p-3 bg-transparent border border-gray-600 text-[#fef5f0] focus:outline-none focus:ring-2 focus:ring-[#b44a84]"
              ></textarea>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className={`w-full py-3 font-extrabold text-[#fef5f0] bg-[#b44a84] hover:bg-transparent hover:border hover:border-[#b44a84] transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
