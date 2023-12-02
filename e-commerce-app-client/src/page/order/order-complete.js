import React from "react";
import Header from "../../components/Common/Header";
import Banner from "../../components/Common/Banner";
import OrderCompleted from "../../components/OrderCompleted";
import Footer from "../../components/Common/Footer";
import TopHeader from "../../components/Common/Header/TopHeader";

const OrderComplete = () => {
  return (
    <>
      <TopHeader />
      <Header />
      <Banner title="Siparişiniz Alındı" />
      <OrderCompleted />
      <Footer />
    </>
  );
};

export default OrderComplete;
