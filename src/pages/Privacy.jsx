import React, { useEffect } from "react";
import { useState } from "react";
import privacyService from "../services/privacyService";
import Loader from "../components/UI/Loader";

const Privacy = () => {
  const [privacy, setPrivacy] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const response = await privacyService.getPrivacy();
        console.log("response", response);
        if (!response.success) {
          throw new Error("Failed to fetch privacy & conditions");
        }
        setPrivacy(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacy();
  }, []);
  return (
    <div className="bg-black min-h-screen text-white pt-20">
      {loading ? (
        <Loader />
      ) : (
        <div className="wraper  max-w-7xl mx-auto px-4 py-8">
          <div className="text-3xl mb-10">{privacy.heading}</div>
          <div dangerouslySetInnerHTML={{ __html: privacy.content }}></div>
        </div>
      )}
    </div>
  );
};

export default Privacy;
