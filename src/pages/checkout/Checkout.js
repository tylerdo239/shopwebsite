import "./Checkout.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

// Data of Checkout Page
const formData = [
  {
    label: "Full Name",
    type: "text",
    placeholder: "Enter Your Full Name Here!",
  },
  { label: "Email", type: "email", placeholder: "Enter Your Email Here!" },
  {
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter Your Phone Number Here!",
  },
  { label: "Address", type: "text", placeholder: "Enter Your Address Here!" },
];

// Checkout Page component
function CheckoutPage() {
  // Data render cart page from redux state
  const cartArr = useSelector((state) => state.cart.cartList);

  let contentTotal = 0;

  // Calculate the total price of all items in shopping cart
  if (cartArr.length !== 0) {
    const totalPrice = cartArr.reduce(
      (acc, obj) => acc + obj.price * obj.quantity,
      0
    );
    contentTotal = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Function handle submit the order
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire(
      "Sucessfully Place Order!",
      "Your order will arrive in few days",
      "success"
    );
  };

  return (
    <div className="checkout-page">
      <div className="checkout-page-title">
        <h1>CHECKOUT</h1>
        <p>CHECKOUT</p>
      </div>
      <h1 className="billing-details">BILLING DETAILS</h1>
      <form onSubmit={handleSubmit} className="form-order">
        {formData.map((obj, index) => (
          <div key={index} className="input">
            <label>{obj.label.toUpperCase() + ":"}</label>
            <input
              type={obj.type}
              name={obj.label.toLowerCase()}
              placeholder={obj.placeholder}
            />
          </div>
        ))}
        <button type="submit">PLACE ORDER</button>
      </form>
      <div className="checkout-total">
        <h2>YOUR ORDER</h2>
        {cartArr.length !== 0 &&
          cartArr.map((obj) => (
            <div key={obj.name} className="checkout-item">
              <h3>{obj.name}</h3>
              <p>
                {obj.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                  " VND x " +
                  obj.quantity}
              </p>
            </div>
          ))}
        <div className="total">
          <h3>TOTAL</h3>
          <p>{contentTotal + " VND"}</p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
