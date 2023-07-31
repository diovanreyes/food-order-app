import React, { useReducer } from "react";
import CartContext from "./cart-context";

const ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  CLEAR_ITEM: "CLEAR_ITEM"
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = function (state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const totalAmount =
        state.totalAmount + action.payload.amount * action.payload.price;

      const cartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const currentItem = state.items[cartItemIndex];

      let updatedItems;

      if (currentItem) {
        const updatedItem = {
          ...currentItem,
          amount: currentItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[cartItemIndex] = updatedItem;
      } else {
        updatedItems = [...state.items, action.payload];
      }

      return {
        items: updatedItems,
        totalAmount: totalAmount,
      };
    }
    case ACTIONS.REMOVE_ITEM: {
      const cartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const currentItem = state.items[cartItemIndex];
      const updatedTotalAmount = state.totalAmount - currentItem.price;
      let updatedItems;
      if (currentItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.payload);
      } else {
        const updatedItem = { ...currentItem, amount: currentItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[cartItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case ACTIONS.CLEAR_ITEM: {
      return defaultCartState;
    }
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, defaultCartState);

  const addCartItemHandler = function (item) {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: item });
  };

  const delCartItemHandler = function (id) {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: id });
  };

  const clearItemHandler = function () {
    dispatch({type: ACTIONS.CLEAR_ITEM})
  }

  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addCartItemHandler,
    delItem: delCartItemHandler,
    clearItem: clearItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
