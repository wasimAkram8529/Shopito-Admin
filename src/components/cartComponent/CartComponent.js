import "./CartComponent.css";

const CartComponent = ({
  shippingDateString,
  imageURL,
  title,
  price,
  quantity,
  color,
  brand,
  status,
}) => {
  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        {status === "Delivered"
          ? `DeliveryStatus: ${status}`
          : `DeliveryDate: ${shippingDateString}`}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={imageURL} />

        <div className="cart-item-details">
          <div className="product-name">Title: {title}</div>
          <div className="product-name">Brand: {brand}</div>
          <div className="product-name">Quantity: {quantity}</div>
          <div className="product-name">Color: {color}</div>
          <div className="product-price">Price: {`₹${price}`}</div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
