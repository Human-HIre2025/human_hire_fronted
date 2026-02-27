import { useEffect } from "react";
import faviconsService from "../services/faviconsService";
import defaultFavicon from "../assets/logos/favicon-32.png";

export default function FaviconLoader() {
  useEffect(() => {
    const setFavicon = (url) => {
      let link =
        document.querySelector("link[rel='icon']") ||
        document.createElement("link");

      link.rel = "icon";
      link.type = "image/png";
      link.href = url;

      document.head.appendChild(link);
    };

    const loadFavicon = async () => {
      try {
        const response = await faviconsService.getFavicons();
        setFavicon(response?.data?.feviconLogo || defaultFavicon);
      } catch {
        setFavicon(defaultFavicon);
      }
    };

    loadFavicon();
  }, []);

  return null;
}
