import {useContext, useRef} from "react";
import Image from "next/image";

import {CartContext} from "../../pages/_app";
import {IProduct} from "../../product/types";
import globe from "../../public/globe.svg";

export default function Product(product: IProduct) {
  const {dispatcher} = useContext(CartContext);
  const hoverRef = useRef<HTMLButtonElement>(null);

  return (
    <article
      className="flex flex-col justify-center align-center"
      onMouseEnter={() => {
        if (hoverRef.current) {
          hoverRef.current.className =
            "w-full h-max absolute z-10 flex flex-col justify-center align-center mx-auto";
        }
      }}
      onMouseLeave={() => {
        if (hoverRef.current) {
          hoverRef.current.className = "hidden";
        }
      }}
    >
      <div className="relative flex flex-col justify-center align-center">
        <button
          ref={hoverRef}
          className="hidden"
          onClick={() => {
            dispatcher.addToCart(product);
          }}
        >
          <Image alt="add-to-cart" src={globe} />
          <div className="w-full absolute text-center uppercase alt-text">add to cart</div>
        </button>

        <div className="w-full h-max self-center">
          <Image
            alt={product.name}
            height={"400px"}
            layout={"responsive"}
            src={product.image}
            width={"300px"}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between align-center pt-2 border-t-2 border-white ">
        <p className="text-2xl">{product.name}</p>
        <p className="text-2xl">${product.price}</p>
      </div>
    </article>
  );
}