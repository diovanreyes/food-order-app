import React from 'react';
import style from './Header.module.css';
import HeaderButton from './HeaderButton'
import headerImage from '../../assets/CG_EJpLVAAEOH5n.png'
import logo from '../../assets/McDonalds-logo.png';


const Header = (props) => {
  

  return (
    <>
    <header className={style.header}>
      <div className={style.div}>
        <img src={logo} alt="Wc-Donald's Logo"/>
        <h1>Wc Donald's Meals</h1>
      </div>
      <HeaderButton onClick={props.onShowCart}/>
    </header>
    <div className={style['main-image']}>
      <img src={headerImage} alt='Delicious not poisonous food ;)' />
    </div>  
    </>
  )
}

export default Header
