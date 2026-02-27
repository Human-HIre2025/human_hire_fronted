import api from "./apiBackend"; // your axios instance or fetch wrapper

// Create a new job application (public)
const createJobApplication = async (jobApplicationData) => {
  // jobApplicationData = { jobId: string, candidateDetails: { ... } }
  try {
    const response = await api.post("/job-applications", jobApplicationData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to create job application" }
    );
  }
};
const getJobs = async () => {
  try {
    const response = await api.get("/jobs");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch jobs" };
  }
};

export default {
  createJobApplication, // Public
  getJobs, // Public
  // Admin only
};
