import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../backend";
import axios from "axios";
import Menu from "./Menu";
import ReactStars from "react-stars";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineLink } from "react-icons/ai";

const ProductPage = () => {
  // function copyLinkHandler() {
  //   var elem = document.createElement("textarea");
  //   document.body.appendChild(elem);
  //   elem.value = google.com;
  //   elem.select();
  //   document.execCommand("copy");
  //   document.body.removeChild(elem);
  //   document.write("Copied to clipboard!");
  // }
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const url = `${API}/product/${productId}`;
  console.log(url);
  const image = `${API}/product/photo/${productId}`;
  console.log(image);
  const fetchProductDetails = async () => {
    const response = await axios.get(url);
    setProduct(response.data);
    console.log("printing the product", product);
  };
  useEffect(() => {
    fetchProductDetails();
  }, []);
  return (
    <div>
      <Menu />

      <div className="flex flex-col items-center gap-7">
        {/* product information  */}
        <div className="flex items-center bg-white justify-evenly py-10 w-[95%] shadow-sm rounded-md">
          {/* product image  */}
          <div className="w-[550px]">
            <img
              src={image}
              alt=""
              className="object-contain w-[550px] h-[550px] border-[1px] border-gray-300 rounded-lg"
            />
          </div>

          {/* product information */}
          <div>
            {/* name  */}
            <div className="border-b-[1px] border-gray-400 py-4">
              <p className="font-semibold text-2xl">{product?.name}</p>
            </div>

            <div className="flex flex-col py-4 border-b-[1px] border-gray-400">
              {/* price  */}
              <p className="font-semibold text-xl">₹{product?.price}</p>

              {/* rating  */}
              <div className="flex items-center">
                <ReactStars
                  count={5}
                  value={4}
                  size={24}
                  edit="false"
                  color1="gray"
                  color2="#ffd700"
                />
                <p className="text-gray-500">(4 ratings)</p>
              </div>
            </div>

            <div className=" border-b-[1px] border-gray-400 py-4">
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">Availability:</p>
                <p className=" text-green-600 font-bold">In Stock</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">Categories:</p>
                <p className=" text-gray-600 font-semibold">
                  {product?.category?.name}, Accessories, Electronics
                </p>
              </div>
            </div>

            {/* buttons  */}
            <div className="flex items-center gap-3 border-b-[1px] border-gray-400 py-6">
              <button className=" hover:scale-95 transition-all duration-200 bg-white text-blue-700 border-2 border-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Add to cart
              </button>

              <button className="text-white hover:scale-95 transition-all duration-200 bg-[#0056d2] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Buy Now
              </button>
            </div>

            {/* shipping and return  */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <TbTruckDelivery size={28} />
                  <p className="font-semibold text-lg">Shipping & returns</p>
                </div>
                <div className="text-md text-gray-500">
                  <p>Free Shipping and returns available on all orders!</p>
                  <p>
                    We ship all Indian domestic orders within 5-10 business
                    Days.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <AiOutlineLink size={28} />
                  <p className="font-semibold text-lg">Product Link</p>
                </div>
                <p className="text-gray-500">Copy link</p>
              </div>
            </div>
          </div>
        </div>

        {/* description  */}
        <div className="bg-white flex flex-col gap-2 w-[95%] shadow-sm rounded-md py-3 px-4">
          <p className="font-bold text-xl">Description</p>
          <p className="text-lg text-gray-500">{product?.description}</p>
        </div>

        {/* review  */}
        <div className="bg-white flex flex-col gap-2 w-[95%] shadow-sm rounded-md py-3 px-4">
          <div className="border-b-[1px] border-gray-400 py-2">
            <p className="font-bold text-xl">Reviews</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* first review  */}
            <div>
              <ReactStars count={5} value={3} color1="gray" color2="#ffd700" />
              <p className="font-bold">Nice Quality!</p>
              <div className="flex items-center gap-2 font-semibold">
                <p>Sindhu Roy</p>
                <p className=" text-gray-500">on</p>
                <p>1 Aug, 2023</p>
              </div>
              <div>
                "Fantastic product!, the sleek design and UI friendly interface
                make it a joy to use."
              </div>
            </div>

            {/* second review  */}
            <div>
              <ReactStars count={5} value={4} color1="gray" color2="#ffd700" />
              <p className="font-bold">Great Product!</p>
              <div className="flex items-center gap-2 font-semibold">
                <p>Sahil Kumar</p>
                <p className=" text-gray-500">on</p>
                <p>9 Aug, 2023</p>
              </div>
              <div>
                "Highly recommended for anyone looking for a reliable and efficient solution."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
