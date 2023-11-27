import Heading from "../Heading";
import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../../components/Common/Product/ProductCard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../../app/slices/product";

const HotProduct = () => {
  const products = useSelector((state) => state.products.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <section id="hot-Product_area" className="ptb-100">
        <div className="container">
          <Heading baslik="YENİ ÜRÜNLER" altBaslik="Herkesin InveShop tan Alışveriş Yaptığını Görün" />
          <div className="row">
            <div className="col-lg-12">
              <div className="tabs_center_button">
                <ul className="nav nav-tabs">
                  <li>
                    <a data-toggle="tab" href="#new_arrival" className="active">
                      YENİ GELENLER
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#best_sellers">
                      Çok Satanlar
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="tabs_el_wrapper">
                <div className="tab-content">
                  <div id="new_arrival" className="tab-pane fade show in active">
                    <div className="row">
                      {products.slice(0, 4).map((product) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={product.id}>
                          <ProductCard data={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div id="best_sellers" className="tab-pane fade">
                    <div className="row">
                      {products.slice(0, 4).map((product) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={product.id}>
                          <ProductCard data={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HotProduct;
