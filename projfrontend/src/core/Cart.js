import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Base from "../core/Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load producst</h2>
        <div className="grid grid-cols-1 text-center gap-5">
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

  const loadCheckout = () => {
    return (
      <div>
        <h2>This section is for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="grid grid-cols-2">
        <div>{loadAllProducts()}</div>
        <div>Checkout Section</div>
      </div>
    </Base>
  );
};

export default Cart;
