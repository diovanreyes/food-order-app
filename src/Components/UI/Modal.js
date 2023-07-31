import React from 'react';
import style from './Modal.module.css';
import ReactDom from 'react-dom'


const Backdrop = function (props) {
  return <div onClick={props.onClose} className={style.backdrop}></div>
}

const ModalOverlay = function (props) {
  return <div className={style.modal}>
  <div>
    {props.children}
  </div>
</div>
}

const Modal = (props) => {
  return (
   <>
    {ReactDom.createPortal(<Backdrop onClose={props.onClose} />, document.querySelector("#modal-root"))}
    {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.querySelector("#modal-root"))}
   </>
  )
}


export default Modal
