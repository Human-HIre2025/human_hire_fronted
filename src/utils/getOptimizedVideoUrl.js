const getOptimizedVideoUrl = (url) => {
    if (!url || !url.includes('/video/upload/')) return url;
    if (url.includes('/upload/w_')) return url;
    return url.replace('/upload/', '/upload/w_800,vc_auto,q_auto:eco,f_auto/');
  };

export default getOptimizedVideoUrl;