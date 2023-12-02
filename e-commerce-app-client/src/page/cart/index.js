import React from "react";
import Header from "../../components/Common/Header";
import Banner from "../../components/Common/Banner";
import CartArea from "../../components/Cart";
import Footer from "../../components/Common/Footer";
import TopHeader from "../../components/Common/Header/TopHeader";

const Cart = () => {
  return (
    <>
      <TopHeader />
      <Header />
      <Banner title="Alışveriş Sepeti" />
      <CartArea />
      <Footer />
    </>
  );
};

export default Cart;
