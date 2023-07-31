import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  delItem: (id) => {},
  clearItem: () => {},
});

export default CartContext;
