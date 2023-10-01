import Banner from "../../components/banner/Banner";
import Categories from "../../components/categories/Categories";
import Information from "../../components/information/Information";
import Products from "../../components/products/Products";
import Popup from "../../components/popup/Popup";
import { useSelector } from "react-redux";
import "./Home.css";

// Home Page component
function HomePage() {
  // Use redux to set show when click on popup Item
  const show = useSelector((state) => state.popup.show);
  const dataPopup = useSelector((state) => state.popup.data);

  return (
    <div className="homepage">
      <Banner />
      <Categories />
      <Products />
      <Information />
      {show && <Popup dataPopup={dataPopup} />}
    </div>
  );
}

export default HomePage;
