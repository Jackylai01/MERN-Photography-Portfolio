import React, { useState, useEffect } from "react";
import "./about.css";
import { useSelector } from "react-redux";
import { showErrMsg } from "../../utils/notification/Notification";
import axios from "axios";

const FetchUrl = "https://photography-portfolio-eryj.onrender.com/profile/";
const About = () => {
  const [description, setDescription] = useState("");
  const [skill, setskill] = useState("");
  const [id, setId] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { isAdmin } = auth;

  //獲得相片
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(FetchUrl + "getProfile");
      setskill(data.data[0].skill);
      setDescription(data.data[0].description);
      setId(data.data[0]._id);
      setAvatar(data.data[0].avatar);
    };

    fetchData();
  }, []);

  //替換照片
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (file) {
      const data = new FormData();
      data.append("image", file);
      data.append("description", description);
      data.append("skill", skill);
      console.log(data);
      try {
        await axios.put(`${FetchUrl}updateProfile/${id}`, data, {
          headers: {
            Authorization: token,
          },
        });

        setLoading(false);
        window.location.reload();
      } catch (err) {
        setError(err.response.data.msg);
      }
    } else {
      setError("請上傳檔案");
    }
  };

  return (
    <>
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      {error && showErrMsg(error)}

      <form className="aboutContainer" onSubmit={handleSubmit}>
        <main className="mainImg">
          {isAdmin && isAdmin ? (
            <>
              <label htmlFor="fileInput">
                <i className="writeIcon fas fa-plus"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                name="image"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button className="writeSubmit">update</button>
            </>
          ) : (
            ""
          )}
          <img src={avatar} alt="" />
          {loading && <h3>Loading.....</h3>}
        </main>
        <section className="rightAboutme">
          <h1>個人簡介</h1>
          <br />
          {isAdmin && isAdmin ? (
            <input
              type="text"
              placeholder="請輸入技能"
              className="writeInput"
              autoFocus={true}
              onChange={(e) => setskill(e.target.value)}
            />
          ) : (
            ""
          )}

          <p>{skill}</p>
          <p className="description">{description}</p>
          {isAdmin && isAdmin ? (
            <div className="writeFormGroup">
              <textarea
                placeholder="請輸入個人簡介的描述..."
                type="text"
                className="writeInput writeText"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          ) : (
            ""
          )}
        </section>
      </form>
    </>
  );
};

export default About;
