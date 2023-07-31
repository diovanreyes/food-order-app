import React, { useContext, useEffect, useState } from "react";
import style from "./HeaderButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button";

const HeaderButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [cartButtonEffect, setCartButtonEffect] = useState(false);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) return;
    setCartButtonEffect(true);

    const timer = setTimeout(() => {
      setCartButtonEffect(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <Button
      onClick={props.onClick}
      className={`${style.button} ${cartButtonEffect && style.bump}`}
    >
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span>Aking Kariton</span>
      <span className={style.badge}>{numberOfCartItems}</span>
    </Button>
  );
};

export default HeaderButton;
