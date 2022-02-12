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
      <div className="relative w-2/6 h-full bg-gradient-to-b from-black bg-translucent-light bg-opacity-10">
        <Image
          alt="product-image"
          height={"40%"}
          layout="responsive"
          objectFit="contain"
          src={product.image}
          width={30}
        />
      </div>
      <div className="w-4/6 flex flex-col justify-center align-start sm:justify-between md:justify-between lg:justify-between">
        <div className="flex flex-col justify-center align-start">
          <p className="uppercase font-black text-lg sm:text-4xl md:text-4xl lg:text-4xl">
            {product.name}
          </p>
          <p className="capitalize text-md sm:text-3xl md:text-3xl lg:text-3xl text-gray-300">
            {product.description}
          </p>
        </div>
        <div className="flex flex-col justify-center align-start space-y-3 font-black">
          <div className="w-max flex flex-row justify-center align-center space-x-4">
            <p className="flex flex-col justify-center align-center text-center uppercase text-sm sm:text-2xl md:text-2xl lg:2xl">
              quantity:
            </p>{" "}
            <span className="w-16 sm:w-24 md:w-24 lg:w-24 flex flex-row justify-around align-center border-2 white rounded-full text-sm sm:text-2xl md:text-2xl lg:2xl">
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
              <span className="flex flex-col justify-center align-center text-center uppercase text-sm sm:text-2xl md:text-2xl lg:2xl">
                {product.options.label}:{" "}
              </span>
              <span className="flex flex-row justify-center align-center space-x-2 sm:space-x-4 md:space-x-4 lg:space-x-4">
                {product.options.values.map((size, sizeIdx) => (
                  <button
                    key={sizeIdx}
                    className={`${
                      sizeIdx === selectedSize
                        ? "rounded-full border-2 border-white w-8 text-sm sm:text-2xl sm:w-10 md:w-10 lg:w-10 md:text-2xl lg:text-2xl"
                        : "text-sm sm:text-2xl md:text-2xl lg:text-2xl"
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
            <span className="flex text-center text-lg sm:text-xl md:text-3xl lg:text-3xl uppercase">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
