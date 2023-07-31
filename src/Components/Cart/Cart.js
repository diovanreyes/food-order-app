import React, { useContext, useState } from "react";
import style from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const onCartRemoveHandler = (id) => {
    cartCtx.delItem(id);
  };
  const onCartAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const onSubmitOrderHandler = async function (userData) {
    setIsSubmitting(true);
    await fetch(
      "https://foodmenu-b374a-default-rtdb.asia-southeast1.firebasedatabase.app/Orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, items: cartCtx.items }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearItem();
  };

  const cartItems = (
    <ul className={style["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={() => onCartRemoveHandler(item.id)}
          onAdd={() => onCartAddHandler(item)}
        />
      ))}
    </ul>
  );

  const actionButtons = (
    <div className={style.actions}>
      <Button onClick={props.onClose} className={style["button--alt"]}>
        Close
      </Button>
      {hasItems && (
        <Button onClick={() => setIsCheckout(true)} className={style.button}>
          Order
        </Button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onSubmitOrder={onSubmitOrderHandler}
          onClose={props.onClose}
        />
      )}
      {!isCheckout && actionButtons}
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && <p>Submitting... Please wait ...</p>}
      {!isSubmitting && didSubmit && (
        <>
          <p>Successfully submitted.</p>
          <div className={style.actions}>
            <Button onClick={props.onClose} className={style.button}>
              Close
            </Button>
          </div>{" "}
        </>
      )}
    </Modal>
  );
};

export default Cart;
