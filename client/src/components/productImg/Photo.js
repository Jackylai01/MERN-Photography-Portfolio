import "./photoTwo.css";
import { PhotoView } from "react-photo-view";
import { useSelector } from "react-redux";
import axios from "axios";

const FetchUrl = "https://photography-portfolio-eryj.onrender.com/";

export const Photo = ({ product }) => {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isAdmin } = auth;

  let ProductdeletedData = {
    cloudinary_id: product.slice(62, 82),
    avatar: product,
  };

  const handleDeleted = async () => {
    try {
      const res = await axios.post(
        `${FetchUrl}product/destroy`,
        ProductdeletedData,
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
        <div>
          <PhotoView key={product} src={product}>
            <img src={product} alt="" key={product} className="height" />
          </PhotoView>

          {isAdmin && (
            <i className="fa-solid fa-trash trash" onClick={handleDeleted}></i>
          )}
        </div>
      </div>
    </>
  );
};

export default Photo;
