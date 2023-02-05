import "./login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { dispatchLogin } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

const Login = () => {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://photography-portfolio-eryj.onrender.com/user/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUser({ ...user, err: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      navigate("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      <div className="container">
        <form className="wrapper" onSubmit={handleSubmit}>
          <h1>Admin Dashboard</h1>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}

          <input
            placeholder="enter email"
            type="text"
            name="email"
            id="email"
            value={email}
            className="input"
            onChange={handleChangeInput}
          />

          <input
            placeholder="enter password"
            value={password}
            id="password"
            name="password"
            type="password"
            className="input"
            onChange={handleChangeInput}
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <Link to="/user/forgot_password" className="forgotPassword">
            Forgot your password
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
