import "./link.css";
import { Link } from "react-router-dom";

const LinkPhoto = () => {
  return (
    <>
      <div className="boxLink">
        <div className="linkItem">
          <Link to="/space">
            <img
              src="https://res.cloudinary.com/dqawkwte9/image/upload/v1675627103/LOGO/qn1uo9y1w2p5p3ojbsf0.jpg"
              alt=""
              className="photoLink"
            />
          </Link>
          <h1 className="text">空間攝影</h1>
        </div>
        <div className="linkItem">
          <Link to="/commercial">
            <img
              src="https://res.cloudinary.com/dqawkwte9/image/upload/v1675627232/LOGO/hqqx5tdlnqyqbotho0g0.jpg"
              alt=""
              className="photoLink"
            />
          </Link>
          <h1 className="text">商業攝影</h1>
        </div>
        <div className="linkItem">
          <Link to="/graphicDesign">
            <img
              src="https://res.cloudinary.com/dqawkwte9/image/upload/v1675627395/LOGO/ao8ma57lgddctdg1uong.jpg"
              alt=""
              className="photoLink"
            />
          </Link>

          <h1 className="text">平面設計</h1>
        </div>
        <div className="linkItem">
          <Link to="/product">
            <img
              src="https://res.cloudinary.com/dqawkwte9/image/upload/v1675628195/LOGO/ssi3nwau4rvew3v8awbh.jpg"
              alt=""
              className="photoLink"
            />
          </Link>
          <h1 className="text">商品攝影</h1>
        </div>
        <div className="linkItem">
          <Link to="/activity">
            <img
              src="https://res.cloudinary.com/dqawkwte9/image/upload/v1675627311/LOGO/ywnlixw65xvbc3hf9blq.jpg"
              alt=""
              className="photoLink"
            />
          </Link>
          <h1 className="text">活動攝影</h1>
        </div>
        <div className="linkItem">
          <Link to="/profile">
            <img
              src="https://res.cloudinary.com/dqawkwte9/image/upload/v1675627449/LOGO/dquwe02kelroqnfkddda.jpg"
              alt=""
              className="photoLink"
            />
          </Link>
          <h1 className="text">個人簡介</h1>
        </div>
      </div>
    </>
  );
};

export default LinkPhoto;
