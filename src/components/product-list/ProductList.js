import "./ProductList.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Data of all categories in Shop page
const dataCategories = [
  { name: "IPHONE & MAC", items: ["Iphone", "Ipad", "Macbook"] },
  { name: "WIRELESS", items: ["Airpod", "Watch"] },
  { name: "OTHER", items: ["Mouse", "Keyboard", "Other"] },
];

// Product list component in Shop Page
function ProductList() {
  // State
  const [active, setActive] = useState("All");
  const [data, setData] = useState(null);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();

  // Function change to Detail Page of an item
  function gotoDetail(id) {
    navigate(`/detail/${id}`);
    window.scrollTo(0, 0);
  }

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
        setCategory(jsonData);
        setError(false);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  // Function handle click on a category and render items of that category
  const handleClick = (event) => {
    setActive(event.target.id);
    const newData = data.filter(
      (obj) => obj.category === event.target.id.toLowerCase()
    );

    // If click All then render all items
    if (event.target.id === "All") {
      setCategory(data);
    } else {
      setCategory(newData);
    }
    window.scrollTo(200, 200);
  };

  // When error fetching data
  let content = <p>Loading...</p>;

  // When error
  if (error) {
    content = <p>Some thing went wrong</p>;
  }

  // When done fetching and have data to render
  if (!isLoading && category) {
    content = (
      <div className="items-container">
        {category.map((obj) => (
          <div
            key={obj.name}
            className="shop-item zoom-out-element"
            onClick={() => gotoDetail(obj._id.$oid)}
          >
            <img src={obj.img1} alt={obj.name}></img>
            <h3>{obj.name}</h3>
            <p>{obj.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="shop-categories">
        <h1>CATEGORIES</h1>
        <h2>APPLE</h2>
        <button
          id="All"
          className={active === "All" ? "btn-active" : undefined}
          onClick={handleClick}
        >
          All
        </button>
        {dataCategories.map((obj) => (
          <div key={obj.name} className="categories-item">
            <h3>{obj.name}</h3>
            {obj.items.map((item) => (
              <button
                key={item}
                className={active === `${item}` ? "btn-active" : undefined}
                id={item}
                onClick={handleClick}
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="shop-items">
        <div className="search-sort">
          <input
            type="text"
            placeholder="Enter Search Here!"
            className="search-input"
          />
          <select className="sort-dropdown">
            <option value="Default sorting">Default sorting</option>
            <option value="Sorting price">Sorting price</option>
            <option value="Sorting category">Sorting category</option>
          </select>
        </div>
        {content}
        <div className="page-change">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
            </svg>
          </button>
          <p>1</p>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
