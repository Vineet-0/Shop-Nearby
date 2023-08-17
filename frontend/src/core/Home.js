import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Base from "../core/Base";
import Card from "./Card";
import Card_V from "./Card Vertical";
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
    const len = data?.length;
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
        {/* search bar */}
        <form onSubmit={handleSubmit} className="h-[50px] flex justify-center">
          <div className="flex items-center justify-center text-black gap-2">
            <input
              className=" py-2 px-4 text-sm w-[400px] rounded-md "
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
        <div className="w-full md:w-[90%] max-h-[600px] flex flex-center py-4 sm:px-4">
          <Carousel>
            {slides.map((i) => (
              <img src={i} alt="slideImage" className="" />
            ))}
          </Carousel>
        </div>

        <div className="ml-5 mr-auto px-4 py-2 text-xl bg-white border rounded-lg dark:bg-white dark:border-gray-300 dark:text-black  shadow-none  hover:shadow-2xl">
          <h1 className=" text-black font-bold">Smart Phone</h1>
        </div>

        <div className="relative w-full">
          <div className="flex overflow-x-auto gap-8 scrollbar-none scroll-smooth pl-4 pt-4 px-3 pb-4">
            {filteredProducts.map((product, index) => {
              return <Card_V key={index} product={product} />;
            })}
          </div>
        </div>

        <div className="ml-5 mr-auto px-4 py-2 text-xl bg-white border rounded-lg dark:bg-white dark:border-gray-300 dark:text-black  shadow-none  hover:shadow-2xl">
          <h1 className=" text-black font-bold">Laptop</h1>
        </div>

        <div className="relative w-full">
          <div className="flex overflow-x-auto gap-8 scrollbar-none scroll-smooth pl-4 pt-4 px-3 pb-4">
            {filteredProducts.map((product, index) => {
              return <Card_V key={index} product={product} />;
            })}
          </div>
        </div>

        <div className="ml-5 mr-auto px-4 py-2 text-xl bg-white border rounded-lg dark:bg-white dark:border-gray-300 dark:text-black  shadow-none  hover:shadow-2xl">
          <h1 className=" text-black font-bold">Smart Watch</h1>
        </div>

        <div className="relative w-full">
          <div className="flex overflow-x-auto gap-8 scrollbar-none scroll-smooth pl-4 pt-4 px-3 pb-4">
            {filteredProducts.map((product, index) => {
              return <Card_V key={index} product={product} />;
            })}
          </div>
        </div>

        {/* cards */}
        {/* <div className="flex justify-center p-4 max-w-[1170px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => {
              return <Card key={index} product={product} />;
            })}
          </div>
        </div> */}

        <div className="ml-5 mr-auto px-4 py-2 text-xl bg-white border rounded-lg dark:bg-white dark:border-gray-300 dark:text-black  shadow-none  hover:shadow-2xl">
          <h1 className=" text-black font-bold">Recently Viewed</h1>
        </div>

        <div className="relative w-full">
          <div className="flex overflow-x-auto gap-8 scrollbar-none scroll-smooth pl-4 pt-4 px-3 pb-4">
            {filteredProducts.map((product, index) => {
              return <Card_V key={index} product={product} />;
            })}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
