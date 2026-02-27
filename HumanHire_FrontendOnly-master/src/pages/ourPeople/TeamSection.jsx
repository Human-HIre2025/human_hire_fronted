import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import teamMemberService from "../../services/teamMemberServices";
import getOptimizedImageUrl from "../../utils/getOptimizedImageUrl ";

const TeamMember = ({ role, image }) => {
  return (
    <div className="flex flex-col items-center min-w-[150px] mx-4">
      <img
        src={getOptimizedImageUrl(image)}
        alt={role}
        className="w-32 h-32 rounded-full mb-2 object-cover transition-transform duration-300 hover:scale-110"
      />
      <p className="text-[#fef5f0] text-base font-extrabold">{role}</p>
    </div>
  );
};

const TeamSection = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  // Fetch featured team members from the service
  useEffect(() => {
    const fetchFeaturedTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await teamMemberService.getTeamMembers();
        // Ensure response.data is an array and map to expected format
        const teamArray = Array.isArray(response.data)
          ? response.data.map(item => ({
              role: item.role || item.position || item.authorPosition,
              image: item.image || item.imageUrl || item.authorImg
            }))
          : [];
        setTeam(teamArray);
      } catch (err) {
        setError(err.message || 'Failed to load featured team members');
        setTeam([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTeamMembers();
  }, []);

  // GSAP animation for infinite carousel
  useEffect(() => {
    if (team.length === 0 || !containerRef.current) return;

    const container = containerRef.current;
    const totalWidth = container.scrollWidth / 2; // width of one set
    gsap.set(container, { x: 0 });

    const animation = gsap.to(container, {
      x: -totalWidth,
      ease: "none",
      duration: 30, // speed of the carousel - increase duration to slow down
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, [team]);

  // Render loading state
  if (loading) {
    return (
      <div className="bg-[#3d3b3d] p-8 overflow-hidden">
        <div className="flex justify-center items-center">
          <p className="text-[#fef5f0]">Loading team members...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-[#3d3b3d] p-8 overflow-hidden">
        <div className="flex justify-center items-center">
          <p className="text-[#fef5f0]">Error: {error}</p>
        </div>
      </div>
    );
  }

  // Render empty state
  if (team.length === 0) {
    return (
      <div className="bg-[#3d3b3d] p-8 overflow-hidden">
        <div className="flex justify-center items-center">
          <p className="text-[#fef5f0]">No team members available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#3d3b3d] p-8 overflow-hidden">
      <div
        ref={containerRef}
        className="flex w-max"
        style={{ whiteSpace: "nowrap" }}
      >
        {/* Render the team twice for seamless infinite scroll */}
        {team.map((member, index) => (
          <TeamMember key={index} role={member.role} image={member.image} />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;