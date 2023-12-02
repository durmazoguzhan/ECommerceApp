import React, { useEffect } from "react";
import Coupon from "./Coupon";
import TotalCart from "./TotalCart";
import { Link } from "react-router-dom";
import img from "../../assets/img/common/empty-cart.png";
import { useDispatch, useSelector } from "react-redux";
import { getCartByUserId } from "../../app/slices/cart";
import { removeFromCart } from "../../app/slices/cart";
import { getAllProducts } from "../../app/slices/product";
import { IKImage } from "imagekitio-react";
import { updateCart } from "../../app/slices/cart";

const CartArea = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);
  const userId = user ? user.id : null;
  const cart = useSelector((state) => state.carts.cart);
  const products = useSelector((state) => state.products.products);
  let cartTotal = null;
  if (user && cart && products) {
    cart.cartDetails.map(
      (detail) =>
        (cartTotal += products.find((product) => product.id === detail.productId)
          ? products.find((product) => product.id === detail.productId).salePrice
          : 0 * detail.count)
    );
  }

  useEffect(() => {
    dispatch(getCartByUserId({ userId: userId }));
    dispatch(getAllProducts());
  }, [dispatch, userId]);

  const removeDetailFromCart = async (cartDetailId) => {
    dispatch(removeFromCart({ cartDetailId: cartDetailId, token: user.token }));
  };

  const clearCart = () => {
    cart.cartDetails.map((cartDetail) =>
      dispatch(removeFromCart({ cartDetailId: cartDetail.id, token: user.token }))
    );
  };

  const handleCountChange = (cartDetailId, event) => {
    const index = cart.cartDetails.findIndex((cartDetail) => cartDetail.id === cartDetailId);
    const updatedCartDetail = {
      ...cart.cartDetails[index],
      count: event.target.value,
    };
    const updatedCart = {
      ...cart,
      cartHeader: { ...cart.cartHeader, id: undefined },
      cartDetails: [
        ...cart.cartDetails.slice(0, index),
        updatedCartDetail,
        ...cart.cartDetails.slice(index + 1),
      ].map((cartDetail) => {
        const { cartHeader, id, cartHeaderId, ...rest } = cartDetail;
        return rest;
      }),
    };
    dispatch(updateCart({ data: updatedCart }));
  };

  const handleSizeChange = (cartDetailId, event) => {
    const index = cart.cartDetails.findIndex((cartDetail) => cartDetail.id === cartDetailId);
    const updatedCartDetail = {
      ...cart.cartDetails[index],
      size: event.target.value,
    };
    const updatedCart = {
      ...cart,
      cartHeader: { ...cart.cartHeader, id: undefined },
      cartDetails: [
        ...cart.cartDetails.slice(0, index),
        updatedCartDetail,
        ...cart.cartDetails.slice(index + 1),
      ].map((cartDetail) => {
        const { cartHeader, id, cartHeaderId, ...rest } = cartDetail;
        return rest;
      }),
    };
    dispatch(updateCart({ data: updatedCart }));
  };

  return (
    <>
      {cart && cart.cartDetails.length ? (
        <section id="cart_area_one" className="ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="table_desc">
                  <div className="table_page table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th className="product_remove">Kaldır</th>
                          <th className="product_thumb">Resim</th>
                          <th className="product_name">Ürün</th>
                          <th className="product-price">Fiyat</th>
                          <th className="product_quantity">Beden</th>
                          <th className="">Miktar</th>
                          <th className="product_total">Toplam</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.cartDetails.map(
                          (cartDetail) =>
                            products.find((product) => product.id === cartDetail.productId) && (
                              <tr key={cartDetail.id}>
                                <td className="product_remove">
                                  <i
                                    className="fa fa-trash text-danger"
                                    onClick={() => removeDetailFromCart(cartDetail.id)}
                                    style={{ cursor: "pointer" }}
                                  ></i>
                                </td>
                                <td className="product_thumb">
                                  <Link to={`/product-details-two/${cartDetail.productId}`}>
                                    <IKImage
                                      path={`/ProductImages/${
                                        products.find((product) => product.id === cartDetail.productId) &&
                                        products
                                          .find((product) => product.id === cartDetail.productId)
                                          .images.split(",")[0]
                                      }`}
                                    />
                                  </Link>
                                </td>
                                <td className="product_name">
                                  <Link to={`/product-details-two/${cartDetail.productId}`}>
                                    {products.find((product) => product.id === cartDetail.productId) &&
                                      products.find((product) => product.id === cartDetail.productId).name}
                                  </Link>
                                </td>
                                <td className="product-price">
                                  {products.find((product) => product.id === cartDetail.productId) &&
                                    products
                                      .find((product) => product.id === cartDetail.productId)
                                      .salePrice.toFixed(2)}{" "}
                                  TL
                                </td>
                                <td className="">
                                  <select
                                    className="p-3"
                                    defaultValue={cartDetail.size}
                                    onChange={(event) => handleSizeChange(cartDetail.id, event)}
                                  >
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                  </select>
                                </td>
                                <td className="product_quantity">
                                  <input
                                    min="1"
                                    max="100"
                                    type="number"
                                    defaultValue={cartDetail.count}
                                    onChange={(event) => handleCountChange(cartDetail.id, event)}
                                  />
                                </td>
                                <td className="product_total">
                                  {(
                                    products.find((product) => product.id === cartDetail.productId)
                                      .salePrice * cartDetail.count
                                  ).toFixed(2)}{" "}
                                  TL
                                </td>
                              </tr>
                            )
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="cart_submit">
                    {cart.cartDetails.length ? (
                      <button
                        className="theme-btn-one btn-black-overlay btn_sm"
                        type="button"
                        onClick={() => clearCart()}
                      >
                        Sepeti Temizle
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
              <Coupon />
              <TotalCart />
            </div>
          </div>
        </section>
      ) : (
        <section id="empty_cart_area" className="ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                <div className="empaty_cart_area">
                  <img src={img} alt="img" />
                  <h2>SEPETİNİZ BOŞ</h2>
                  <Link to="/shop" className="btn btn-black-overlay btn_sm">
                    Alışverişe Devam
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CartArea;
