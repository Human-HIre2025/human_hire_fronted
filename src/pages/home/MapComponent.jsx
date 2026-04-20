import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  Annotation
} from "react-simple-maps";

// Data remains exactly as provided
const markets = [
  { 
    name: "North America", 
    iso: "USA", 
    coor: [-100, 38], 
    offset: [-30, -25],
    offices: ["Office in Delaware"] 
  },
  { 
    name: "Europe", 
    iso: "GBR", 
    coor: [-2, 54], 
    offset: [-10, -30],
    offices: ["Office in London"] 
  },
  { 
    name: "India", 
    iso: "IND", 
    coor: [78, 21], 
    offset: [-10, 30],
    offices: ["Office in Delhi, Jaipur,", "Pune, Kolkata, Chennai"] 
  },
  { 
    name: "Malaysia", 
    iso: "MYS", 
    coor: [101, 4], 
    offset: [30, 30],
    offices: ["Office in Kuala Lumpur"] 
  },
  { 
    name: "Philippines", 
    iso: "PHL", 
    coor: [121, 13], 
    offset: [40, -20],
    offices: ["Office in Cebu City"] 
  },
];

const highlightedISO = markets.map(m => m.iso);

const MapChart = () => {
  // State to handle mobile responsiveness
  const [isMobile, setIsMobile] = useState(false);
  
  // Set default position: Center adjusted for mobile [0, 20] vs Desktop [20, 10]
  const [position, setPosition] = useState({ coordinates: [10, 20], zoom: 1 });
  const [hoveredISO, setHoveredISO] = useState(null);
  const [activeISO, setActiveISO] = useState(null); 

  // Check window width on mount and resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Adjust default zoom and center when switching devices
      setPosition({
        coordinates: mobile ? [10, 30] : [20, 10],
        zoom: 1
      });
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleZoomIn = () => setPosition((pos) => ({ ...pos, zoom: Math.min(pos.zoom * 1.5, 8) }));
  const handleZoomOut = () => setPosition((pos) => ({ ...pos, zoom: Math.max(pos.zoom / 1.5, 1) }));

  const handleRegionClick = (iso, e) => {
    e.stopPropagation(); 
    setActiveISO(activeISO === iso ? null : iso); 
  };

  return (
    <div 
      className="w-full min-h-screen bg-black flex flex-col items-center justify-start md:justify-center p-4 font-sans select-none"
      onClick={() => setActiveISO(null)} 
    >
      {/* Header Section */}
      <div className="text-center mt-10 mb-5 md:mb-10">
        <h2 className="text-white text-2xl md:text-5xl font-bold px-4">
          We operate in <span className="text-[#ff0055]">5 Major Markets</span>
        </h2>
      </div>

      {/* Map Container - Height adjusted for mobile to show full map */}
      <div className="relative w-full max-w-[1400px] h-[50vh] md:h-[85vh] overflow-hidden">
        <ComposableMap
          // Scale is reduced on mobile (90) to fit the whole world, Desktop remains (210)
          projectionConfig={{ 
            scale: isMobile ? 95 : 210,
            center: [0, 0] 
          }}
          className="w-full h-full"
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={setPosition}
            // Disable scroll zoom on mobile to prevent getting stuck while scrolling the page
            filterZoomEvent={(e) => e.type !== "wheel" && e.type !== "touchstart"}
          >
            <Geographies geography="/features.json">
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoId = geo.id || geo.properties.ISO_A3;
                  const isHighlighted = highlightedISO.includes(geoId);
                  const isHovered = hoveredISO === geoId || activeISO === geoId;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => isHighlighted && setHoveredISO(geoId)}
                      onMouseLeave={() => setHoveredISO(null)}
                      onClick={(e) => {
                        if (isHighlighted) handleRegionClick(geoId, e);
                      }}
                      fill={
                        isHovered
                          ? "#ff0055"
                          : isHighlighted
                            ? "#444444"
                            : "#2d2d2d"
                      }
                      stroke="#1a1a1a"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none", transition: "fill 0.3s ease" },
                        hover: {
                          fill: isHighlighted ? "#ff0055" : "#333",
                          outline: "none",
                          cursor: isHighlighted ? "pointer" : "default"
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {markets.map((m) => {
              const isHovered = hoveredISO === m.iso;
              const isActive = activeISO === m.iso;
              const isInteracted = isHovered || isActive;

              const dropdownHeight = m.offices.length * 20 + 20; 

              return (
                <React.Fragment key={m.name}>
                  <Annotation
                    subject={m.coor}
                    // Slightly reduce offset on mobile for better spacing
                    dx={isMobile ? m.offset[0] * 0.7 : m.offset[0]}
                    dy={isMobile ? m.offset[1] * 0.7 : m.offset[1]}
                    connectorProps={{
                      stroke: isInteracted ? "#ff0055" : "#ffffff",
                      strokeWidth: 1,
                      strokeDasharray: "2,2",
                      opacity: 0.6
                    }}
                  >
                    <g
                      onClick={(e) => handleRegionClick(m.iso, e)}
                      onMouseEnter={() => setHoveredISO(m.iso)}
                      onMouseLeave={() => setHoveredISO(null)}
                      style={{ cursor: "pointer" }}
                      // Positioning logic remains the same
                      transform={`translate(${m.offset[0] > 0 ? 5 : - (m.name.length * (isMobile ? 6 : 8) + 35)}, -12)`}
                    >
                      <rect
                        width={m.name.length * (isMobile ? 6 : 8) + 35}
                        height={isMobile ? "22" : "28"}
                        rx="14"
                        fill={isInteracted ? "#ffffff" : "#ff0055"}
                        className="transition-colors duration-300 drop-shadow-lg"
                      />
                      
                      <text
                        x="14"
                        y={isMobile ? 15 : 19}
                        style={{
                          fill: isInteracted ? "#ff0055" : "white",
                          fontSize: isMobile ? "9px" : "12px",
                          fontWeight: "700",
                          pointerEvents: "none"
                        }}
                      >
                        {m.name}
                      </text>

                      {/* Arrow Icon */}
                      <g transform={`translate(${m.name.length * (isMobile ? 6 : 8) + 15}, ${isMobile ? 4 : 7})`}>
                        <circle cx="7" cy="7" r="6" fill={isInteracted ? "#ff0055" : "white"} fillOpacity={isInteracted ? 0.1 : 0.2} />
                        <path
                          d="M6 4.5 L8.5 7 L6 9.5"
                          fill="none"
                          stroke={isInteracted ? "#ff0055" : "white"}
                          strokeWidth="1.5"
                          transform={isActive ? "rotate(180 7 7)" : "rotate(0 7 7)"}
                          style={{ transition: "transform 0.3s ease" }}
                        />
                      </g>

                      {/* Tooltip/Dropdown for Offices */}
                      {isActive && (
                        <g transform={`translate(0, ${isMobile ? 25 : 35})`}>
                          <rect
                            width={isMobile ? 160 : 220}
                            height={dropdownHeight}
                            rx="8"
                            fill="white"
                            stroke="#ff0055"
                            strokeWidth="1"
                            className="drop-shadow-xl"
                          />
                          
                          {m.offices.map((line, index) => (
                            <text
                              key={index}
                              x="12"
                              y={15 + (index * 15)}
                              style={{
                                fill: "#111",
                                fontSize: isMobile ? "9px" : "11px",
                                fontWeight: "500",
                                fontFamily: "sans-serif"
                              }}
                            >
                              {line}
                            </text>
                          ))}
                        </g>
                      )}
                    </g>
                  </Annotation>

                  <Marker coordinates={m.coor}>
                    <circle
                      r={isMobile ? 3 : 4}
                      fill={isInteracted ? "#fff" : "#ff0055"}
                      stroke={isInteracted ? "#ff0055" : "#fff"}
                      strokeWidth={1.5}
                      className="transition-all duration-300"
                    />
                  </Marker>
                </React.Fragment>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {/* Zoom Controls - Slightly smaller on mobile */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-3">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-zinc-800/50 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-[#ff0055] transition-all text-xl md:text-2xl shadow-lg active:scale-95"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-zinc-800/50 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-[#ff0055] transition-all text-xl md:text-2xl shadow-lg active:scale-95"
          >
            −
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapChart;