import logo from "../../../assets/img/logo.png";
import { MenuData } from "./MenuData";
import NaveItems from "./NaveItems";
import svg from "../../../assets/img/svg/cancel.svg";
import logoWhite from "../../../assets/img/logo-white.png";
import svgsearch from "../../../assets/img/svg/search.svg";
import { getCartByUserId } from "../../../app/slices/cart";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "oidc-react";
import React, { useState, useEffect } from "react";
import { IKImage } from "imagekitio-react";
import { removeFromCart } from "../../../app/slices/cart";

const Header = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

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
  }, [dispatch, userId]);

  const [click, setClick] = useState(false);
  const history = useNavigate();

  const favorites = null;

  const removeDetailFromCart = async (cartDetailId) => {
    dispatch(removeFromCart({ cartDetailId: cartDetailId, token: user.token }));
  };

  const handleClick = () => {
    if (user) {
      if (click) {
        document.querySelector("#offcanvas-add-cart").style = "transform: translateX(100%);";
      } else {
        document.querySelector("#offcanvas-add-cart").style = "transform: translateX(0%);";
      }
      setClick(!click);
    } else auth.signIn();
  };

  const handleWish = () => {
    if (user) {
      if (click) {
        document.querySelector("#offcanvas-wishlish").style = "transform: translateX(100%);";
      } else {
        document.querySelector("#offcanvas-wishlish").style = "transform: translateX(0);";
      }
      setClick(!click);
    } else auth.signIn();
  };

  const handleSearch = () => {
    if (click) {
      document.querySelector("#search").style = "transform: translate(-100%, 0); opacity: 0";
    } else {
      document.querySelector("#search").style = "transform: translate(0px, 0px); opacity: 1";
    }
    const aramaCubugu = document.getElementById("searchDeneme");
    const aramaCubuguIcindekiDeger = String(aramaCubugu.value);
    console.log(aramaCubuguIcindekiDeger);

    setClick(!click);
  };

  const handleabout = () => {
    if (click) {
      document.querySelector("#offcanvas-about").style = "transform: translateX(100%);";
    } else {
      document.querySelector("#offcanvas-about").style = "transform: translateX(0%);";
    }
    setClick(!click);
  };

  const handlemenu = () => {
    if (click) {
      document.querySelector("#mobile-menu-offcanvas").style = "transform: translateX(100%);";
    } else {
      document.querySelector("#mobile-menu-offcanvas").style = "transform: translateX(0%);";
    }
    setClick(!click);
  };

  return (
    <div>
      <header className="header-section d-none d-xl-block">
        <div className="header-wrapper">
          <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden">
            <div className="container">
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-between">
                  <div className="header-logo">
                    <div className="logo">
                      <Link to="/">
                        <img src={logo} alt="logo" />
                      </Link>
                    </div>
                  </div>
                  {/* Burası menüyü oluşturan bölüm */}
                  <div className="main-menu menu-color--black menu-hover-color--golden d-none d-xl-block">
                    <nav>
                      <ul>
                        {/* MenuData nın içindeki her bir json objesi için li oluşturulur */}
                        {MenuData.map((item, index) => (
                          <NaveItems item={item} key={index} />
                        ))}
                      </ul>
                    </nav>
                  </div>
                  <ul className="header-action-link action-color--black action-hover-color--golden">
                    <li>
                      {favorites && favorites.length ? (
                        <a href="#offcanvas-wishlish" className="offcanvas-toggle" onClick={handleWish}>
                          <i className="fa fa-heart"></i>
                          <span className="item-count">{favorites.length}</span>
                        </a>
                      ) : (
                        <a href="#offcanvas-wishlish" className="offcanvas-toggle">
                          <i className="fa fa-heart"></i>
                          <span className="item-count">0</span>
                        </a>
                      )}
                    </li>
                    <li>
                      {cart && cart.cartDetails.length ? (
                        <a href="#!" className="offcanvas-toggle" onClick={handleClick}>
                          <i className="fa fa-shopping-bag"></i>
                          <span className="item-count">{cart.cartDetails.length}</span>
                        </a>
                      ) : (
                        <a href="#!" className="offcanvas-toggle">
                          <i className="fa fa-shopping-bag"></i>
                          <span className="item-count">0</span>
                        </a>
                      )}
                    </li>
                    <li>
                      <a href="#search" className="search_width" onClick={handleSearch}>
                        <img src={svgsearch} alt="img" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#offcanvas-about"
                        className="offside-about offcanvas-toggle"
                        onClick={handleabout}
                      >
                        <i className="fa fa-bars"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Ekran küçüldüğünde  sticky menu devreye girer başladı  */}
      <div
        className="mobile-header sticky-header sticky-color--golden 
            mobile-header-bg-color--golden section-fluid d-lg-block d-xl-none"
      >
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-between">
              {/* Burası ekran  logo  devreye girer  */}
              <div className="mobile-header-left">
                <ul className="mobile-menu-logo">
                  <li>
                    <Link to="/">
                      <div className="logo">
                        <img src={logo} alt="logo" />
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Burası ekran  küçüldüğünde devreye girer  */}
              <div className="mobile-right-side">
                <ul
                  className="header-action-link action-color--black 
                                action-hover-color--golden"
                >
                  <li>
                    <a href="#!" className="search_width" onClick={handleSearch}>
                      <img src={svgsearch} alt="img" />
                    </a>
                  </li>
                  <li>
                    {favorites && favorites.length ? (
                      <a href="#offcanvas-wishlish" className="offcanvas-toggle" onClick={handleWish}>
                        <i className="fa fa-heart"></i>
                        <span className="item-count">{favorites.length}</span>
                      </a>
                    ) : (
                      <a href="#offcanvas-wishlish" className="offcanvas-toggle">
                        <i className="fa fa-heart"></i>
                        <span className="item-count">0</span>
                      </a>
                    )}
                  </li>
                  <li>
                    {cart && cart.cartDetails.length ? (
                      <a href="#!" className="offcanvas-toggle" onClick={handleClick}>
                        <i className="fa fa-shopping-bag"></i>
                        <span className="item-count">{cart.cartDetails.length}</span>
                      </a>
                    ) : (
                      <a href="#!" className="offcanvas-toggle">
                        <i className="fa fa-shopping-bag"></i>
                        <span className="item-count">0</span>
                      </a>
                    )}
                  </li>
                  <li>
                    <a href="#!" className="offcanvas-toggle offside-menu" onClick={handlemenu}>
                      <i className="fa fa-bars"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ekran küçüldüğünde  sticky menu devreye girer bitti */}
      {/* Burası ekran  küçüldüğünde hamburger menü  devreye girer  */}
      <div id="mobile-menu-offcanvas" className="offcanvas offcanvas-rightside offcanvas-mobile-menu-section">
        <div className="offcanvas-header text-right">
          <button className="offcanvas-close" onClick={handlemenu}>
            <img src={svg} alt="icon" />
          </button>
        </div>
        <div className="offcanvas-mobile-menu-wrapper">
          <div className="mobile-contact-info">
            <div className="logo">
              <Link to="/">
                <img src={logoWhite} alt="img" />
              </Link>
            </div>
            <address className="address">
              <span>Adres: Beylikdüzü / İstanbul</span>
              <span>Bize Ulaşın: 0123456789, 0123456789</span>
              <span>Email: info@inveshop.com</span>
            </address>
            <ul className="social-link">
              <li>
                <a href="#!">
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
            </ul>
            <ul className="user-link">
              <li>
                <Link to="/wishlist">Favoriler</Link>
              </li>
              <li>
                <Link to="/cart">Alışveriş Sepeti</Link>
              </li>
              <li>
                <Link to="/checkout-two">Alışverişi Tamamla</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Burası ekran büyüdüğünde hamburger menü  devreye girer  */}
      <div id="offcanvas-about" className="offcanvas offcanvas-rightside offcanvas-mobile-about-section">
        <div className="offcanvas-header text-right">
          <button className="offcanvas-close" onClick={handleabout}>
            <img src={svg} alt="icon" />
          </button>
        </div>
        <div className="mobile-contact-info">
          <address className="address">
            <img src={logoWhite} alt="logo" />
            <span>Adres: Beylikdüzü / İstanbul</span>
            <span>Bize Ulaşın: 0123456789, 0123456789</span>
            <span>Email: info@inveshop.com</span>
          </address>
          <ul className="social-link">
            <li>
              <a href="#!">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
          </ul>
          <ul className="user-link">
            <li>
              <Link to="/wishlist">Favoriler</Link>
            </li>
            <li>
              <Link to="/cart">Alışveriş Sepeti</Link>
            </li>
            <li>
              <Link to="/checkout-two">Alışverişi Tamamla</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Sepet Listesi Popup Başladı  */}
      <div id="offcanvas-add-cart" className="offcanvas offcanvas-rightside offcanvas-add-cart-section">
        <div className="offcanvas-header text-right">
          <button className="offcanvas-close" onClick={handleClick}>
            <img src={svg} alt="icon" />
          </button>
        </div>
        <div className="offcanvas-add-cart-wrapper">
          <h4 className="offcanvas-title">Alışveriş Sepeti</h4>
          <ul className="offcanvas-cart">
            {cart &&
              products &&
              cart.cartDetails.map((data) => (
                <li className="offcanvas-wishlist-item-single" key={data.id}>
                  <div className="offcanvas-wishlist-item-block">
                    <Link
                      to={`/product-details-two/${data.productId}`}
                      className="offcanvas-wishlist-item-image-link"
                    >
                      <IKImage
                        path={`/ProductImages/${
                          products.find((product) => product.id === data.productId) &&
                          products.find((product) => product.id === data.productId).images.split(",")[0]
                        }`}
                        className="offcanvas-wishlist-image"
                      />
                    </Link>
                    <div className="offcanvas-wishlist-item-content">
                      <Link
                        to={`/product-details-two/${data.productId}`}
                        className="offcanvas-wishlist-item-link"
                      >
                        {products.find((product) => product.id === data.productId) &&
                          products.find((product) => product.id === data.productId).name}
                      </Link>
                      <div className="offcanvas-wishlist-item-details">
                        <span className="offcanvas-wishlist-item-details-price">
                          {products.find((product) => product.id === data.productId) &&
                            products.find((product) => product.id === data.productId).salePrice.toFixed(2)}
                          TL
                        </span>
                        <span className="offcanvas-wishlist-item-details-quantity"> x{data.count}</span>
                      </div>
                    </div>
                  </div>
                  <div className="offcanvas-wishlist-item-delete text-right">
                    <a
                      href="#!"
                      className="offcanvas-wishlist-item-delete"
                      onClick={() => removeDetailFromCart(data.id)}
                    >
                      <i className="fa fa-trash"></i>
                    </a>
                  </div>
                </li>
              ))}
          </ul>
          <div className="offcanvas-cart-total-price">
            <span className="offcanvas-cart-total-price-text">Toplam :</span>
            <span className="offcanvas-cart-total-price-value">{cartTotal && cartTotal.toFixed(2)} TL</span>
          </div>
          <ul className="offcanvas-cart-action-button">
            <li>
              <Link to="/cart" className="theme-btn-one btn-black-overlay btn_md text-left">
                SEPETİ GÖRÜNTÜLE
              </Link>
            </li>
            <li>
              <Link to="/checkout-two" className="theme-btn-one btn-black-overlay btn_md text-right">
                ALIŞVERİŞİ TAMAMLA
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Sepet Listesi Popup Bitti  */}
      {/* Favori Listesi Popup Başladı  */}
      <div id="offcanvas-wishlish" className="offcanvas offcanvas-rightside offcanvas-add-cart-section">
        <div className="offcanvas-header text-right">
          <button className="offcanvas-close" onClick={handleWish}>
            <img src={svg} alt="icon" />
          </button>
        </div>
        <div className="offcanvas-wishlist-wrapper">
          <h4 className="offcanvas-title">Favoriler</h4>

          <ul className="offcanvas-wishlist">
            {favorites &&
              favorites.map((data, index) => (
                <li className="offcanvas-wishlist-item-single" key={index}>
                  <div className="offcanvas-wishlist-item-block">
                    <Link
                      to={`/product-details-one/${data.id}`}
                      className="offcanvas-wishlist-item-image-link"
                    >
                      <img src={data.img} alt="img" className="offcanvas-wishlist-image" />
                    </Link>
                    <div className="offcanvas-wishlist-item-content">
                      <Link to={`/product-details-one/${data.id}`} className="offcanvas-wishlist-item-link">
                        {data.title}
                      </Link>
                      <div className="offcanvas-wishlist-item-details">
                        <span className="offcanvas-wishlist-item-details-quantity">1 x</span>
                        <span className="offcanvas-wishlist-item-details-price">{data.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="offcanvas-wishlist-item-delete text-right">
                    <a
                      href="#!"
                      className="offcanvas-wishlist-item-delete"
                      onClick={() => {
                        console.log("delete wishlist clicked");
                      }}
                    >
                      <i className="fa fa-trash"></i>
                    </a>
                  </div>
                </li>
              ))}
          </ul>
          <ul className="offcanvas-wishlist-action-button">
            <li>
              <Link to="/wishlist" className="theme-btn-one btn-black-overlay btn_md">
                Favori Listesi
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Favori Listesi Popup Bitti  */}
      <div id="search" className="search-modal">
        <button type="button" className="close" onClick={handleSearch}>
          <img src={svg} alt="icon" />
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
            Swal.fire("Success", "Sonuçlara göz atın", "success");
            history("/shop/shop-left-sidebar");
          }}
        >
          <input type="search" placeholder="Ürün adı, markası." required id="searchDeneme" />
          <button type="submit" className="btn btn-lg btn-main-search">
            Ara
          </button>
        </form>
      </div>
    </div>
  );
};
export default Header;
