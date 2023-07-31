import React from 'react'

const Button = (props) => {
  return (
    <button type={props.type} onClick={props.onClick} className={props.className}>
      {props.btnLabel}{props.children}
    </button>
  )
}

export default Button
