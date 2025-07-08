import React, { useState, useEffect } from "react";
import "./disclaimer.css"

const EducationalDisclaimer = ({ onAccept }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem("hasSeenEducationalDisclaimer");
    if (!hasSeenDisclaimer) {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("hasSeenEducationalDisclaimer", "true");
    setShowPopup(false);
    if (onAccept) onAccept();
  };

  const handleDecline = () => {
    window.location.href = "https://github.com/MudassirAlam7/MoviesApp.git";
  };

  if (!showPopup) return null;

  return (
      <div className="overlay">
        <div className="popup">
          <h2>Notice</h2>
          <p><strong>This site is a Netflix clone created for educational purposes only.</strong></p>
          <ul>
            <li>Not affiliated with Netflix or any real streaming service.</li>
            <li>No real user data is collected or stored.</li>
            <li>Created for learning and portfolio demonstration.</li>
          </ul>
          <p style={{ fontSize: "12px", color: "#666" }}>
            By continuing, you confirm you understand this is a demo project.
          </p>
          <div className="buttons">
            <button onClick={handleDecline} className="btn cancel">View Code</button>
            <button onClick={handleAccept} className="btn accept">Continue</button>
          </div>
        </div>
      </div>
  );
};

export default EducationalDisclaimer;
