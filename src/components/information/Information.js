import "./Information.css";

// Information component in Home Page
function Information() {
  const dataShip = ["FREE SHIPPING", "24 X 7 SERVICE", "FESTIVAL OFFER"];

  return (
    <div className="information">
      <div className="ship-text">
        {dataShip.map((e) => (
          <div key={e} className="ship-item">
            <h1>{e}</h1>
            <p>Free shipping worldwide</p>
          </div>
        ))}
      </div>
      <div className="input-email">
        <div className="input-content">
          <h1>LET'S BE FRIEND!</h1>
          <p>Subcribe your email to be friend with us.</p>
        </div>
        <div className="input-form">
          <input
            type="text"
            placeholder="Enter your email address"
            className="input-field"
          />
          <button className="btn-subcribe">Subcribe</button>
        </div>
      </div>
    </div>
  );
}

export default Information;
