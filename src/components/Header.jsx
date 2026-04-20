import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logos/humanHireNew.webp";
import faviconsService from "../services/faviconsService";
import getOptimizedImageUrl from "../utils/getOptimizedImageUrl ";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [headerLogoUrl, setHeaderLogoUrl] = useState(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Job Seekers", path: "/job-seekers" },
    { name: "Our People", path: "/our-people" },
    { name: "Blogs", path: "/blogs" },
  ];

  useEffect(() => {
    const fetchFavicon = async () => {
      try {
        const res = await faviconsService.getFavicons();
        if (res?.data?.headerLogo) {
          setHeaderLogoUrl(res.data.headerLogo);
        }
      } catch (err) {
        console.error("Failed to load header logo:", err.message);
      }
    };
    fetchFavicon();
  }, []);

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-6 lg:px-12 py-3 md:py-3 lg:py-4 max-w-full sm:max-w-5xl lg:max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src={getOptimizedImageUrl(headerLogoUrl || logo, 161)}
              srcSet={`
    ${getOptimizedImageUrl(headerLogoUrl || logo, 120)} 120w,
    ${getOptimizedImageUrl(headerLogoUrl || logo, 161)} 161w,
    ${getOptimizedImageUrl(headerLogoUrl || logo, 220)} 220w
  `}
              sizes="(max-width: 640px) 120px,
         (max-width: 1024px) 161px,
         220px"
              width="161"
              height="56"
              alt="Human Hire Logo"
              className="h-8 sm:h-10 md:h-8 lg:h-12 w-auto"
              fetchpriority="high"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-6 lg:space-x-10">
          <ul className="flex space-x-3 sm:space-x-5 md:space-x-4 lg:space-x-11 text-[#fef5f0]">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name} className="relative group">
                  <Link
                    to={item.path}
                    className="pb-1 text-xs sm:text-sm md:text-sm lg:text-base tracking-widest uppercase transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                  {!isActive && (
                    <span className="absolute left-1/2 -bottom-1 sm:-bottom-2 w-0 h-0.5 bg-[#d8737a] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 bg-[#d8737a]" />
                  )}
                </li>
              );
            })}
          </ul>

          <Link to="/contact-us">
            <button className="border-2 border-[#a64d79] text-[#fef5f0] px-2 sm:px-3 md:px-3 lg:px-6 py-1 sm:py-1.5 md:py-1.5 lg:py-2.5 text-xs sm:text-sm md:text-sm lg:text-base transition duration-300 hover:bg-[#a64d79] rounded">
              CONTACT US
            </button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="relative z-50 transition-transform duration-300"
          >
            <div className="transition-transform duration-300 ease-in-out">
              {isOpen ? (
                <X className="text-[#fef5f0] h-6 sm:h-7 w-6 sm:w-7 transform rotate-180 transition duration-300" />
              ) : (
                <Menu className="text-[#fef5f0] h-6 sm:h-7 w-6 sm:w-7 transform rotate-0 transition duration-300" />
              )}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-black bg-opacity-90 px-4 sm:px-6 py-4 sm:py-6 transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <ul className="space-y-3 sm:space-y-4 text-[#fef5f0] text-sm sm:text-base font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link to={item.path} onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/contact-us">
          <button
            className="mt-3 sm:mt-4 w-full bg-[#a64d79] hover:bg-[#c96d95] text-[#fef5f0] py-2 sm:py-3 text-sm sm:text-base rounded transition"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
