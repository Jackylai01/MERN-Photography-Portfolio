import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navogate = useNavigate();
  return <>{navogate("/")}</>;
};

export default NotFound;
