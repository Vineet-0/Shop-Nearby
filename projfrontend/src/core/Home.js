import React from "react";
import { API } from "../backend";
import Base from "../core/Base";

const Home = () => {
  console.log("API is", API);
  return (
    <Base title="Home Page" >
      {/* <h1 className="text-white">Home</h1> */}
    </Base>
  );
};

export default Home;
