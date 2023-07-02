import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
    const imageUrl = product ? `${API}/product/photo/${product._id}`: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/08/10/11/nedstark.jpg?quality=75&width=990&crop=4%3A3%2Csmart&auto=webp";
  return (
    <div className="h-[285px] -mb-2">
      <img
        className="p-8 rounded-t-lg"
        src={imageUrl}
        alt="product image"
      />
    </div>
  );
};

export default ImageHelper;
