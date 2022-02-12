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
  const [showCart, setShowCart] = useState<boolean>(false);
  const {state: cart} = useContext(CartContext);

  return (
    <>
      {showCart && <Cart toggleCart={setShowCart} />}
      <div
        className={`lg:flex lg:flex-col lg:justify-center lg:align-center lg:mt-4 lg:h-max lg:space-y-6 ${
          showCart ? "hidden sm:hidden md:hidden" : " "
        } `}
      >
        <header className="w-full relative flex flex-row justify-between align-center max-w-screen-xl px-5 mt-4 mb-8 mx-auto">
          <div className="hidden sm:flex">
            <Image alt="logo" height={"50%"} src={logo} />
          </div>
          <div className="flex sm:hidden">
            <Image alt="logo" height={"50%"} src={logoSm} />
          </div>
          <button
            className="w-28 text-sm font-bold uppercase rounded-full border border-white"
            onClick={() => setShowCart(true)}
          >
            cart ({cart.length})
          </button>
        </header>
        <main className="flex flex-col justify-center align-center space-y-10">
          <section className="w-full max-w-screen-xl relative flex flex-col justify-center align-center mx-auto px-5">
            <Image alt={"header"} src={header} />
          </section>
          <section className="relative w-full mx-auto border-t-2 border-b-2 border-white">
            <div className="hidden sm:block relative max-w-screen-xl w-full mx-auto">
              <div className="flex flex-col justify-center align-center z-10 absolute left-20">
                <Image alt={"asterisk"} height={"150px"} src={asterisk} width={"150px"} />
              </div>
              <div className="flex flex-col justify-center align-cente z-10 absolute right-20 -bottom-10 r">
                <Image alt={"asterisk-atl"} height={"150px"} src={asteriskAlt} width={"150px"} />
              </div>
            </div>
            <div className="relative z-0 h-16 w-full flex flex-col justify-center align-center overflow-hidden">
              <div className="text-3xl w-max">
                A man can&apos;t have enough basement swag  —  A man can&apos;t have enough basement
                swag  —  A man can&apos;t have enough basement swag  —  A man can&apos;t have enough
                basement swag  —  A man can&apos;t have enough basement swag{" "}
              </div>
            </div>
          </section>
          <section className="w-full max-w-screen-xl flex flex-col mx-auto px-5 md:grid md:grid-cols-3 md:gap-10 ">
            {products.map((product: IProduct, productIdx: number) => {
              return <Product key={productIdx} {...product} />;
            })}
          </section>
        </main>
        <footer>
          <div className="width-full max-w-screen-xl flex flex-col justify-center align-center mt-10 mx-auto px-5">
            <Image alt={"footer"} src={footer} />
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
