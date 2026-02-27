import React, { useState } from "react";
import teamImage from "../../assets/seekers/seekers (4).jpg";
import businessDetailsService from "../../services/businessDetailsService";
import Popup from "../../components/UI/Popup";

const GrowBusinessSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Website Design",
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "Website Design",
      details: "",
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
      const response = await businessDetailsService.createBusinessDetail(formData);
      showNotification(response.message || "Business details submitted successfully!", "success");
      resetForm();
    } catch (error) {
      showNotification(error.message || "Failed to submit business details", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 bg-red-500">
      {showPopup && (
        <Popup
          message={popupMessage}
          type={popupType}
          onClose={() => setShowPopup(false)}
        />
      )}
      
      {/* Main Section */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 h-[70vh]">
        {/* Left Section: Text and Image */}
        <div className="lg:w-1/2 text-[#fef5f0] flex flex-col justify-around bg-[#15171e] p-12 h-full">
          <h1 className="text-4xl font-extrabold leading-tight">
            <span className="block">Grow your business with</span>
            <span className="block text-[#a64d79]">our robust digital solutions.</span>
          </h1>
          <p className="text-gray-300 text-lg">
            We consistently exceed our clients' expectations by providing high quality digital solutions. Get in touch with us get started!
          </p>
          <div className="flex items-center gap-4 border border-white">
            <img
              src={teamImage}
              alt="Team member"
              className="w-64 h-40 object-fill"
              loading="lazy" 
            />
            <div>
              <p className="text-gray-300 text-lg">(123) 456 7890</p>
              <p className="text-[#a64d79] font-extrabold">TALK TO AN EXPERT</p>
            </div>
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="lg:w-1/2 bg-[#15171e] p-12 h-full">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              <div>
                <label className="block text-[#fef5f0] text-sm mb-1">NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-black text-[#fef5f0] border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#a64d79]"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-[#fef5f0] text-sm mb-1">PHONE NUMBER</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-black text-[#fef5f0] border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#a64d79]"
                  placeholder=""
                />
              </div>
            </div>
            <div className="wraper flex justify-between gap-6 w-full">

            <div className="w-full">
              <label className="block text-[#fef5f0] text-sm mb-1">EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-black text-[#fef5f0] border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#a64d79]"
                placeholder=""
              />
            </div>
            <div className="w-full">
              <label className="block text-[#fef5f0] text-sm mb-1">REQUIRED SERVICE</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full bg-black text-[#fef5f0] border border-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#a64d79]"
              >
                <option>Website Design</option>
                <option>App Development</option>
                <option>Digital Marketing</option>
                <option>SEO Services</option>
              </select>
            </div>
            </div>
            <div>
              <label className="block text-[#fef5f0] text-sm mb-1">PROJECT DETAILS</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                className="w-full bg-black text-[#fef5f0] border border-gray-700 rounded p-2 h-24 focus:outline-none focus:ring-2 focus:ring-[#a64d79]"
                placeholder=""
              ></textarea>
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className={`w-full bg-[#a64d79] text-[#fef5f0] font-extrabold py-3 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-[#a64d79] focus:ring-opacity-50 transition-all duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "GET FREE QUOTE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowBusinessSection;