import React, { useEffect } from "react";
import YourOrder from "./YourOrder";
import { useSelector, useDispatch } from "react-redux";
import { getCartByUserId } from "../../app/slices/cart";
import { checkoutCart } from "../../app/slices/cart";
import { useNavigate } from "react-router-dom";

const CheckOutTwo = () => {
  const user = useSelector((state) => state.users.user);
  const cart = useSelector((state) => state.carts.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartByUserId({ userId: user.id }));
  }, [dispatch, user.id]);

  const sendToCheckout = async (elements) => {
    const checkoutDto = {
      CartHeaderId: parseInt(elements.cartHeaderId.value),
      UserId: String(user.id),
      CouponCode: String(elements.couponCode.value),
      OrderTotal: parseFloat(elements.orderTotal.value),
      DiscountTotal: parseFloat(elements.discountTotal.value),
      FirstName: String(elements.firstName.value),
      LastName: String(elements.lastName.value),
      PickupDateTime: new Date().toISOString(),
      Phone: String(elements.phone.value),
      Email: String(elements.email.value),
      CardNumber: String(elements.cardNumber.value),
      CVV: String(elements.cvv.value),
      ExpiryMonth: String(elements.expiryMonth.value),
      ExpiryYear: String(elements.expiryYear.value),
      CartTotalItems: parseInt(elements.cartTotalItems.value),
      CartDetails: cart.cartDetails,
    };
    const action = await dispatch(checkoutCart({ data: checkoutDto, token: user.token }));
    if (action.payload && action.payload.isSuccess) navigate("/order-complete", { replace: true });
  };

  return (
    <>
      <section id="checkout_two" className="ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="checkout_area_two">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    sendToCheckout(event.target.elements);
                  }}
                >
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="checkout_form_area">
                        <h3>ÖDEME BİLGİLERİ</h3>
                        <div className="pt-4">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="default-form-box pb-3">
                                <label>
                                  Adınız<span className="text-danger">*</span>
                                </label>
                                <input
                                  name="firstName"
                                  type="text"
                                  className="form-control"
                                  defaultValue={user.firstName}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="default-form-box pb-3">
                                <label>
                                  Soyadınız <span className="text-danger">*</span>
                                </label>
                                <input
                                  name="lastName"
                                  type="text"
                                  className="form-control"
                                  defaultValue={user.lastName}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="default-form-box pb-3">
                                <label>
                                  Telefon <span className="text-danger">*</span>
                                </label>
                                <input
                                  name="phone"
                                  type="number"
                                  className="form-control no-spinners"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="default-form-box">
                                <label>
                                  Email Adresiniz<span className="text-danger">*</span>
                                </label>
                                <input name="email" type="email" className="form-control" required />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="default-form-box pb-3">
                                <label>
                                  Kart Numarası <span className="text-danger">*</span>
                                </label>
                                <input
                                  name="cardNumber"
                                  defaultValue={5528790000000008}
                                  type="number"
                                  className="form-control no-spinners"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="default-form-box pb-3">
                                <label>
                                  CVV <span className="text-danger">*</span>
                                </label>
                                <input
                                  name="cvv"
                                  defaultValue={123}
                                  type="number"
                                  className="form-control no-spinners"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="default-form-box pb-3">
                                <label>
                                  Ay <span className="text-danger">*</span>
                                </label>
                                <input
                                  name="expiryMonth"
                                  defaultValue={12}
                                  type="number"
                                  className="form-control no-spinners"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="default-form-box pb-3">
                                <label>
                                  Yıl <span className="text-danger">*</span>
                                </label>
                                <input
                                  name="expiryYear"
                                  defaultValue={2030}
                                  type="number"
                                  className="form-control no-spinners"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <YourOrder />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckOutTwo;
