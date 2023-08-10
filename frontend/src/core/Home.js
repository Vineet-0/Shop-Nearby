import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Base from "../core/Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import Carousel from "../component/Carousel";
import headphoneAd from "../../assets/headphoneGirlAd2.png";
import iphoneAd from "../../assets/iphoneAd2.png";
import onePlusAd from "../../assets/onePlusAd.png";
import { useContext } from "react";
import { loadCart } from "./helper/cartHelper";
import CartContext from "../context/cartContext";

const slides = [headphoneAd, iphoneAd, onePlusAd];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilterProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const a = useContext(CartContext);

  useEffect(() => {
    const data = loadCart();
    const len = data.length;
    a.setState(len);
  }, []);

  function filterData(searchQuery, products) {
    const data = products.filter((product) => {
      return product.name.toLowerCase()?.includes(searchQuery.toLowerCase());
    });
    return data;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredData = filterData(searchQuery, products);
    setfilterProducts(filteredData);
    console.log("printing filterd data ", filteredData);
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
    <Base>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit}>
          {/* search bar */}
          <div className="flex items-center text-black gap-2">
            <input
              className=" py-3 px-2 text-sm w-[400px] rounded-md "
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleChange}
            />
            <button
              // className="m-5 border-2 text-black text-lg p-3 border-black"
              className="w-[100px] mx-auto my-5 sm:m-5 px-4 py-2 text-white bg-[#05445E] text-md font-semibold rounded-md hover:bg-[#189AB4] "
              type="submit"
            >
              Search
            </button>
          </div>
        </form>

        {/* ad images  */}
        <div className="w-[80%] flex items-center">
          <Carousel>
            {slides.map((i) => (
              <img src={i} alt="slideImage" className="" />
            ))}
          </Carousel>
        </div>

        {/* cards */}
        <div className="flex justify-center p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => {
              return <Card key={index} product={product} />;
            })}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
