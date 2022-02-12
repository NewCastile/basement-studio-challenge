import Image from "next/image";
import {useContext, useState} from "react";

import {CartContext} from "../../pages/_app";
import {IProduct} from "../../product/types";

export default function CartProduct(product: IProduct) {
  const {dispatcher} = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="w-full flex flex-row justify-center align-center p-3 space-x-5 border-2 border-white">
      <div className="relative w-2/6 h-full">
        <Image
          alt="product-image"
          height={"40%"}
          layout="responsive"
          objectFit="contain"
          src={product.image}
          width={30}
        />
      </div>
      <div className="w-4/6 flex flex-col justify-between align-start text-4xl">
        <div className="flex flex-col justify-center align-start">
          <p className="uppercase font-black">{product.name}</p>
          <p className="capitalize text-2xl text-gray-300">{product.description}</p>
        </div>
        <div className="flex flex-col justify-center align-start space-y-3 text-2xl font-black">
          <div className="w-max flex flex-row justify-center align-center space-x-4">
            <span className="flex flex-col justify-center align-center text-center uppercase">
              quantity:
            </span>{" "}
            <span className="w-24 flex flex-row justify-around align-center border-2 white rounded-full">
              <button
                onClick={() => {
                  if (quantity === 1) return dispatcher.deleteFromCart(product);
                  setQuantity((old) => old - 1);
                }}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => {
                  setQuantity((old) => old + 1);
                }}
              >
                +
              </button>
            </span>
          </div>
          <div className="w-full flex flex-row justify-between align-center space-x-4 uppercase">
            <div className="flex flex-row justify-between align-center space-x-4">
              <span className="flex flex-col justify-center align-center text-center uppercase">
                {product.options.label}:{" "}
              </span>
              <span className="inline-block space-x-4">
                {product.options.values.map((size, sizeIdx) => (
                  <button
                    key={sizeIdx}
                    className={`${
                      sizeIdx === selectedSize ? "rounded-full border-2 border-white w-10" : ""
                    }`}
                    onClick={() => {
                      setSelectedSize(sizeIdx);
                    }}
                  >
                    {size}
                  </button>
                ))}
              </span>
            </div>
            <span className="flex text-center text-3xl uppercase">${product.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
