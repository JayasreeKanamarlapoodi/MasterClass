import React, { useState, useEffect } from "react";
import "../assets/css/inactivitypopup.css"; // Import CSS file

const InactivityPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  let timeout;

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowPopup(true), 1 * 60 * 1000); // 10 minutes
    };

    const handleUserActivity = () => {
      if (!showPopup) {
        resetTimer();
      }
    };

    window.addEventListener("mousemove", handleUserActivity);
    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", handleUserActivity);
    };
  }, [showPopup]);

  const handleContinue = () => {
    setShowPopup(false);
  };

  const handleQuit = () => {
    window.location.href = "https://www.example.com"; // Redirect to home or logout page
  };

  return (
    <>
      {showPopup && (
        <div className="popup-container">
          <div className="popup-card">
            <p>Are you still there?</p>
            <div className="popup-buttons">
              <button onClick={handleContinue} className="continue-btn">Continue</button>
              <button onClick={handleQuit} className="quit-btn">Quit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InactivityPopup;
