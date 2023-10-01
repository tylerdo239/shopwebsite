import "./Products.css";
import { popupActions } from "../../store/store";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// Component of 8 top trend item in Home Page
function Products() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const dispatch = useDispatch();

  // Function handle popup of an item
  const openPopup = (data) => {
    dispatch(popupActions.SHOW_POPUP(data));
  };

  // Fetch data to render
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setError(false);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  // When error fetching data
  let content = <p>Loading...</p>;

  // When error
  if (error) {
    content = <p>Some thing went wrong</p>;
  }

  // When done fetching and have data to render
  if (!isLoading && data) {
    content = (
      <div className="product-items">
        {data.map((obj) => (
          <div key={obj.name} className="product-item">
            <img
              src={obj.img1}
              alt={obj.name}
              onClick={() => openPopup(obj)}
            ></img>
            <h3>{obj.name}</h3>
            <p>{obj.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="products">
      <div className="product-title">
        <p>MADE THE HARD WAY</p>
        <h1>TOP TRENDING PRODUCTS</h1>
        {content}
      </div>
    </div>
  );
}

export default Products;
