import React, {forwardRef} from "react";
import style from "./Input.module.css";

const Input = (props, ref) => {
  return (
    <div className={style.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} ref={ref}></input>
    </div>
  );
};

export default forwardRef(Input);
