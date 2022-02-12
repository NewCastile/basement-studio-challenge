import {Dispatch, SetStateAction, useContext} from "react";

import {CartContext} from "../../pages/_app";
import CartProduct from "../Product/cart";

interface CartProps {
  toggleCart: Dispatch<SetStateAction<boolean>>;
}

export default function Cart({toggleCart}: CartProps) {
  const {state: cart} = useContext(CartContext);

  return (
    <div className="w-screen h-full z-80 absolute top-0 right-0 flex flex-col justify-between align-center bg-black space-y-8 lg:w-max lg:h-auto lg:justify-center lg:border-l-2 lg:border-b-2 lg:border-white">
      <div className="flex flex-col justify-between align-center space-y-4 mx-4 lg:mx-8">
        <button
          className="self-end text-2xl mt-4"
          onClick={() => {
            toggleCart(false);
          }}
        >
          <span className="uppercase">→ close</span>
        </button>
        <h2 className="w-full flex flex-col justify-center align-center md:self-center md:flex-row md:space-x-10">
          <div className="text-center text-9xl uppercase">
            your <span className="alt-text">cart</span>
          </div>
        </h2>
        <div
          className={`flex flex-col justify-center align-center space-y-10 ${
            cart.length ? "" : "py-40"
          }`}
        >
          {cart.map((cartProduct, cartProductIdx) => {
            return <CartProduct key={cartProductIdx} {...cartProduct} />;
          })}
        </div>
      </div>
      <div className="flex align-center flex-col mx-4 md:mx-0 md:border-t-2 md:border-white md:flex-row md:justify-between">
        <div className="w-full flex flex-row justify-between align-center p-5 text-4xl uppercase md:block lg:block lg:w-8/12">
          <span>total:</span>
          <span>
            $
            {cart.length
              ? cart.map((product) => product.price).reduce((prev, curr) => prev + curr)
              : 0}
          </span>
        </div>
        <div className="w-full p-5 text-center uppercase text-6xl alt-text border-t-2 border-white md:text-4xl md:w-max md:border-t-0 md:border-l-2 md:border-white lg:text-4xl">
          checkout
        </div>
      </div>
    </div>
  );
}
