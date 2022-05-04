import type {NextPage} from "next";
import Image from "next/image";
import {useContext, useState} from "react";

import logo from "../public/logo.svg";
import logoSm from "../public/logo-sm.svg";
import header from "../public/header.svg";
import footer from "../public/footer.svg";
import asterisk from "../public/asterisk.svg";
import asteriskAlt from "../public/asterisk-alt.svg";
import products from "../product/mock.json";
import {IProduct} from "../product/types";
import Cart from "../components/Cart";
import Product from "../components/Product";

import {CartContext} from "./_app";

const Home: NextPage = () => {
  const [showCart, setShowCart] = useState<boolean | null>(null);
  const {state: cart} = useContext(CartContext);

  return (
    <>
      {showCart === true ? (
        <div className="fade-in bg-opacity-60 absolute z-20 w-full h-full overflow-hidden bg-black">
          <Cart toggleCart={setShowCart} />
        </div>
      ) : showCart === false ? (
        <div className="fade-out bg-opacity-60 absolute z-20 w-full h-full overflow-hidden bg-black">
          <Cart toggleCart={setShowCart} />
        </div>
      ) : null}
      <div
        className={`lg:h-max lg:flex lg:flex-col lg:justify-center lg:align-center lg:mt-4 lg:space-y-6 ${
          showCart ? "hidden sm:hidden md:hidden" : " "
        } `}
      >
        <header className="align-center relative flex flex-row justify-between w-full max-w-screen-xl px-5 mx-auto mt-4 mb-8">
          <div className="sm:flex hidden">
            <Image alt="logo" height={"50%"} src={logo} />
          </div>
          <div className="sm:hidden flex">
            <Image alt="logo" height={"50%"} src={logoSm} />
          </div>
          <button
            className="w-28 text-sm font-bold uppercase border border-white rounded-full"
            onClick={() => setShowCart(true)}
          >
            cart ({cart.length})
          </button>
        </header>
        <main className="align-center flex flex-col justify-center space-y-10">
          <section className="align-center relative flex flex-col justify-center w-full max-w-screen-xl px-5 mx-auto">
            <Image alt={"header"} src={header} />
          </section>
          <section className="relative w-full mx-auto border-t-2 border-b-2 border-white">
            <div className="sm:block relative hidden w-full max-w-screen-xl mx-auto">
              <div className="align-center left-20 absolute z-10 flex flex-col justify-center">
                <Image alt={"asterisk"} height={"150px"} src={asterisk} width={"150px"} />
              </div>
              <div className="align-center right-20 -bottom-10 r absolute z-10 flex flex-col justify-center">
                <Image alt={"asterisk-atl"} height={"150px"} src={asteriskAlt} width={"150px"} />
              </div>
            </div>
            <div className="align-center relative z-0 flex flex-col justify-center w-full h-16 overflow-hidden">
              <div className="slide-in w-max text-3xl">
                {Array(6).fill("A man can't have enough basement swag  —  ")}
              </div>
            </div>
          </section>
          <section className="md:grid md:grid-cols-3 md:gap-10 flex flex-col w-full max-w-screen-xl px-5 mx-auto">
            {products.map((product: IProduct, productIdx: number) => {
              return <Product key={productIdx} {...product} />;
            })}
          </section>
        </main>
        <footer>
          <div className="width-full align-center flex flex-col justify-center max-w-screen-xl px-5 mx-auto mt-10">
            <Image alt={"footer"} src={footer} />
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
