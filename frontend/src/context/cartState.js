import { useState } from "react";
import CartContext from "./cartContext";

const CartState = (props) => {
  const [state, setState] = useState(0);

  return (
    <CartContext.Provider value={{ state, setState }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
