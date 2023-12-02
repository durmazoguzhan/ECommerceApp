import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartByUserId } from "../../app/slices/cart";
import { getAllProducts } from "../../app/slices/product";
import { getCouponByCouponCode } from "../../app/slices/cart";

const YourOrder = () => {
  const cart = useSelector((state) => state.carts.cart);
  const products = useSelector((state) => state.products.products);
  const coupon = useSelector((state) => state.carts.coupon);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartByUserId({ userId: user.id }));
    if (cart) dispatch(getCouponByCouponCode({ couponCode: cart.cartHeader.couponCode }));
    dispatch(getAllProducts());
  }, [dispatch, user.id, cart]);

  const cartTotal = () => {
    return (cartSubTotal() - discountTotal()).toFixed(2);
  };

  const discountTotal = () => {
    return (coupon ? coupon.discountAmount : 0).toFixed(2);
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

  const countTotal = () => {
    let total = 0;
    if (cart) {
      cart.cartDetails.map((detail) => (total += detail.count));
    }
    return total;
  };

  return (
    <>
      {cart && coupon && (
        <div>
          <input name="cartHeaderId" value={cart.cartHeader.id} hidden readOnly />
          <input name="couponCode" value={coupon.couponCode} hidden readOnly />
          <input name="orderTotal" value={cartTotal()} hidden readOnly />
          <input name="discountTotal" value={discountTotal()} hidden readOnly />
          <input name="cartTotalItems" value={countTotal()} hidden readOnly />
        </div>
      )}
      <div className="col-lg-6 col-md-6">
        <h3>SİPARİŞİNİZ</h3>
        <div className="order_table table-responsive">
          <table>
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Toplam</th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                products &&
                cart.cartDetails.map(
                  (cartDetail) =>
                    products.find((product) => product.id === cartDetail.productId) && (
                      <tr key={cartDetail.id}>
                        <td>
                          {products.find((product) => product.id === cartDetail.productId).name}{" "}
                          <strong> × {cartDetail.count}</strong>
                        </td>
                        <td>
                          {(
                            products.find((product) => product.id === cartDetail.productId).salePrice *
                            cartDetail.count
                          ).toFixed(2)}{" "}
                          TL
                        </td>
                      </tr>
                    )
                )}
            </tbody>
            <tfoot>
              <tr>
                <th>Alt Toplam</th>
                <td>{cartSubTotal()} TL</td>
              </tr>
              {coupon && (
                <tr>
                  <th>İndirim ({coupon.couponCode})</th>
                  <td>
                    <strong>-{discountTotal()} TL</strong>
                  </td>
                </tr>
              )}
              <tr className="order_total">
                <th>Sipariş Toplamı </th>
                <td>
                  <strong>{cartTotal()} TL</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="order_button pt-3">
          <button type="submit" className="theme-btn-one btn-black-overlay btn_sm">
            Sipariş Ver
          </button>
        </div>
      </div>
    </>
  );
};

export default YourOrder;
