import React from "react";
import "./photo.css";
import { useSelector } from "react-redux";
import { PhotoView } from "react-photo-view";
import axios from "axios";

const FetchUrl = "http://localhost:8080/";

const Photo = ({ active }) => {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isAdmin } = auth;

  let ActivedeletedData = {
    cloudinary_id: active.slice(62, 82),
    avatar: active,
  };

  const handleDeleted = async () => {
    try {
      await axios.post(`${FetchUrl}activity/destroy`, ActivedeletedData, {
        headers: {
          Authorization: token,
        },
      });
      window.alert("刪除成功");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="gridcontainer">
        <PhotoView src={active} key={active}>
          <img src={active} alt="" key={active} />
        </PhotoView>
        {isAdmin && (
          <i className="fa-solid fa-trash trash" onClick={handleDeleted}></i>
        )}
      </div>
    </>
  );
};

export default Photo;
