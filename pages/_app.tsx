import type {AppProps} from "next/app";
import Head from "next/head";
import {createContext, useState} from "react";

import "../css/global.css";
import {IProduct} from "../product/types";

export interface CartContextProps {
  dispatcher: {
    addToCart: (addedProduct: IProduct) => void;
    deleteFromCart: (deletedProduct: IProduct) => void;
  };
  state: IProduct[];
}

export const CartContext = createContext<CartContextProps>({} as CartContextProps);

function App({Component, pageProps}: AppProps) {
  const [cart, setCart] = useState<IProduct[]>([]);

  const addToCart = (addedProduct: IProduct) => {
    if (cart.some((product) => product.id === addedProduct.id)) return;
    setCart((old) => old.concat(addedProduct));
  };

  const deleteFromCart = (deletedProduct: IProduct) => {
    setCart((old) => old.filter((product) => product.id !== deletedProduct.id));
  };

  const dispatcher = {
    addToCart,
    deleteFromCart,
  };

  return (
    <>
      <Head>
        <title>Basement Supply</title>
        <meta content="Coding challenge for basement.studio." name="description" />
      </Head>
      <CartContext.Provider value={{state: cart, dispatcher}}>
        <Component {...pageProps} />
      </CartContext.Provider>
    </>
  );
}
export default App;
