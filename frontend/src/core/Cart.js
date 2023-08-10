import React, { useEffect, useState, useContext } from "react";
import Base from "../core/Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import Payment from "./Payment";
import { loadCart } from "./helper/cartHelper";
import CartContext from "../context/cartContext";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  let totalPrice = 0;
  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const a = useContext(CartContext);

  useEffect(() => {
    const data = loadCart();
    const len = data?.length;
    a.setState(len);
  }, []);

  const loadAllProducts = (products) => {
    return (
      <div>
        <div className="grid grid-cols-1 xl:grid-cols-2 text-center gap-5 mx-auto">
          {products.map((product, index) => {
            totalPrice = totalPrice + product.price;
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
    <Base>
      <div className="flex items-center justify-center lg:items-start flex-col lg:flex-row">
        <div className="w-4/5 lg:w-2/3">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No Products in Cart</h3>
          )}
        </div>

        <div className=" w-4/5 xl:w-1/3 mt-4">
          <div className=" max-w-[400px] mx-auto">
            <Payment
              products={products}
              total={totalPrice}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
