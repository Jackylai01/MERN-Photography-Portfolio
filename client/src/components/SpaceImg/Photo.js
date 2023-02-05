import "./photoTwo.css";
import { PhotoView } from "react-photo-view";
import { useSelector } from "react-redux";
import axios from "axios";

const FetchUrl = "http://localhost:8080/";

export const Photo = ({ space }) => {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isAdmin } = auth;

  let SpacedeletedData = {
    cloudinary_id: space.slice(62, 82),
    avatar: space,
  };

  const handleDeleted = async () => {
    try {
      const res = await axios.post(
        `${FetchUrl}space/destroy`,
        SpacedeletedData,
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
          <PhotoView key={space} src={space}>
            <img src={space} alt="" key={space} className="height" />
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
