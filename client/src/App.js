import "./App.css";
import "react-photo-view/dist/react-photo-view.css";
import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLogin,
  dispatchGetUser,
  fetchUser,
} from "./redux/actions/authAction";
import HomePage from "./pages/HomePage/Homepage";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Commercial from "./pages/Commercial/PatternOne";
import GraphicDesign from "./pages/GraphucDesign/GraphicDesign";
import Product from "./pages/Product/Product";
import Space from "./pages/Space/Space.js";

import Activity from "./pages/Activity/Activity";
import NotFound from "./utils/NotFound/NotFound";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;

  /*來自不同域的 XMLHttpRequest 無法為其自己的域設置 cookie 值，除非在發出請求之前將 withCredentials 設置為 true。*/
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post(
          "http://localhost:8080/user/refresh_token",
          null,
          { withCredentials: true }
        );
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  //根據token 的值判定user是否為admin
  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin(dispatchLogin()));
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [dispatch, token]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/profile" element={<About />} /> */}
          <Route
            path="/user/forgot_password"
            element={isLogged ? <NotFound /> : <ForgetPassword />}
          />
          <Route
            path="/user/login"
            element={isLogged ? <NotFound /> : <Login />}
          />
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/graphicDesign" element={<GraphicDesign />} />
          <Route path="/product" element={<Product />} />
          <Route path="/space" element={<Space />} />
          <Route path="/activity" element={<Activity />} />

          <Route
            path="/user/reset/:token"
            element={isLogged ? <NotFound /> : <ResetPassword />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
