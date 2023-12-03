import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/img/common/empty-cart.png";
import { getAllProducts } from "../../app/slices/product";
import { getFavoriteByUserId } from "../../app/slices/favorite.jsx";
import { IKImage } from "imagekitio-react";
import { removeFromFavorite } from "../../app/slices/favorite.jsx";

const WishArea = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);
  const userId = user ? user.id : null;
  const favorite = useSelector((state) => state.favorites.favorite);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(getFavoriteByUserId({ userId: userId }));
    dispatch(getAllProducts());
  }, [dispatch, userId]);

  const removeDetailFromFavorite = async (favoriteDetailId) => {
    dispatch(removeFromFavorite({ favoriteDetailId: favoriteDetailId, token: user.token }));
  };

  const clearFavorite = () => {
    favorite.favoriteDetails.map((favoriteDetail) =>
      dispatch(removeFromFavorite({ favoriteDetailId: favoriteDetail.id, token: user.token }))
    );
  };

  return (
    <>
      {favorite && favorite.favoriteDetails.length ? (
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
                        </tr>
                      </thead>
                      <tbody>
                        {favorite.favoriteDetails.map(
                          (detail) =>
                            products.find((product) => product.id === detail.productId) && (
                              <tr key={detail.id}>
                                <td className="product_remove">
                                  <i
                                    className="fa fa-trash text-danger"
                                    onClick={() => removeDetailFromFavorite(detail.id)}
                                    style={{ cursor: "pointer" }}
                                  ></i>
                                </td>
                                <td className="product_thumb">
                                  <Link to={`/product-details-two/${detail.productId}`}>
                                    <IKImage
                                      path={`/ProductImages/${
                                        products
                                          .find((product) => product.id === detail.productId)
                                          .images.split(",")[0]
                                      }`}
                                    />
                                  </Link>
                                </td>
                                <td className="product_name">
                                  <Link to={`/product-details-two/${detail.productId}`}>
                                    {products.find((product) => product.id === detail.productId).name}
                                  </Link>
                                </td>
                                <td className="product-price">
                                  {products
                                    .find((product) => product.id === detail.productId)
                                    .salePrice.toFixed(2)}{" "}
                                  TL
                                </td>
                              </tr>
                            )
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="cart_submit">
                    {favorite && favorite.favoriteDetails.length ? (
                      <button
                        className="theme-btn-one btn-black-overlay btn_sm"
                        type="button"
                        onClick={() => clearFavorite()}
                      >
                        Favorileri Temizle
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
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
                  <h2>Favoriniz Yok</h2>
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

export default WishArea;
