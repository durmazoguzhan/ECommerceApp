import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { IKImage } from "imagekitio-react";
import ProductInfo from "./ProductInfo";
import { getProduct } from "../../../app/slices/product";
import { getBrand } from "../../../app/slices/brand";

const ProductDetailsTwo = () => {
  useEffect(() => {
    window.scrollTo(0, document.body.offsetHeight / 1.7);
  }, []);

  const { id } = useParams();
  const product = useSelector((state) => state.products.product[id]);
  const brandId = product ? product.brandId : null;
  const brand = useSelector((state) => state.brands.brand[brandId]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct({ id: id }));
    dispatch(getBrand({ id: brandId }));
  }, [dispatch, id, brandId]);

  // Quenty Inc Dec
  const [count, setCount] = useState(1);
  const incNum = () => {
    setCount(count + 1);
  };

  const decNum = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      alert("Stokta Yok!");
      setCount(0);
    }
  };

  let settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      {product ? (
        <section id="product_single_two" className="ptb-100">
          <div className="container">
            <div className="row area_boxed">
              <div className="col-lg-4">
                <div className="product_single_two_img slider-for">
                  <Slider {...settings}>
                    {product.images.split(",").map((image, index) => (
                      <IKImage path={`/ProductImages/${image}`} key={index} />
                    ))}
                  </Slider>
                </div>
              </div>
              <div className="col-lg-8">
                <div>
                  <div className="modal_product_content_one">
                    <h3>{product.name}</h3>
                    <h5 className="txt-alt-secondary-clr pt-1 font-weight-bold">{brand && brand.name}</h5>
                    <h4>
                      {product.salePrice.toFixed(2)} TL
                      {product.listPrice > product.salePrice && <del>{product.listPrice.toFixed(2)} TL</del>}
                    </h4>
                    <p>{product.description}</p>
                    <div className="customs_selects">
                      <select name="size" className="customs_sel_box">
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>
                    </div>
                    <form id="product_count_form_two">
                      <div className="product_count_one">
                        <div className="plus-minus-input">
                          <div className="input-group-button">
                            <button type="button" className="button" onClick={decNum}>
                              <i className="fa fa-minus"></i>
                            </button>
                          </div>
                          <input className="form-control" type="number" value={count} readOnly />
                          <div className="input-group-button">
                            <button type="button" className="button" onClick={incNum}>
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="links_Product_areas">
                      <ul>
                        <li>
                          <a href="#!" className="action wishlist" title="Wishlist">
                            <i className="fa fa-heart"></i>Favorilere Ekle
                          </a>
                        </li>
                      </ul>
                      <a href="#!" className="theme-btn-one btn-black-overlay btn_sm">
                        Sepete Ekle
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ProductInfo data={product} />
          </div>
        </section>
      ) : (
        <div className="container ptb-100">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
              <div className="empaty_cart_area">
                <IKImage path={`/product_not_found.webp`} />
                <h2>Ürün Bulunamadı</h2>
                <Link to="/shop" className="btn btn-black-overlay btn_sm">
                  Alışverişe Devam
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailsTwo;
