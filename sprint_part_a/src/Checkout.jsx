import React, { useState } from "react";

const Checkout = () => {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);


  const handlePlaceOrder = () => {
 
    setTimeout(() => {
      setIsOrderPlaced(true);
    }, 1000);
  };

  return (
    <div>
      <h2>Checkout</h2>
      {!isOrderPlaced ? (
        <div className="product-card">
          <div className="text-column">
            <h2>Final Step: Confirm Your Order</h2>
            <p>Thank you for shopping with us! Click the button below to place your order.</p>
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      ) : (
        <div className="product-card">
          <div className="text-column">
            <h2>Order Confirmed!</h2>
            <p>Your order has been successfully placed. Thank you for shopping with us!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
