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
      className="align-center flex flex-col justify-center"
      onMouseEnter={() => {
        if (buttonRef.current && overlayRef.current) {
          buttonRef.current.className =
            "h-max align-center absolute z-10 flex flex-col justify-center w-full mx-auto";
          overlayRef.current.className = "bg-opacity-20 absolute w-full h-full bg-black";
        }
      }}
      onMouseLeave={() => {
        if (buttonRef.current && overlayRef.current) {
          buttonRef.current.className = "hidden";
          overlayRef.current.className = "hidden";
        }
      }}
    >
      <div className="align-center relative flex flex-col justify-center">
        <button
          ref={buttonRef}
          className="hidden"
          onClick={() => {
            dispatcher.addToCart(product);
          }}
        >
          <div className="flex flex-col w-full">
            <Image alt="add-to-cart" src={globe} />
          </div>
          <div className="alt-text absolute w-full text-center uppercase">add to cart</div>
        </button>
        <div className="h-max bg-gradient-to-b from-black bg-translucent-light bg-opacity-10 self-center w-full">
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
      <div className="align-center flex flex-row justify-between pt-2 border-t-2 border-white">
        <p className="text-2xl">{product.name}</p>
        <p className="text-2xl">${product.price}</p>
      </div>
    </article>
  );
}
