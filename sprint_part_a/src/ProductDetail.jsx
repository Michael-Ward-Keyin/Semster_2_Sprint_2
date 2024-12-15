import { useEffect, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const { id } = useParams(); 


  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };


  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart");
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };


  const handleIncrease = async () => {
    try {
      const itemInCart = cart.find(item => item.id === product.id);

      if (itemInCart) {

        const updatedItem = { ...itemInCart, quantity: itemInCart.quantity + 1 };

        await fetch(`http://localhost:5000/cart/${product.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedItem),
        });
      } else {
        const newCartItem = { ...product, quantity: 1 };

        await fetch("http://localhost:5000/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCartItem),
        });
      }

      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, []);


  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (

    <>
    <h2>{product.name}</h2>
      <div className="product-card">
        <div className="text-column">
          
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <button onClick={handleIncrease}>Add to Cart</button>
        </div>
        <div className="image-column">
          <img src={product.image}></img>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
