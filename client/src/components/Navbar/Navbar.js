import React from "react";
import "./navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const toggleTrueFalse = () => setToggle(!toggle);
  const showText = toggle ? "fa-solid fa-xmark " : " fa-solid fa-bars ";
  const navbar = toggle ? "navbar active" : "navbar";
  const auth = useSelector((state) => state.auth);

  //確認登入狀態
  const { isLogged } = auth;

  //登出
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/user/logout");
      window.alert("登出成功");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <header>
        <Link className="logo" to="/">
          <img
            src="https://res.cloudinary.com/dqawkwte9/image/upload/v1675625409/LOGO/pef2o888lpran3kxunix.png"
            alt=""
          />
        </Link>
        <nav className={navbar}>
          {/* <li>
            <Link className="link" to="/profile">
              <b>簡介</b>
              <span>Introduction</span>
            </Link>
          </li> */}
          <li>
            <Link className="link" to="/graphicDesign">
              <b>平面設計</b>
              <span>GRAPHIC DESIGN</span>
            </Link>
          </li>
          <li>
            <Link className="link" to="/product">
              <b>商品攝影</b>
              <span>Product</span>
            </Link>
          </li>
          <li>
            <Link className="link" to="/space">
              <b>空間攝影</b>
              <span>Space</span>
            </Link>
          </li>

          <li>
            <Link className="link" to="/commercial">
              <b>商業攝影</b>
              <span>Commercial</span>
            </Link>
          </li>
          <li>
            <Link className="link" to="/activity">
              <b>活動紀錄</b>
              <span>Activity</span>
            </Link>
          </li>

          {isLogged && isLogged ? (
            <>
              <li>
                <Link className="link" to="/" onClick={handleLogout}>
                  <b> 登出系統</b>
                  <span>LOGOUT</span>
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
        </nav>
        <div id="menu-bar" className={showText} onClick={toggleTrueFalse}></div>
      </header>
    </>
  );
};

export default Navbar;
