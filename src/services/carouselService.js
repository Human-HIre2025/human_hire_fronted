// services/carouselService.js
import api from './apiBackend'; // import your axios instance from api.js



// type :["team" , "event"]
const getCarouselImagesByType = async (type) => {
  const response = await api.get(`/carousel/type/${type}`);
  return response.data.data;
};

export default {
  getCarouselImagesByType,
};
