import React from "react";
import "../../styles/preloader.css";

export default function Preloader({ visible, animationKey }) {
  return (
    <div
      key={animationKey}
      className={`preloader-container ${!visible ? "fade-out" : ""}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="preloader-text-wrapper">
        <div className="preloader-text" aria-hidden="true">
          HUMAN HIRE
        </div>

        <p className="preloader-subtext" aria-hidden="true">
          Staffing & Recruitment
        </p>
      </div>
    </div>
  );
}
