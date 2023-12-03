import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { IKImage } from "imagekitio-react";
import { getBrand } from "../../../app/slices/brand";
import { createUpdateCart } from "../../../app/slices/cart";
import { createUpdateFavorite } from "../../../app/slices/favorite";
import { useAuth } from "oidc-react";

const ProductCard = (props) => {
  const brand = useSelector((state) => state.brands.brand[props.data.brandId]);
  const user = useSelector((state) => state.users.user);

  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    dispatch(getBrand({ id: props.data.brandId }));
  }, [dispatch, props.data.brandId]);

  const addToCart = async (productId) => {
    if (user) {
      const data = {
        CartHeader: {
          userId: user.id,
          couponCode: null,
        },
        CartDetails: [
          {
            productId: productId,
            count: 1,
            size: "M",
          },
        ],
      };
      dispatch(createUpdateCart({ data: data, token: user.token }));
    } else auth.signIn();
  };

  const addToFavorite = async (productId) => {
    if (user) {
      const data = {
        FavoriteHeader: {
          userId: parseInt(user.id),
        },
        FavoriteDetails: [
          {
            productId: parseInt(productId),
          },
        ],
      };
      dispatch(createUpdateFavorite({ data: data, token: user.token }));
    } else auth.signIn();
  };

  return (
    <>
      <div className="product_wrappers_one">
        <div className="thumb">
          <Link to={`/product-details-two/${props.data.id}`} className="image">
            <IKImage path={`/ProductImages/${props.data.images.split(",")[0]}`} />
          </Link>
          <span className="badges">
            {props.data.salePrice > 500 && <span>Kargo Bedava</span>}
            {props.data.salePrice < props.data.listPrice && <span className="bg-primary-clr">İndirim</span>}
          </span>
          <div className="actions">
            <a
              href="#!"
              className="action wishlist"
              title="Favorilere Ekle"
              onClick={() => addToFavorite(props.data.id)}
            >
              <AiOutlineHeart />
            </a>
          </div>
          {props.data.quantity > 0 ? (
            <button
              type="button"
              className="add-to-cart offcanvas-toggle"
              onClick={() => addToCart(props.data.id)}
            >
              Sepete Ekle
            </button>
          ) : (
            <button type="button" className="add-to-cart offcanvas-toggle" disabled>
              Tükendi
            </button>
          )}
        </div>
        <div className="content">
          <h5 className="title">
            {brand && <span className="txt-alt-primary-clr">{brand.name}</span>}
            <Link to={`/product-details-two/${props.data.id}`}>{props.data.name}</Link>
          </h5>
          <span className="price">
            <span className="new">{props.data.salePrice.toFixed(2)} TL</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
