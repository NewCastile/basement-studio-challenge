import Image from "next/image";
import {useContext, useState} from "react";

import {CartContext} from "../../pages/_app";
import {IProduct} from "../../product/types";

export default function CartProduct(product: IProduct) {
  const {dispatcher} = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="align-center flex flex-row justify-center w-full p-3 space-x-5 border-2 border-white">
      <div className="bg-gradient-to-b from-black bg-translucent-light bg-opacity-10 relative w-2/6 h-full">
        <Image
          alt="product-image"
          height={"40%"}
          layout="responsive"
          objectFit="contain"
          src={product.image}
          width={30}
        />
      </div>
      <div className="align-start sm:justify-between md:justify-between lg:justify-between flex flex-col justify-center w-4/6">
        <div className="align-start flex flex-col justify-center">
          <p className="sm:text-4xl md:text-4xl lg:text-4xl text-lg font-black uppercase">
            {product.name}
          </p>
          <p className="text-md sm:text-3xl md:text-3xl lg:text-3xl text-gray-300 capitalize">
            {product.description}
          </p>
        </div>
        <div className="align-start flex flex-col justify-center space-y-3 font-black">
          <div className="w-max align-center flex flex-row justify-center space-x-4">
            <p className="align-center sm:text-2xl md:text-2xl lg:2xl flex flex-col justify-center text-sm text-center uppercase">
              quantity:
            </p>{" "}
            <span className="sm:w-24 md:w-24 lg:w-24 align-center white sm:text-2xl md:text-2xl lg:2xl flex flex-row justify-around w-16 text-sm border-2 rounded-full">
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
          <div className="align-center flex flex-row justify-between w-full space-x-4 uppercase">
            <div className="align-center flex flex-row justify-between space-x-4">
              <span className="align-center sm:text-2xl md:text-2xl lg:2xl flex flex-col justify-center text-sm text-center uppercase">
                {product.options.label}:{" "}
              </span>
              <span className="align-center sm:space-x-4 md:space-x-4 lg:space-x-4 flex flex-row justify-center space-x-2">
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
            <span className="sm:text-xl md:text-3xl lg:text-3xl flex text-lg text-center uppercase">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
