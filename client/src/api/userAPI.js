import axios from "axios";

export const dispatchLogin = () => {
  return {
    type: "LOGIN",
  };
};

//登入
export const UserLogin = async (email, password) => {
  const res = await axios.get("/user/login", email, password, {
    withCredentials: true,
  });
  return res.data;
};

//忘記密碼
export const forgotPassword = async (email) => {
  const res = await axios.post("/user/forgot", email);
  return res.data;
};

//重設密碼
export const resetPassword = async (password) => {
  const res = await axios.post("/user/reset", password);
  return res.data;
};

export const refreshToken = async () => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    const res = await axios.post("/user/refresh_toke", null, {
      withCredentials: true,
    });
    return res.data;
  }
};

export const dispatchGetUser = (res) => {
  return {
    type: "GET_USER",
    payload: {
      user: res.data,
      isAdmin: res.data.role === 1 ? true : false,
    },
  };
};
