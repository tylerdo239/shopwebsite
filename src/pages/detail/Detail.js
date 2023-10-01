import "./Detail.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/store";
import Swal from "sweetalert2";

// Detail Page component of an item
function DetailPage() {
  const params = useParams();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [detail, setDetail] = useState(null);
  const [related, setRelated] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const cartArr = useSelector((state) => state.cart.cartList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function change page to Detail page of a item
  function gotoDetail(id) {
    navigate(`/detail/${id}`);
    window.scrollTo(0, 0);
  }

  // Function increase quantity
  function increaseQuantity() {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  }

  // Function decrease quantity
  function decreaseQuantity() {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  }

  // Function add item to shopping cart
  function addToCart() {
    const index = cartArr.findIndex((obj) => obj.name === detail[0].name);

    // If that item is have been in shopping cart then alert and return
    if (index !== -1) {
      Swal.fire({
        icon: "error",
        title: "You have aldready add this item to cart!",
        text: "You can check it in your cart",
      });
    } else {
      // Else add item to redux state using redux action and alert sucess
      dispatch(
        cartActions.ADD_CART({
          name: detail[0].name,
          price: detail[0].price,
          image: detail[0].img1,
          quantity: quantity,
        })
      );
      setQuantity(1);
      Swal.fire(
        "Successfully Adding Item To Shopping Cart!",
        "You Can Check Your Shopping Cart",
        "success"
      );
    }
  }

  // Fetching data
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
        const detail = jsonData.filter(
          (obj) => obj._id.$oid === params.detailId
        );
        const related = jsonData
          .filter((obj) => obj.category === detail[0].category)
          .filter((obj) => obj._id.$oid !== params.detailId);
        setRelated(related);
        setDetail(detail);
        setError(false);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, [params.detailId]);

  // When fetchign data
  let content = <p>Loading...</p>;
  let relatedContent = <p>There is no related product</p>;

  // Check the related item base on category
  if (related) {
    relatedContent = (
      <div className="related-items">
        {related.map((obj) => (
          <div key={obj.name} className="related-item">
            <img
              src={obj.img1}
              alt={obj.name}
              onClick={() => gotoDetail(obj._id.$oid)}
            ></img>
            <h1>{obj.name}</h1>
            <h3>
              {detail[0].price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}
            </h3>
          </div>
        ))}
      </div>
    );
  }

  // When error
  if (error) {
    content = <p>Some thing went wrong</p>;
  }

  // When done fetching and render data
  if (!isLoading && detail) {
    content = (
      <div className="detail-item">
        <div className="detail-short-description">
          <img src={detail[0].img4} alt={detail[0].name}></img>
          <div className="detail-info">
            <h1>{detail[0].name}</h1>
            <h3>
              {detail[0].price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"}
            </h3>
            <p>{detail[0].short_desc}</p>
            <h4>
              CATEGORY: <span>{detail[0].category + "s"}</span>
            </h4>
            <div className="add-cart">
              <p>QUANTITY</p>
              <button onClick={decreaseQuantity}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 256 512"
                >
                  <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
                </svg>
              </button>
              <p className="quantity">{quantity}</p>
              <button onClick={increaseQuantity}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 256 512"
                >
                  <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                </svg>
              </button>
              <button className="btn-add-cart" onClick={addToCart}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="detail-long-description">
          <h1>DESCRIPTION</h1>
          <h2>PRODUCT DESCRIPTION</h2>
          <p>{detail[0].long_desc.replace(/\n\n•/g, "\n-")}</p>
        </div>
        <div className="related">
          <h1>RELATED PRODUCTS:</h1>
          {relatedContent}
        </div>
      </div>
    );
  }

  return <div className="detail-page">{content}</div>;
}

export default DetailPage;
