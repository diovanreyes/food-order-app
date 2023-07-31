import React, { useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartModal, setCartModal] = useState(false);

  const cartBtnToggleHandler = function () {
    setCartModal(!cartModal)
  }

  return (
    <CartProvider>
      {cartModal && <Cart onClose={cartBtnToggleHandler}/>}
      <Header onShowCart={cartBtnToggleHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;


