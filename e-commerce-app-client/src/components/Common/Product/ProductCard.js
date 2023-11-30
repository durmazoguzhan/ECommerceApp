import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { IKImage } from "imagekitio-react";
import { getBrand } from "../../../app/slices/brand";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProductCard = (props) => {
  const brand = useSelector((state) => state.brands.brand[props.data.brandId]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrand({ id: props.data.brandId }));
  }, [dispatch, props.data.brandId]);

  const addToCart = async (id) => {
    console.log("sepeteEkle tıklandı");
  };

  const addToFavorite = async (id) => {
    console.log("favorilereEkle tıklandı");
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
          <button
            type="button"
            className="add-to-cart offcanvas-toggle"
            onClick={() => addToCart(props.data.id)}
          >
            Sepete Ekle
          </button>
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
