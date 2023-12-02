import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TotalCart = () => {
  const cart = useSelector((state) => state.carts.cart);
  const products = useSelector((state) => state.products.products);
  const coupon = useSelector((state) => state.carts.coupon);

  const cartTotal = () => {
    return (cartSubTotal() - (coupon ? coupon.discountAmount : 0)).toFixed(2);
  };

  const cartSubTotal = () => {
    let cartTotal = 0;
    if (cart && products) {
      cart.cartDetails.map(
        (detail) =>
          products.find((product) => product.id === detail.productId) &&
          (cartTotal += products.find((product) => product.id === detail.productId).salePrice * detail.count)
      );
    }
    return cartTotal.toFixed(2);
  };

  return (
    <>
      <div className="col-lg-6 col-md-6">
        <div className="coupon_code right">
          <h3>Toplam : </h3>
          <div className="coupon_inner">
            <div className="cart_subtotal">
              <p>Alt Toplam : </p>
              <p className="cart_amount">{cartSubTotal()} TL</p>
            </div>
            {coupon && (
              <div className="cart_subtotal">
                <p>Kupon İndirimi({coupon.couponCode}) : </p>
                <p className="cart_amount">-{coupon.discountAmount.toFixed(2)} TL</p>
              </div>
            )}
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
