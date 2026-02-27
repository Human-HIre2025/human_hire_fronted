import api from './apiBackend';

const getTeamMembers = async () => {
  try {
    const response = await api.get('/teams');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch team members' };
  }
};

const getFeaturedTeamMembers = async () => {
  try {
    const response = await api.get('/teams/featured');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch featured team members' };
  }
};


const teamMemberService = {
  getTeamMembers,
  getFeaturedTeamMembers
};

export default teamMemberService;
