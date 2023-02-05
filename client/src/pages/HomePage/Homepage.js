import "./homepage.css";
import Featured from "../../components/Featured/Featured";
import Footer from "../../components/Footer/Footer";
import Link from "../../components/Link/Link";
import MainPhoto from "../../components/instagramTitle/MainPhoto";
import Contact from "../../components/Contact/Contact";
import Intro from "../../components/intro/Intro";

const Homepage = () => {
  return (
    <>
      <Featured />
      <Intro />
      <div className="LinkContainer">
        <Link />
      </div>
      <MainPhoto />
      <Contact />
      <Footer />
    </>
  );
};

export default Homepage;
