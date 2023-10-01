import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/store";
import Swal from "sweetalert2";

// Cart page component
function CartPage() {
  // Data render cart page from redux state
  const cartArr = useSelector((state) => state.cart.cartList);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function change to Shop Page
  const gotoShop = () => {
    navigate("/shop");
    window.scrollTo(0, 0);
  };

  // Function change to Checkout Page
  const gotoCheckout = () => {
    // if no item in shopping cart then not go to checkout and alert
    if (cartArr.length !== 0) {
      navigate("/checkout");
      window.scrollTo(0, 0);
    } else {
      Swal.fire({
        icon: "error",
        title: "You do not have any item in cart to checkout!",
        text: "You can go back to shop and adding item",
      });
    }
  };

  // Function update quantity of item in shopping cart
  const updateCart = (obj, change) => {
    // If quantity is 1 and user click on decrease then return
    if (obj.quantity === 1 && change === -1) {
      return;
    }

    const name = obj.name;
    const index = cartArr.findIndex((obj) => obj.name === name);
    dispatch(cartActions.UPDATE_CART({ index: index, change: change }));
  };

  // Function delete item out of shopping cart
  const deleteCart = (obj) => {
    const name = obj.name;
    const index = cartArr.findIndex((obj) => obj.name === name);
    dispatch(cartActions.DELETE_CART(index));
  };

  let content = <p className="cart-noS-item">No item in shopping cart</p>;
  let contentTotal = 0;

  // Content of 2 button change page
  const contentChangePage = (
    <div className="cart-change-page">
      <button className="btn-change-page change-shop" onClick={gotoShop}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z" />
        </svg>
        <span>Continute shopping</span>
      </button>
      <button
        className="btn-change-page change-checkout"
        onClick={gotoCheckout}
      >
        <span>Proceed to checkout</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />
        </svg>
      </button>
    </div>
  );

  // If shopping cart have item then render
  if (cartArr.length !== 0) {
    content = cartArr.map((obj) => (
      <div key={obj.name} className="cart-item">
        <img src={obj.image} alt={obj.name}></img>
        <h2>{obj.name}</h2>
        <p className="price">
          {obj.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          <br></br>
          <span>VND</span>
        </p>
        <div className="cart-quantity">
          <button onClick={() => updateCart(obj, -1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 256 512"
            >
              <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
            </svg>
          </button>
          <p>{obj.quantity}</p>
          <button onClick={() => updateCart(obj, 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 256 512"
            >
              <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
            </svg>
          </button>
        </div>
        <p className="total">
          {(obj.price * obj.quantity)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          <br></br>
          <span>VND</span>
        </p>
        <div className="remove">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
            onClick={() => deleteCart(obj)}
          >
            <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
          </svg>
        </div>
      </div>
    ));
  }

  // Calculate the total price of all items in shopping cart
  if (cartArr.length !== 0) {
    const totalPrice = cartArr.reduce(
      (acc, obj) => acc + obj.price * obj.quantity,
      0
    );
    contentTotal = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className="cart-page">
      <div className="cart-page-title">
        <h1>CART</h1>
        <p>CART</p>
      </div>
      <h1 className="shopping-cart-title">SHOPPING CART</h1>
      <div className="cart-items">
        <div className="items-info">
          <h3>IMAGE</h3>
          <h3>PRODUCT</h3>
          <h3>PRICE</h3>
          <h3>QUANTITY</h3>
          <h3>TOTAL</h3>
          <h3>REMOVE</h3>
        </div>
        {content}
        {contentChangePage}
      </div>
      <div className="cart-total">
        <h2>CART TOTAL</h2>
        <div className="subtotal">
          <h3>SUBTOTAL</h3>
          <p>{contentTotal + " VND"}</p>
        </div>
        <div className="total-pay">
          <h3>TOTAL</h3>
          <p>{contentTotal + " VND"}</p>
        </div>
        <div className="voucher">
          <input placeholder="Enter your coupon"></input>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M190.5 68.8L225.3 128H224 152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40zM32 288V464c0 26.5 21.5 48 48 48H224V288H32zM288 512H432c26.5 0 48-21.5 48-48V288H288V512z" />
            </svg>
            <span>Apply your coupon</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
