import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Base from "../core/Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";
import Payment from "./Payment";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <div className="grid grid-cols-1 xl:grid-cols-2 text-center gap-5 mx-auto">
          {products.map((product, index) => {
            return (
              <Card
                key={index}
                product={product}
                addtoCart={false}
                removeFromCart={true}
                setReload={setReload}
                reload={reload}
              />
            );
          })}
        </div>
      </div>
    );
  };

  

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="flex items-center justify-center lg:items-start flex-col lg:flex-row mt-8">
        <div className="w-4/5 lg:w-2/3">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No Products in Cart</h3>
          )}
        </div>
        
        <div className=" w-4/5 xl:w-1/3 mt-4">
          <div className=" max-w-[400px] mx-auto">
            <Payment products={products} className="mx-auto" />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
