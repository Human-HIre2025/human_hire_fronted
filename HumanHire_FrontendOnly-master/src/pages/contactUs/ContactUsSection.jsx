import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneVolume,
} from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import getOptimizedImageUrl from "../../utils/getOptimizedImageUrl ";
import img1 from "../../assets/contact/1.png";
import img2 from "../../assets/contact/2.png";
import img3 from "../../assets/contact/3.png";
import img4 from "../../assets/contact/4.png";
import img5 from "../../assets/contact/5.jpeg";
import img6 from "../../assets/contact/6.jpeg";
import img7 from "../../assets/contact/7.jpeg";
import img8 from "../../assets/contact/8.jpeg";

const ContactUsSection = () => {
  const [activeTab, setActiveTab] = useState("India");
  // Mock images for demonstration
  const teamMembers = [
    {
      name: "John Doe",
      image: img1,
    },
    {
      name: "Jane Smith",
      image: img2,
    },
    {
      name: "Aarav Patel",
      image: img3,
    },
    {
      name: "Sara Khan",
      image: img4,
    },
    {
      name: "Joe",
      image: img5,
    },
    {
      name: "Joe",
      image: img6,
    },
    {
      name: "Zoya",
      image: img7,
    },
    {
      name: "Zoya",
      image: img8,
    },
  ];
  const locations = {
    India: {
      mapIframe:
        "https://www.google.com/maps?q=28.624018999999997,77.03219829999999&z=15&output=embed",
      phone: "+91 87695 21604",
      email: "hr@humanhirecorp.com",
      address:
        "2nd Floor, A12, Mohan Garden, Block D, Bhagwati Garden, Uttam Nagar, New Delhi, Delhi 110059",
    },
    UK: {
      mapIframe:
        "https://www.google.com/maps?q=51.5136472,-0.1254628&z=15&output=embed",
      phone: "+44 7400 075848",
      email: "hr@humanhirecorp.com",
      address:
        "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, UNITED KINGDOM",
    },
    US: {
      mapIframe:
        "https://www.google.com/maps?q=39.7538431,-75.5597214&z=15&output=embed",
      phone: "+1 (628) 265-3814",
      email: "hr@humanhirecorp.com",
      address:
        "Battery Street East Suite 100, San Francisco, California 94111, US",
    },
    Philippines: {
      mapIframe:
        "https://www.google.com/maps?q=10.3295562,123.9030282&z=15&output=embed",
      phone: "+63 2 7354 1629",
      email: "hr@humanhirecorp.com",
      address: "2nd Floor, La Guardia St, Cebu City, 6000 Cebu, Philippines",
    },
  };

  const handleTabClick = (location) => {
    setActiveTab(location);
  };

  return (
    <div className="relative bg-black py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-10">
      {/* Tabs */}
      <div className="flex justify-center overflow-x-auto space-x-2 rounded-xl mb-4 sm:mb-6 lg:mb-8 -mt-16 sm:-mt-24 lg:-mt-40 max-w-[95%] sm:max-w-2xl mx-auto">
        {["India", "UK", "US", "Philippines"].map((location) => (
          <button
            key={location}
            onClick={() => handleTabClick(location)}
            className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 lg:py-4 justify-center flex-1 text-xs sm:text-sm md:text-base font-extrabold transition-all duration-300 whitespace-nowrap ${
              activeTab === location
                ? "bg-[#a64d79] text-[#fef5f0]"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-[#a64d79] focus:ring-opacity-50`}
          >
            <GrLocationPin className="mr-1 sm:mr-2 h-4 sm:h-5 lg:h-6 w-4 sm:w-5 lg:w-6" />
            {location.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="wrapper max-w-full sm:max-w-5xl lg:max-w-7xl mx-auto bg-[#15171e] p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-8 lg:gap-10 rounded-lg">
        {/* Gallery */}
        <section className="text-[#fef5f0]">
          {/* Full width carousel container */}
          <div className="overflow-hidden relative w-full">
            <div className="flex animate-scroll gap-2 sm:gap-3 lg:gap-4">
              {/* First set of images */}
              {teamMembers.map((member, index) => (
                <div
                  key={`first-${index}`}
                  className="w-[150px] sm:w-[200px] lg:w-[250px] h-[120px] sm:h-[160px] lg:h-[200px] flex-shrink-0"
                >
                  <img
                    src={getOptimizedImageUrl(member.image)}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 rounded"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {teamMembers.map((member, index) => (
                <div
                  key={`second-${index}`}
                  className="w-[150px] sm:w-[200px] lg:w-[250px] h-[120px] sm:h-[160px] lg:h-[200px] flex-shrink-0"
                >
                  <img
                    src={getOptimizedImageUrl(member.image)}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 rounded"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Third set to ensure smooth infinite scroll */}
              {teamMembers.map((member, index) => (
                <div
                  key={`third-${index}`}
                  className="w-[150px] sm:w-[200px] lg:w-[250px] h-[120px] sm:h-[160px] lg:h-[200px] flex-shrink-0"
                >
                  <img
                    src={getOptimizedImageUrl(member.image)}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 rounded"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-66.666%);
              }
            }

            .animate-scroll {
              animation: scroll 20s linear infinite;
            }

            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
        </section>

        {/* Map and Location Details */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10">
          {/* Map */}
          <div className="w-full lg:w-1/2">
            <iframe
              src={locations[activeTab].mapIframe}
              width="100%"
              height="200px sm:300px lg:350px"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg mb-4 sm:mb-6 lg:mb-0"
            ></iframe>
          </div>

          {/* Location Details */}
          <div className="w-full lg:w-1/2 text-[#fef5f0] space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="flex items-start">
              <FaPhoneVolume className="text-[#fef5f0] mr-3 sm:mr-4 text-2xl sm:text-3xl lg:text-4xl" />
              <div className="flex flex-col">
                <span className="font-extrabold text-xs sm:text-sm md:text-base">
                  PHONE:
                </span>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                  {locations[activeTab].phone}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FaEnvelope className="text-[#fef5f0] mr-3 sm:mr-4 text-2xl sm:text-3xl lg:text-4xl" />
              <div className="flex flex-col">
                <span className="font-extrabold text-xs sm:text-sm md:text-base">
                  EMAIL:
                </span>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                  {locations[activeTab].email}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <GrLocationPin className="text-[#fef5f0] mr-3 sm:mr-4 text-2xl sm:text-3xl lg:text-4xl mt-1" />
              <div className="flex flex-col">
                <span className="font-extrabold text-xs sm:text-sm md:text-base">
                  ADDRESS:
                </span>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                  {locations[activeTab].address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
