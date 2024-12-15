import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import ProductDetail from "./ProductDetail";
import Checkout from "./Checkout";
import './App.css'


function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <img src="src\images\giovannis_pizzeria_logo_converted.jpg" alt="Giovanni's Pizzeria Logo" className="headerimage"/>
          <nav>
            <Link to="/"><button>Home</button></Link> | <Link to="/cart"><button>Cart</button></Link>
          </nav>
        </header>
        <main>
          <div className="product-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/Checkout" element={<Checkout />} />
            </Routes>
          </div>
        </main>
        <footer>
          <p>© 2024 Giovanni's Pizzeria</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

