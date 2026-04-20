import React, { useEffect, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Facebook,
  Linkedin,
  Instagram,
  ChevronRight,
} from "lucide-react";
import logo from "../assets/logos/humanHire.png";
import { Link } from "react-router-dom";
import faviconsService from "../services/faviconsService";
import { useSiteSettings } from "../context/SiteSettingsContext";
import getOptimizedImageUrl from "../utils/getOptimizedImageUrl ";

const Footer = () => {
  const footerSocialClass =
    "w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 \
   bg-gray-800/60 backdrop-blur-sm rounded-full \
   flex items-center justify-center \
   transition-all duration-300 \
   hover:bg-[#b44a84]/60 hover:opacity-90 \
   active:scale-95 cursor-pointer group";

  const [footerLogoUrl, setFooterLogoUrl] = useState(null);
  const { settings, loading, error } = useSiteSettings();

  // Extract Footer category data safely
  const footerData =
    settings?.data?.find((item) => item.category === "Footer")?.data || {};

  const generalData =
    settings?.data?.find((item) => item.category === "General Information")
      ?.data || {};

  // Destructure footerData properties to use
  const {
    copyright,
    footerSubHeading,
    // socialMedia,
    usefulLinks,
  } = footerData;

  const { phoneNumber, contactEmail, address, socialMedia } = generalData;
  // console.log(socialMedia)
  // console.log(contactEmail)
  // console.log(address)
  // console.log('phoneNumber', phoneNumber)

  useEffect(() => {
    const fetchFavicon = async () => {
      try {
        const res = await faviconsService.getFavicons();
        if (res?.data?.footerLogo) {
          setFooterLogoUrl(res.data.footerLogo);
        }
      } catch (err) {
        console.error("Failed to load footer logo:", err.message);
      }
    };
    fetchFavicon();
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-400 py-8">Loading footer...</div>
    );
  if (error)
    return (
      <div className="text-center text-red-400 py-8">
        Error loading footer: {error}
      </div>
    );

  return (
    <footer className="bg-black text-gray-400 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-10">
      <div className="max-w-full sm:max-w-5xl lg:max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
        {/* Logo + Social */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="flex items-center h-fit mb-6 sm:mb-8 lg:mb-10">
            <Link to="/">
            <img
              src={getOptimizedImageUrl(footerLogoUrl || logo)}
              alt="Footer Logo"
              className="w-auto h-16 sm:h-18 lg:h-20"
              loading="lazy"
            />
            </Link>
          </div>
          <div
            className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: footerSubHeading || "Best consulting service provider!",
            }}
          />
          <div className="flex gap-2 sm:gap-3 lg:gap-4">
            {socialMedia?.facebook && (
              <a
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={footerSocialClass}
                aria-label="Facebook"
              >
                <Facebook
                  size={14}
                  sm:size-16
                  lg:size-18
                  className="text-[#b44a84]"
                />
              </a>
            )}
            {socialMedia?.twitter && (
              <a
                href={socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={footerSocialClass}
                aria-label="Twitter"
              >
                <span className="text-[#b44a84]">X</span>
              </a>
            )}
            {socialMedia?.linkedin && (
              <a
                href={socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={footerSocialClass}
                aria-label="LinkedIn"
              >
                <Linkedin
                  size={14}
                  sm:size-16
                  lg:size-18
                  className="text-[#b44a84]"
                />
              </a>
            )}
            {socialMedia?.instagram && (
              <a
                href={socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={footerSocialClass}
                aria-label="Instagram"
              >
                <Instagram
                  size={14}
                  sm:size-16
                  lg:size-18
                  className="text-[#b44a84]"
                />
              </a>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-[#fef5f0] font-extrabold mb-4 sm:mb-6 lg:mb-8 text-base sm:text-lg md:text-xl tracking-wide">
            CONTACT INFO
          </h3>

          <ul className="space-y-3 sm:space-y-4 lg:space-y-6 text-xs sm:text-sm md:text-base">
            {/* Phone */}
            <li>
              <a
                href={`tel:${("+44 7400 075848").replace(/\D/g, "")}`}
                className="flex items-center gap-3 sm:gap-4 group hover:text-[#fef5f0] transition-colors"
              >
                <Phone
                  size={14}
                  className="group-hover:text-[#b44a84] transition-colors"
                />
                <span>{"+44 7400 075848"}</span>
              </a>
            </li>

            {/* Email */}
            <li>
              <a
                href={`mailto:${"hr@humanhirecorp.com"}`}
                className="flex items-center gap-3 sm:gap-4 group hover:text-[#fef5f0] transition-colors break-words"
              >
                <Mail
                  size={14}
                  className="group-hover:text-[#b44a84] transition-colors"
                />
                <span>{"hr@humanhirecorp.com"}</span>
              </a>
            </li>

            {/* Address (Optional but Professional) */}
            <li>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  address || "123 King Street, NY",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 group hover:text-[#fef5f0] transition-colors"
              >
                <MapPin
                  size={14}
                  className="group-hover:text-[#b44a84] transition-colors"
                />
                <span>{"2803 PHILADELPHIA PIKE SUITE B, CLAYMONT, DELAWARE 19703"}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Useful Info */}
        <div>
          <h3 className="text-[#fef5f0] font-extrabold mb-4 sm:mb-6 lg:mb-8 text-base sm:text-lg md:text-xl tracking-wide">
            USEFUL INFO
          </h3>
          <ul className="space-y-3 sm:space-y-4 lg:space-y-6 text-xs sm:text-sm md:text-base">
            {usefulLinks?.items?.map((link, i) => (
              <li
                key={i}
                className="flex items-center gap-3 sm:gap-4 cursor-pointer group hover:text-[#fef5f0] transition-colors"
              >
                <Link to={link.url || "#"} className="flex space-x-2">
                  <ChevronRight
                    size={14}
                    sm:size-16
                    lg:size-18
                    className="group-hover:text-[#b44a84] transition-colors"
                  />
                  <span>{link.title || "Link"}</span>
                </Link>
              </li>
            ))}

            {/* fallback if no usefulLinks */}
            {!usefulLinks?.items?.length && (
              <>
                <li className="flex items-center gap-3 sm:gap-4 cursor-pointer group hover:text-[#fef5f0] transition-colors">
                  <Link to="/terms-and-conditions" className="flex space-x-2">
                    <ChevronRight
                      size={14}
                      sm:size-16
                      lg:size-18
                      className="group-hover:text-[#b44a84] transition-colors"
                    />
                    <span>Terms & Conditions</span>
                  </Link>
                </li>
                <li className="flex items-center gap-3 sm:gap-4 cursor-pointer group hover:text-[#fef5f0] transition-colors">
                  <Link to="/privacy-policy" className="flex space-x-2">
                    <ChevronRight
                      size={14}
                      sm:size-16
                      lg:size-18
                      className="group-hover:text-[#b44a84] transition-colors"
                    />
                    <span>Privacy Policy</span>
                  </Link>
                </li>
                <li className="flex items-center gap-3 sm:gap-4 cursor-pointer group hover:text-[#fef5f0] transition-colors">
                  <Link to="/contact-us" className="flex space-x-2">
                    <ChevronRight
                      size={14}
                      sm:size-16
                      lg:size-18
                      className="group-hover:text-[#b44a84] transition-colors"
                    />
                    <span>Support</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-[#fef5f0] font-extrabold mb-4 sm:mb-5 lg:mb-6 text-base sm:text-lg md:text-xl tracking-wide">
            SUBSCRIBE TO OUR NEWSLETTER
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-4 sm:mb-5 lg:mb-6 leading-relaxed">
            Sign up for my newsletter to get latest updates. Do not worry, we
            will never spam you.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-800 border border-gray-700 text-xs sm:text-sm md:text-base text-[#fef5f0] placeholder-gray-500 focus:outline-none focus:border-[#b44a84] transition-colors"
            />
            <button className="bg-[#b44a84] px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 flex items-center justify-center hover:bg-pink-700 transition-colors">
              <Send size={14} sm:size-16 lg:size-18 className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="max-w-full sm:max-w-5xl lg:max-w-7xl mx-auto mt-6 sm:mt-8 lg:mt-12 pt-6 sm:pt-8 border-t border-gray-800 text-center text-xs sm:text-sm md:text-base text-gray-500"
        dangerouslySetInnerHTML={{
          __html:
            copyright || "© 2025 humanhireprototype. All rights reserved.",
        }}
      />
    </footer>
  );
};

export default Footer;
