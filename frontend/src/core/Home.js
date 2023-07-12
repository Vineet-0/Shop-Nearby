import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Base from "../core/Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilterProducts] = useState([]);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function filterData(searchQuery, products) {
    const filterData = products.filter((product) => {
      return product.name.toLowerCase()?.includes(searchQuery.toLowerCase());
    });
    return filterData;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    filteredData = filterData(searchQuery, products);
    setfilterProducts(filteredData);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
        setfilterProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
    console.log(products);
  }, []);

  return (
    <Base title="Home Page" description="Welcome to Shop Nearby">
      <form onSubmit={handleSubmit}>
        <input
          className="text-black w-1/2 text-lg p-3"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleChange}
        />
        <button 
        className="m-5 border-2 text-black text-lg p-3 border-black"
        type="submit">Search</button>
      </form>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
        {filteredProducts.map((product, index) => {
          return <Card key={index} product={product} />;
        })}
      </div>
    </Base>
  );
};

export default Home;
