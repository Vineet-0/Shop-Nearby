import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
    const imageUrl = product ? `${API}/product/photo/${product._id}`: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/08/10/11/nedstark.jpg?quality=75&width=990&crop=4%3A3%2Csmart&auto=webp";
  return (
    <div className="flex items-center justify-center mx-auto transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300 ">
      <img
        className="p-8 rounded-t-lg max-h-[285px]"
        src={imageUrl}
        alt="product image"
      />
    </div>
  );
};

export default ImageHelper;
