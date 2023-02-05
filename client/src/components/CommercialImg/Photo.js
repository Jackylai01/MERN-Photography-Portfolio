import "./photoTwo.css";
import { PhotoView } from "react-photo-view";
import { useSelector } from "react-redux";
import axios from "axios";

const FetchUrl = "http://localhost:8080/";

export const Photo = ({ item }) => {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isAdmin } = auth;

  let CommercialdeletedData = {
    cloudinary_id: item.slice(62, 82),
    avatar: item,
  };

  const handleDeleted = async () => {
    try {
      const res = await axios.post(
        `${FetchUrl}commercial/destroy`,
        CommercialdeletedData,
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
          <PhotoView key={item} src={item}>
            <img src={item} alt="" key={item} className="height" />
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
