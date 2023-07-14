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
        <div className="grid grid-cols-1 sm:flex sm:items-center sm:justify-center">
          <input
            className="text-black w-9/10 sm:w-3/5 md:w-3/4 lg:w-1/2 xl:w-1/3 text-lg px-4 py-2 rounded-md"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleChange}
          />
          <button 
          // className="m-5 border-2 text-black text-lg p-3 border-black"
          className="w-[100px] mx-auto my-5 sm:m-5 px-4 py-2 text-white bg-[#05445E] text-lg font-bold rounded-md hover:bg-[#189AB4] "
          type="submit">Search</button>
        </div>
      </form>
      <div className="flex justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => {
            return <Card key={index} product={product} />;
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
