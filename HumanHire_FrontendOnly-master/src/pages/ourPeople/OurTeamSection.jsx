import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import teamMemberService from "../../services/teamMemberServices";
import getOptimizedImageUrl from "../../utils/getOptimizedImageUrl ";

// Single Team Member Component
const TeamMember = ({ name, role, image }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;

    const onEnter = () => {
      gsap.to(el, {
        borderRadius: "0px",
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        borderRadius: "50%",
        duration: 0.5,
        ease: "power2.out",
      });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="flex flex-col items-center px-4">
      <div
        ref={wrapperRef}
        className="w-40 h-40 mb-2 overflow-hidden border-[1px] border-white/90"
        style={{ borderRadius: "50%" }}
      >
        <img src={getOptimizedImageUrl(image)} alt={name} className="w-full h-full object-cover"  />
      </div>
      <p className="text-[#fef5f0] text-lg font-extrabold">{name}</p>
      <p className="text-gray-400 text-sm">{role}</p>
    </div>
  );
};

// Main Team Section Component
const OurTeamSection = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team members
  useEffect(() => {
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await teamMemberService.getTeamMembers();

      const teamArray = Array.isArray(response.data)
        ? response.data
            .filter((item) => !item.isFeatured) // ⛔️ Exclude featured members
            .map((item) => ({
              name: item.name || item.memberName,
              role: item.role || item.position,
              image: item.image || item.imageUrl,
            }))
        : [];

      setTeam(teamArray);
    } catch (err) {
      setError(err.message || "Failed to load team members");
      setTeam([]);
    } finally {
      setLoading(false);
    }
  };

  fetchTeamMembers();
}, []);


  const renderHeading = () => (
    <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
      <span className="text-[#fef5f0]">OUR </span>
      <span
        className="text-transparent"
        style={{
          WebkitTextStroke: "2px #984770",
          textStroke: "2px #984770",
        }}
      >
        TEAM
      </span>
    </h2>
  );

  if (loading) {
    return (
      <div className="bg-black py-20 w-full">
        {renderHeading()}
        <div className="flex justify-center items-center max-w-6xl mx-auto">
          <p className="text-[#fef5f0]">Loading team members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black py-20 w-full">
        {renderHeading()}
        <div className="flex justify-center items-center max-w-6xl mx-auto">
          <p className="text-[#fef5f0]">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (team.length === 0) {
    return (
      <div className="bg-black py-20 w-full">
        {renderHeading()}
        <div className="flex justify-center items-center max-w-6xl mx-auto">
          <p className="text-[#fef5f0]">No team members available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black py-20 w-full">
      {renderHeading()}

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeamSection;
