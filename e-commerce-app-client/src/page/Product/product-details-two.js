import React from "react";
import Header from "../../components/Common/Header";
import Banner from "../../components/Common/Banner";
import ProductDetailsTwos from "../../components/Common/ProductDetails/ProductDetailsTwo";
import Footer from "../../components/Common/Footer";
import TopHeader from "../../components/Common/Header/TopHeader";

const ProductDetailsTwo = () => {
  return (
    <>
      <TopHeader />
      <Header />
      <Banner title="Ürün Detay" />
      <ProductDetailsTwos />
      <Footer />
    </>
  );
};

export default ProductDetailsTwo;
