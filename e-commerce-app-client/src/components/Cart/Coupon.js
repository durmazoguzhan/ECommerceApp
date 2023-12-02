import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCouponByCouponCode } from "../../app/slices/cart";
import { updateCart } from "../../app/slices/cart";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Coupon = () => {
  const cart = useSelector((state) => state.carts.cart);
  const coupon = useSelector((state) => state.carts.coupon);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.cartHeader.couponCode)
      dispatch(getCouponByCouponCode({ couponCode: cart.cartHeader.couponCode }));
  }, [dispatch, cart.cartHeader.couponCode]);

  const searchCode = async (couponCode) => {
    const action = await dispatch(getCouponByCouponCode({ couponCode: couponCode }));
    if (action.payload.result) {
      const updatedCart = {
        ...cart,
        cartHeader: {
          ...cart.cartHeader,
          couponCode: couponCode,
        },
      };
      dispatch(updateCart({ data: updatedCart }));
    } else {
      Swal.fire({
        title: "Başarısız!",
        text: "Girdiğiniz kupon kodu hatalıdır.",
        timer: 2000,
        icon: "error",
      });
    }
  };

  const removeCode = () => {
    dispatch({ type: "cart/removeCoupon" });
    const updatedCart = {
      ...cart,
      cartHeader: {
        ...cart.cartHeader,
        couponCode: "",
      },
    };
    dispatch(updateCart({ data: updatedCart }));
  };

  return (
    <>
      <div className="col-lg-6 col-md-6">
        <div className="coupon_code left">
          <h3>Kupon</h3>
          {coupon ? (
            <div className="coupon_inner mt-2 row justify-content-center align-items-center">
              <input className="col-5" type="text" value={coupon.couponCode} readOnly disabled />
              <button className="btn btn-outline-secondary col-1" onClick={() => removeCode()}>
                <i className="fa fa-remove" />
              </button>
              <h6 className="font-weight-normal txt-alt-primary-clr col-5 mb-0">
                {coupon.discountAmount.toFixed(2)}TL tutarında indirim eklendi!
              </h6>
            </div>
          ) : (
            <div className="coupon_inner mt-2">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  searchCode(event.target.elements.couponInput.value);
                }}
              >
                <input
                  name="couponInput"
                  className="mb-2"
                  placeholder="Kupon kodunuz..."
                  type="text"
                  required
                />
                <button type="submit" className="theme-btn-one btn-black-overlay btn_sm">
                  Uygula
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Coupon;
