import "./Banner.css";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  // Function change to Shop Page
  function gotoShop() {
    navigate("/shop");
    window.scrollTo(0, 0);
  }

  return (
    <div className="banner">
      <img src="./image/banner1.jpg" alt="banner"></img>
      <div className="banner-content">
        <p>NEW INSPIRATION 2020</p>
        <h1>20% OFF ON NEW SEASON</h1>
        <button onClick={gotoShop}>Browse collections</button>
      </div>
    </div>
  );
}

export default Banner;
