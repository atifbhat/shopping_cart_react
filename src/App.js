import React, { useState } from "react";
import data from "./data.json";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import Products from "./components/Products";


const App = () => {
 
const [products, setProducts] = useState(data.products);
const [cartItems, setCartItems] = useState([]);
const [size, setSize] = useState("");
const [sort, setSort] = useState("");

const removeFromCart =(product) =>{

const updatedCartItems= [...cartItems];
const updatedCart=updatedCartItems.filter((item) => item._id !== product._id);
  setCartItems(updatedCart);
};

const addToCart = (product) => {
  const updatedCartItems = [...cartItems];
  let alreadyInCart = false;
  updatedCartItems.forEach((item) => {
    if (item._id === product._id) {
      item.count++;
      alreadyInCart = true;
    }
  });

  if (!alreadyInCart) {
    updatedCartItems.push({ ...product, count: 1 });
  }

  setCartItems(updatedCartItems);
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

};

const sortProducts = (event) => {
  const sortValue = event.target.value;
  setSort(sortValue);

  setProducts((prevProducts) =>
    [...prevProducts].sort((a, b) => {
      if (sortValue === "lowest") {
        return a.price > b.price ? 1 : -1;
      } else if (sortValue === "highest") {
        return a.price < b.price ? 1 : -1;
      } else {
        return a._id < b._id ? 1 : -1;
      }
    })
  );
};

const filterProducts = (event) => {
  const selectedSize = event.target.value;

  if (selectedSize === "") {
    setSize(selectedSize);
    setProducts(data.products);
  } else {
    setSize(selectedSize);
    setProducts(data.products.filter((product) => product.availableSizes.indexOf(selectedSize) >= 0));
  }
};


return (
  <div className="grid-container">
    <header>
      <a href="/">React shopping cart</a>
    </header>

    <main>
      <div className="content">
        <div className="main">
          <Filter
            count={products.length}
            size={size}
            sort={sort}
            filterProducts={filterProducts}
            sortProducts={sortProducts}
          ></Filter>
          <Products products={products} addToCart={addToCart}></Products>
        </div>
        <div className="sidebar">
          <Cart 
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          />
        </div>
      </div>
    </main>

    <footer>All rights reserved.</footer>
  </div>
);


}
export default App;

