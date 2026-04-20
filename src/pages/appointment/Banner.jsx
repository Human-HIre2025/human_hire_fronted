import React from "react";
import { FiPhone, FiMail, FiArrowRight } from "react-icons/fi";
import { useSiteSettings } from "../../context/SiteSettingsContext";
import { Link } from "react-router-dom";

export default function Banner() {
  const { settings, error } = useSiteSettings();
  const generalData =
    settings?.data?.find((item) => item.category === "General Information")?.data || {};

  const { phoneNumber, contactEmail } = generalData;

  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] overflow-hidden bg-black py-8 sm:py-12 lg:py-16">
      <div className="relative h-full w-full flex items-center justify-center">
        {/* Hexagonal Background Pattern */}
        <div
          className="appointment-banner absolute inset-0 bg-gray-900"
          style={{
            backgroundAttachment: "fixed",
          }}
        ></div>

        {/* Content Container */}
        <div className="relative z-10 max-w-full sm:max-w-5xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center lg:text-left">
                <span className="text-[#A64D79]">Grow your business</span>{" "}
                <span className="text-[#fef5f0]">with our</span>
                <br />
                <span className="text-[#fef5f0]">robust digital solutions.</span>
              </h1>

              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-[95%] sm:max-w-md lg:max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                We consistently exceed our clients' expectations by providing
                high quality digital solutions. Get in touch with us get
                started!
              </p>
            </div>

            {/* Right Content */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Contact Information */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center lg:justify-start">
                {/* Phone */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 bg-[#A64D79] rounded-full flex items-center justify-center flex-shrink-0">
                    <FiPhone className="text-[#fef5f0] text-base sm:text-lg lg:text-xl" />
                  </div>
                  <div>
                    <p className="text-[#fef5f0] font-extrabold text-base sm:text-lg md:text-xl">
                      {"+44 7400 075848"}
                    </p>
                    <p className="text-gray-400 text-[0.6rem] sm:text-xs md:text-sm">TALK TO AN EXPERT</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 bg-[#A64D79] rounded-full flex items-center justify-center flex-shrink-0">
                    <FiMail className="text-[#fef5f0] text-base sm:text-lg lg:text-xl" />
                  </div>
                  <div>
                    <p className="text-[#fef5f0] font-extrabold text-base sm:text-lg md:text-xl">
                      {contactEmail || "jainriddhidev@gmail.com"}
                    </p>
                    <p className="text-gray-400 text-[0.6rem] sm:text-xs md:text-sm">EMAIL US</p>
                  </div>
                </div>
              </div>

              {/* Get Started Button */}
              <div className="pt-4 sm:pt-6 lg:pt-8">
                <Link to="/" className="w-full sm:w-auto bg-[#A64D79] hover:bg-[#8B4A6B] text-[#fef5f0] font-extrabold py-3 sm:py-4 lg:py-4 px-6 sm:px-8 lg:px-10 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group">
                  <FiArrowRight className="text-base sm:text-lg lg:text-xl group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm sm:text-base md:text-lg">GET STARTED</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}