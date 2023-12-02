import React from "react";
import Header from "../../components/Common/Header";
import Banner from "../../components/Common/Banner";
import CheckOutTwos from "../../components/Checkout/CheckOutTwo";
import Footer from "../../components/Common/Footer";
import TopHeader from "../../components/Common/Header/TopHeader";

const CheckoutTwo = () => {
  return (
    <>
      <TopHeader />
      <Header />
      <Banner title="Alışverişi Tamamla" />
      <CheckOutTwos />
      <Footer />
    </>
  );
};

export default CheckoutTwo;
