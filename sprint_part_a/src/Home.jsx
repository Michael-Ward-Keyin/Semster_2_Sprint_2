
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);    

  const cartData = "http://localhost:5000/cart";


  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);  
    } catch (err) {
      setError(err.message);  
      setLoading(false);  
    }
  };

  const fetchCart = async () => {
    const response = await fetch(cartData);
    const data = await response.json();
    setCart(data);
  };

  const handleIncrease = async (product) => {
    try {
      const response = await fetch("http://localhost:5000/cart");
      const currentCart = await response.json();
  
      const itemInCart = currentCart.find(item => item.id === product.id);
  
      if (itemInCart) {

        const updatedItem = { ...itemInCart, quantity: itemInCart.quantity + 1 };
  
        await fetch(`http://localhost:5000/cart/${itemInCart.id}`, {
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
      console.error("Error updating the cart:", error);
    }
  };


  useEffect(() => {
    fetchProducts();

  }, []);  


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h2>Product Listing</h2>
          {products.map((product) => (
            <div className="product-card" key={product.id}>
             <div className="text-column">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                
                <Link to={`/product/${product.id}`}>
                  <button>View Details</button>
                </Link>
                <button onClick={() => handleIncrease(product)}>Add to Cart</button>
              </div>
              <div className="image-column">
                <img src ={product.image}></img>
              </div>
            </div>
          ))}
    </>
  );
};

export default Home;

