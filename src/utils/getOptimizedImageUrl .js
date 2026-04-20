

const getOptimizedImageUrl = (url) => {
  if (!url) return "";

  
  if (!url.includes("/upload/")) return url;

  
  if (url.includes("q_auto") || url.includes("f_auto")) {
    return url;
  }


  return url.replace(
    "/upload/",
    "/upload/f_auto,q_auto:best,w_720/"
  );
};

export default getOptimizedImageUrl;
