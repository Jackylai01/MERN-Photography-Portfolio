import React, { useState, useEffect } from "react";
import SpaceImg from "../../components/SpaceImg/Photo";
import { showErrMsg } from "../../utils/notification/Notification";
import { PhotoProvider } from "react-photo-view";
import { useSelector } from "react-redux";
import axios from "axios";
import "./space.css";

const FetchUrl = "https://photography-portfolio-eryj.onrender.com/space/";

const Space = () => {
  const [, setImageSrc] = useState([]);
  const [, setUploadData] = useState([]);
  const [, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState([]);

  const [error, setError] = useState(null);
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { isAdmin } = auth;

  function handelonChange(e) {
    const reader = new FileReader();

    reader.onload = function (e) {
      setImageSrc(e.target.result);
      setUploadData(undefined);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  //多圖上傳
  async function uploadPhoto(e) {
    setLoading(true);
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "image"
    );

    const formData = new FormData();

    for (const image of fileInput.files) {
      formData.append("file", image);
    }
    formData.append("upload_preset", "my-uploads");
    try {
      await axios.post(FetchUrl + "newPost", formData, {
        headers: {
          Authorization: token,
        },
      });
      setLoading(false);
      window.location.reload();
    } catch (err) {
      setError(err.response.data.msg);
    }
  }

  //全部刪除
  async function handleAlldelete() {
    if (window.confirm("確定要全部刪除?")) {
      await axios.delete(`${FetchUrl}deleteSpace`, {
        headers: {
          Authorization: token,
        },
      });
      window.alert("刪除成功");
      window.location.reload();
    }
  }

  //載入路由即GET USL 網址的資料
  useEffect(() => {
    const fetchPhoto = async () => {
      const res = await axios.get(`${FetchUrl}getSpace`);
      setData(res.data);

      let newData = [];
      for (let i = 0; i < res.data.length; i++) {
        let data = res.data[i].avatar;
        for (let j = 0; j < data.length; j++) {
          let allData = data[j];
          newData.push(allData);
        }
      }
      setPhoto(newData);
    };
    fetchPhoto();
  }, []);

  return (
    <>
      <div className="patternContainer">
        {error && showErrMsg(error)}
        {isAdmin && (
          <>
            <form
              className="commercialContainer"
              method="POST"
              onSubmit={uploadPhoto}
            >
              <input
                type="file"
                name="image"
                className="upload"
                accept="image/* capture"
                multiple
                onChange={handelonChange}
              />
              <button type="submit" className="SubmitPhoto">
                Update
              </button>
              <button className="SubmitPhoto" onClick={handleAlldelete}>
                All Delete
              </button>
              {loading && <h3>Loading.....</h3>}
            </form>
          </>
        )}
      </div>
      <div className="gridcontainer">
        <PhotoProvider
          speed={() => 800}
          easing={(type) =>
            type === 2
              ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
              : "cubic-bezier(0.34, 1.56, 0.64, 1)"
          }
          maskOpacity={0.5}
        >
          {photo.map((space) => (
            <React.Fragment key={space}>
              <SpaceImg space={space} />
            </React.Fragment>
          ))}
        </PhotoProvider>
      </div>
    </>
  );
};

export default Space;
