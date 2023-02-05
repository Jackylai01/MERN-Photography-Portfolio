import React from "react";
import "./mainPhoto.css";

const mainPhoto = () => {
  const handleOpenId = () => {
    window.open("https://www.instagram.com/jacky_lai__/", " _self");
  };

  return (
    <>
      <div className="MainPhotowrap">
        <div className="item" onClick={handleOpenId}>
          <img
            src="https://res.cloudinary.com/dqawkwte9/image/upload/v1675627316/LOGO/opdxfvttdccmt1tvimod.jpg"
            alt=""
          />
          <div className="content">
            <h2>Instagram</h2>
            <p>更多作品在IG</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default mainPhoto;
