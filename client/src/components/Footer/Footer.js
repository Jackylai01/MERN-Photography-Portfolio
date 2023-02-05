import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="iconCenter">
        <i
          className="fa-brands fa-instagram"
          onClick={() => window.open("https://www.instagram.com/jacky_lai__/")}
        ></i>
        <i
          className="fa-brands fa-facebook"
          onClick={() => window.open("https://www.facebook.com/")}
        ></i>
        <br />
        <b>Copyright © 2023 李秉哲 || 版權申明，網站圖片不可盜用</b>
      </div>
    </div>
  );
};

export default Footer;
