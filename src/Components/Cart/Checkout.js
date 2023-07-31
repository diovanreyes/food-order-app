import React from "react";
import Button from "../UI/Button";
import style from "./Checkout.module.css";
import useInput from "../../hooks/useInput";

const Checkout = (props) => {

  const {
    value: nameValue,
    onBlurHandler: nameOnBlurHandler,
    onChangeInputHnadler: nameChangeHandler,
    hasError: nameHasError,
    setIsTouched: setNameIsTouched,
    valueIsValid: nameIsValid,
    reset: resetName,
  } = useInput((val) => val.includes(" "));

  const {
    value: addressValue,
    onBlurHandler: addressOnBlurHandler,
    onChangeInputHnadler: addressChangeHandler,
    hasError: addressHasError,
    setIsTouched: setAddressIsTouched,
    valueIsValid: addressIsValid,
    reset: resetAddress,
  } = useInput((val) => val.includes(' '));

  const {
    value: postalValue,
    onBlurHandler: postalOnBlurHandler,
    onChangeInputHnadler: postalChangeHandler,
    hasError: postalHasError,
    setIsTouched: setPostalIsTouched,
    valueIsValid: postalIsValid,
    reset: resetPostal,
  } = useInput((val) => val.length === 4);

  const {
    value: contactValue,
    onBlurHandler: contactOnBlurHandler,
    onChangeInputHnadler: contactChangeHandler,
    hasError: contactHasError,
    setIsTouched: setContactIsTouched,
    valueIsValid: contactIsValid,
    reset: resetContact,
  } = useInput((val) => val.trim().length === 11);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setNameIsTouched(true);
    setAddressIsTouched(true);
    setPostalIsTouched(true);
    setContactIsTouched(true);

    if (!nameIsValid || !addressIsValid || !postalIsValid || !contactIsValid)
      return;

      props.onSubmitOrder({
        name: nameValue,
        address: addressValue,
        postalCode: postalValue,
        contact: contactValue
      })

    resetName();
    resetAddress();
    resetPostal();
    resetContact();
  };

  return (
    <form className={style.form} onSubmit={onSubmitHandler}>
      <div className={`${style.control} ${nameHasError && style.invalid}`}>
        <label htmlFor="name">Fullname</label>
        <input
          value={nameValue}
          onBlur={nameOnBlurHandler}
          onChange={nameChangeHandler}
          type="text"
          id="name"
        />
        {nameHasError && (
          <p className={style.invalid}>Please Enter a valid Name!</p>
        )}
      </div>
      <div className={`${style.control} ${addressHasError && style.invalid}`}>
        <label htmlFor="address">Full Address</label>
        <input
          value={addressValue}
          onBlur={addressOnBlurHandler}
          onChange={addressChangeHandler}
          type="text"
          id="address"
        />
        {addressHasError && <p className={style.invalid}>Invalid!</p>}
      </div>
      <div className={`${style.control} ${postalHasError && style.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input
          value={postalValue}
          onBlur={postalOnBlurHandler}
          onChange={postalChangeHandler}
          type="number"
          id="postal"
        />
        {postalHasError && (
          <p className={style.invalid}>Please Enter a valid Postal Code!</p>
        )}
      </div>
      <div className={`${style.control} ${contactHasError && style.invalid}`}>
        <label htmlFor="contact">Phone/Mobile</label>
        <input
          value={contactValue}
          onBlur={contactOnBlurHandler}
          onChange={contactChangeHandler}
          type="text"
          id="contact"
        />
        {contactHasError && (
          <p className={style.invalid}>Please Enter a contact!</p>
        )}
      </div>

      <div className={style.actions}>
        <Button type="button" onClick={props.onClose}>
          Cancel
        </Button>
        <Button className={style.submit}>Submit</Button>
      </div>
    </form>
  );
};

export default Checkout;
