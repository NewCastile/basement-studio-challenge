import {Dispatch, SetStateAction, useContext} from "react";

import {CartContext} from "../../pages/_app";
import CartProduct from "../Product/cart";

interface CartProps {
  toggleCart: Dispatch<SetStateAction<boolean | null>>;
}

export default function Cart({toggleCart}: CartProps) {
  const {state: cart} = useContext(CartContext);

  return (
    <div className="z-80 align-center lg:w-max lg:h-auto lg:justify-center lg:border-l-2 lg:border-b-2 lg:border-white absolute top-0 right-0 flex flex-col justify-between w-screen h-full space-y-8 bg-black">
      <div className="align-center lg:mx-8 flex flex-col justify-between mx-4 space-y-4">
        <button
          className="self-end mt-4 text-2xl"
          onClick={() => {
            toggleCart(false);
          }}
        >
          <span className="uppercase">→ close</span>
        </button>
        <h2 className="align-center md:self-center md:flex-row md:space-x-10 flex flex-col justify-center w-full">
          <div className="sm:text-9xl text-6xl text-center uppercase">
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
      <div className="align-center md:mx-0 md:border-t-2 md:border-white md:flex-row md:justify-between flex flex-col mx-4">
        <div className="align-center md:block lg:block lg:w-8/12 flex flex-row justify-between w-full p-5 space-x-4 text-4xl uppercase">
          <span>total:</span>
          <span>
            $
            {cart.length
              ? cart.map((product) => product.price).reduce((prev, curr) => prev + curr)
              : 0}
          </span>
        </div>
        <div className="sm:text-6xl alt-text md:text-4xl md:w-max md:border-t-0 md:border-l-2 md:border-white lg:text-4xl w-full p-5 text-4xl text-center uppercase border-t-2 border-white">
          checkout
        </div>
      </div>
    </div>
  );
}
