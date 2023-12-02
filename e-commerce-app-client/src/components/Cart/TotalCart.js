import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TotalCart = () => {
  const cart = useSelector((state) => state.carts.cart);
  const user = useSelector((state) => state.users.user);
  const products = useSelector((state) => state.products.products);

  const cartTotal = () => {
    let cartTotal = 0;
    if (user && cart && products) {
      cart.cartDetails.map(
        (detail) =>
          products.find((product) => product.id === detail.productId) &&
          (cartTotal += products.find((product) => product.id === detail.productId).salePrice * detail.count)
      );
    }
    return cartTotal;
  };
  return (
    <>
      <div className="col-lg-6 col-md-6">
        <div className="coupon_code right">
          <h3>Toplam : </h3>
          <div className="coupon_inner">
            <div className="cart_subtotal">
              <p>Ara Toplam : </p>
              <p className="cart_amount">{cartTotal()} TL</p>
            </div>

            <div className="cart_subtotal">
              <p>Toplam</p>
              <p className="cart_amount">{cartTotal()} TL</p>
            </div>
            <div className="checkout_btn">
              <Link to="/checkout-two" className="theme-btn-one btn-black-overlay btn_sm">
                Alışverişi Tamamla
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalCart;
