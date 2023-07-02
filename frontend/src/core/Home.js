import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Base from "../core/Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
    console.log(products);
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
        {products.map((product, index) => {
          return <Card key={index} product={product} />;
        })}
      </div>
    </Base>
  );
};

export default Home;
