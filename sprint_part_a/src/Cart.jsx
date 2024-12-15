import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);


  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart");
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };


  const handleIncrease = async (product) => {
    try {
      const updatedItem = { ...product, quantity: product.quantity + 1 };
      await fetch(`http://localhost:5000/cart/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });
      fetchCart();
    } catch (error) {
      console.error("Error increasing the quantity:", error);
    }
  };


  const handleDecrease = async (product) => {
    try {
      if (product.quantity > 1) {
        const updatedItem = { ...product, quantity: product.quantity - 1 };
        await fetch(`http://localhost:5000/cart/${product.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedItem),
        });
      } else {

        await fetch(`http://localhost:5000/cart/${product.id}`, {
          method: "DELETE",
        });
      }
      fetchCart();
    } catch (error) {
      console.error("Error decreasing the quantity:", error);
    }
  };


  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };


  const calculateTaxes = (subtotal) => {
    return (subtotal * 0.15).toFixed(2);
  };


  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxes = calculateTaxes(subtotal);
    return (parseFloat(subtotal) + parseFloat(taxes)).toFixed(2);
  };


  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = calculateSubtotal();
  const taxes = calculateTaxes(subtotal);
  const total = calculateTotal();

  return (
    <>
      <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
              {cart.map((item) => (
                <div className="product-card" key={item.id}>
                  <div  className="text-column">
                    <h2>{item.name}</h2>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: ${item.price * item.quantity}</p>

                      
                      <button onClick={() => handleIncrease(item)}>+</button>
                      <button onClick={() => handleDecrease(item)}>-</button>
                  </div>
                  <div className="image-column">
                    <img src ={item.image}></img>
                  </div>
                </div>
              ))}

            <div>
              <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
              <h3>Taxes (HST 15%): ${taxes}</h3>
              <h3>Total: ${total}</h3>
              <Link to={`/Checkout`}>
                <button>Checkout</button>
              </Link>
            </div>
          </>
        )}
    </>

  );
};

export default Cart;
