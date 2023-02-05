import React from "react";
import "./photoTwo.css";
import { useSelector } from "react-redux";
import { PhotoView } from "react-photo-view";
import axios from "axios";

const FetchUrl = "http://localhost:8080/";

const Photo = ({ graphic }) => {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isAdmin } = auth;

  let GraphicdeletedData = {
    cloudinary_id: graphic.slice(62, 82),
    avatar: graphic,
  };

  const handleDeleted = async () => {
    try {
      const res = await axios.post(
        `${FetchUrl}graphicDesign/destroy`,
        GraphicdeletedData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      window.alert("刪除成功");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="gridcontainer">
        <PhotoView src={graphic} key={graphic}>
          <img src={graphic} alt="" key={graphic} />
        </PhotoView>
        {isAdmin && (
          <i className="fa-solid fa-trash trash" onClick={handleDeleted}></i>
        )}
      </div>
    </>
  );
};

export default Photo;
