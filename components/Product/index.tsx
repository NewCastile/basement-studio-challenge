import {useContext, useRef} from "react";
import Image from "next/image";

import {CartContext} from "../../pages/_app";
import {IProduct} from "../../product/types";
import globe from "../../public/globe.svg";

export default function Product(product: IProduct) {
  const {dispatcher} = useContext(CartContext);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <article
      className="flex flex-col justify-center align-center"
      onMouseEnter={() => {
        if (buttonRef.current && overlayRef.current) {
          buttonRef.current.className =
            "w-full h-max absolute z-10 flex flex-col justify-center align-center mx-auto";
          overlayRef.current.className = "w-full h-full bg-black absolute bg-opacity-20";
        }
      }}
      onMouseLeave={() => {
        if (buttonRef.current && overlayRef.current) {
          buttonRef.current.className = "hidden";
          overlayRef.current.className = "hidden";
        }
      }}
    >
      <div className="relative flex flex-col justify-center align-center">
        <button
          ref={buttonRef}
          className="hidden"
          onClick={() => {
            dispatcher.addToCart(product);
          }}
        >
          <Image alt="add-to-cart" src={globe} />
          <div className="w-full absolute text-center uppercase alt-text">add to cart</div>
        </button>
        <div className="w-full h-max self-center bg-gradient-to-b from-black bg-translucent-light bg-opacity-10">
          <Image
            alt={product.name}
            height={"400px"}
            layout={"responsive"}
            src={product.image}
            width={"300px"}
          />
        </div>
        <div ref={overlayRef} className="hidden" />
      </div>
      <div className="flex flex-row justify-between align-center pt-2 border-t-2 border-white ">
        <p className="text-2xl">{product.name}</p>
        <p className="text-2xl">${product.price}</p>
      </div>
    </article>
  );
}
