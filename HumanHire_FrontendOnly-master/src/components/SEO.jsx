import React, { useEffect } from 'react';

const DEFAULT_OG_IMAGE = "https://res.cloudinary.com/daqbrkrj0/image/upload/f_auto,q_auto:best,w_720/v1753959864/uploads/8a08b38d-da3c-400a-9660-c1ae927a2ba1.png";

const setMetaTag = (attr, key, value) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
};

const SEO = ({ title, description, canonical, ogImage }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
      setMetaTag('property', 'og:title', title);
      setMetaTag('name', 'twitter:title', title);
    }

    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
      setMetaTag('name', 'twitter:description', description);
    }

    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
      setMetaTag('property', 'og:url', canonical);
    }

    const image = ogImage || DEFAULT_OG_IMAGE;
    setMetaTag('property', 'og:image', image);
    setMetaTag('name', 'twitter:image', image);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('property', 'og:type', 'website');

  }, [title, description, canonical, ogImage]);

  return null;
};

export default SEO;
