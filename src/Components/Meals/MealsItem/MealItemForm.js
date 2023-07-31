import React, { useRef, useState } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import style from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const inputRef = useRef();
  const [isValid, setIsValid] = useState(true);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const amountInputValue = inputRef.current.value;

    if (
      amountInputValue.trim().length === 0 ||
      +amountInputValue > 10 ||
      +amountInputValue < 1
    ) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    props.onAddToCart(+amountInputValue);
  };

  return (
    <form onSubmit={formSubmitHandler} className={style.form}>
      <Input
        label="Amount"
        ref={inputRef}
        input={{
          type: "number",
          id: "amount_" + props.id,
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "1",
        }}
      />
      <Button type="submit" className={style.button} btnLabel="+ Add" />
      {!isValid && <p>Please Enter Numbers From (1 - 10)</p>}
    </form>
  );
};

export default MealItemForm;
