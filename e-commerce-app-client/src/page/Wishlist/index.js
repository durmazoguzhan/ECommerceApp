import React from "react";
import Header from "../../components/Common/Header";
import Banner from "../../components/Common/Banner";
import Footer from "../../components/Common/Footer";
import WishArea from "../../components/Wishlist";
import TopHeader from "../../components/Common/Header/TopHeader";

const Favorites = () => {
  return (
    <>
      <TopHeader />
      <Header />
      <Banner title="Favoriler" />
      <WishArea />
      <Footer />
    </>
  );
};

export default Favorites;
