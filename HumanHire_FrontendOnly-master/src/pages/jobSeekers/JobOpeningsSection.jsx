import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  X,
  User,
  Mail,
  Phone,
  MapIcon,
  Briefcase,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import jobApplicationService from "../../services/jobApplicationService";

gsap.registerPlugin(ScrollTrigger);

const JobApplicationModal = ({ isOpen, onClose, jobId, jobTitle }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profession: "",
    experience: "",
    currentCTC: "",
    expectedCTC: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const applicationData = {
        jobId,
        candidateDetails: formData,
      };

      await jobApplicationService.createJobApplication(applicationData);
      setSubmitMessage("Application submitted successfully!");

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          profession: "",
          experience: "",
          currentCTC: "",
          expectedCTC: "",
        });
        setSubmitMessage("");
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitMessage(
        error.message || "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#15171e] rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white truncate max-w-[80%]">
            Apply for {jobTitle}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                label: "Full Name",
                name: "name",
                Icon: User,
                type: "text",
                required: true,
              },
              {
                label: "Email",
                name: "email",
                Icon: Mail,
                type: "email",
                required: true,
              },
              {
                label: "Phone",
                name: "phone",
                Icon: Phone,
                type: "tel",
                required: true,
              },
              {
                label: "Profession",
                name: "profession",
                Icon: Briefcase,
                type: "text",
                required: true,
              },
              {
                label: "Experience",
                name: "experience",
                Icon: TrendingUp,
                type: "text",
                placeholder: "e.g., 2 years",
                required: true,
              },
              {
                label: "Current CTC",
                name: "currentCTC",
                Icon: DollarSign,
                type: "text",
                placeholder: "e.g., 50K",
                required: true,
              },
            ].map(({ label, name, Icon, type, placeholder, required }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-1"
                >
                  <Icon className="w-4 h-4" />
                  {label} {required && "*"}
                </label>
                <input
                  id={name}
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  required={required}
                  placeholder={placeholder || ""}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#a64d79] focus:border-transparent"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <label
                htmlFor="expectedCTC"
                className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-1"
              >
                <DollarSign className="w-4 h-4" />
                Expected CTC *
              </label>
              <input
                id="expectedCTC"
                type="text"
                name="expectedCTC"
                value={formData.expectedCTC}
                onChange={handleInputChange}
                required
                placeholder="e.g., 60K"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#a64d79] focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-1"
              >
                <MapIcon className="w-4 h-4" />
                Address *
              </label>
              <input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#a64d79] focus:border-transparent"
              />
            </div>
          </div>

          {submitMessage && (
            <div
              className={`p-3 rounded-md ${
                submitMessage.includes("successfully")
                  ? "bg-green-900/50 text-green-400"
                  : "bg-red-900/50 text-red-400"
              }`}
            >
              {submitMessage}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-[#a64d79] text-white rounded-md hover:bg-[#8a4067] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const JobCard = ({ job, onApply }) => (
  <div className="bg-[#15171e] p-6 h-[350px] flex flex-col justify-between text-left border-t-4 border-gray-600 hover:border-[#a64d79] transition-all duration-300 rounded-md shadow-md">
    <h3 className="text-xl font-semibold text-white mb-3 truncate">
      {job.title}
    </h3>
    <div className="flex items-center mb-3">
      <MapPin className="text-[#a64d79] mr-2 w-5 h-5 flex-shrink-0" />
      <p className="text-gray-400 text-sm truncate">LOCATION: {job.location}</p>
    </div>
    <p className="text-gray-300 text-sm mb-4 line-clamp-5">{job.description}</p>
    <button
      onClick={() => onApply(job)}
      className="text-white text-sm font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#a64d79] focus:ring-opacity-50 transition-all duration-300 text-left"
    >
      JOB DETAILS & APPLY →
    </button>
  </div>
);

const JobOpeningsSection = () => {
  const cardRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await jobApplicationService.getJobs();
        if (response.success) {
          setJobs(response.data);
        } else {
          setError("Failed to fetch jobs");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let scrollTriggerInstance = null;

    if (jobs.length > 0 && cardRef.current) {
      const animation = gsap.fromTo(
        cardRef.current.children,
        { scale: 0.75, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "back.out(1.4)",
          stagger: 0.4,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      scrollTriggerInstance = animation.scrollTrigger;
    }

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [jobs]);

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="relative sm:px-0">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden flex justify-center items-center">
        <div
          className="fixed inset-0 w-full h-full bg-center bg-cover -z-10 job-bg"
          style={{
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="wrapper text-white z-10 text-center px-4 sm:px-0 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 leading-tight">
            Current Job Opening
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mt-4 leading-relaxed">
            Your next career breakthrough is just a click away browse our
            up-to-date job listings today. Let us help you find a position where
            your talents can truly shine and make a difference.
          </p>
        </div>
      </div>

      {/* Job Cards */}
      <div
        ref={cardRef}
        className="w-full bg-black flex justify-center items-center py-16 px-4 sm:px-6"
      >
        <div className="wrapper max-w-6xl mx-auto -mt-40 w-full">
          {loading ? (
            <div className="text-center text-white">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#a64d79] mx-auto"></div>
              <p className="mt-4">Loading job openings...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-400">
              <p>Error: {error}</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No job openings available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {jobs.slice(0, 4).map((job) => (
                <JobCard key={job._id} job={job} onApply={handleApply} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        jobId={selectedJob?._id}
        jobTitle={selectedJob?.title}
      />
    </div>
  );
};

export default JobOpeningsSection;
