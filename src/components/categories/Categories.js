import "./Categories.css";
import { useNavigate } from "react-router-dom";

// Data of 5 catefories in Home Page
const dataCategories = [
  { name: "product_1", path: "./image/product_1.png" },
  { name: "product_2", path: "./image/product_2.png" },
  { name: "product_3", path: "./image/product_3.png" },
  { name: "product_4", path: "./image/product_4.png" },
  { name: "product_5", path: "./image/product_5.png" },
];

function Categories() {
  const navigate = useNavigate();

  // Function change to Shop Page
  function gotoShop() {
    navigate("/shop");
    window.scrollTo(0, 0);
  }

  return (
    <div className="categories">
      <div className="categories-text">
        <p>CAREFULLY CREATED COLLECTIONS</p>
        <h1>BROWSE OUR CATEGORIES</h1>
      </div>
      {dataCategories.map((obj) => (
        <img
          key={obj.name}
          src={obj.path}
          alt={obj.name}
          onClick={gotoShop}
        ></img>
      ))}
    </div>
  );
}

export default Categories;
