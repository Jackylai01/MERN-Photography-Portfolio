import React from "react";
import "./mainPhoto.css";

const mainPhoto = () => {
  return (
    <>
      <div className="mainPhotoContainer">
        <section className="right">
          <img
            src="https://res.cloudinary.com/dqawkwte9/image/upload/v1675628066/LOGO/vav24mxkndotyyftlyxt.jpg"
            alt=""
          />
          <div className="caption">
            <h1>
              Event Photography <span> 活動攝影</span>
            </h1>
            <p>
              婚禮、生日派對還是企業活動、晚會、頒獎典禮和音樂節等大型公眾聚會，活動攝影是捕捉各種重要場合中高品質影像的專業藝術。
              婚禮攝影通常獨立視為一種類型，但婚禮攝影師的技巧也適用其他類型的活動攝影。任何活動攝影的目的，通常是將各種擺好姿勢的照片和抓拍攝影匯集在一起。
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default mainPhoto;
