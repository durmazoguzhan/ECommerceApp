import React, { useState } from "react";
import SideBar from "./SideBar";
import ProductCard from "../Common/Product/ProductCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../app/slices/product";

const LeftSideBar = () => {
  const products = useSelector((state) => state.products.products);
  const [filteredProducts, setFilteredProducts] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [page, setPage] = useState(1);

  const filterProducts = (category, brand) => {
    let updatedProducts = [...products];
    if (brand.id) {
      console.log("brand if");
      updatedProducts = updatedProducts.filter((product) => product.brandId === brand.id);
    }
    if (category.id) {
      updatedProducts = updatedProducts.filter(
        (product) => product.categoryId === category.id || product.categoryId === category.parentCategoryId
      );
    }
    setFilteredProducts(updatedProducts);
  };

  return (
    <>
      <section id="shop_main_area" className="ptb-100">
        <div className="container">
          <div className="row">
            <SideBar filterEvent={filterProducts} />
            <div className="col-lg-9">
              <div className="row">
                {(filteredProducts || products) &&
                  (filteredProducts
                    ? filteredProducts.slice(0, 12).map((product) => (
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={product.id}>
                          <ProductCard data={product} />
                        </div>
                      ))
                    : products.slice(0, 12).map((product) => (
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={product.id}>
                          <ProductCard data={product} />
                        </div>
                      )))}

                <div className="col-lg-12">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#!" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>
                    <li className={"page-item " + (page === 1 ? "active" : null)}>
                      <a className="page-link" href="#!">
                        1
                      </a>
                    </li>
                    <li className={"page-item " + (page === 2 ? "active" : null)}>
                      <a className="page-link" href="#!">
                        2
                      </a>
                    </li>
                    <li className={"page-item " + (page === 3 ? "active" : null)}>
                      <a className="page-link" href="#!">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#!" aria-label="Next">
                        <span aria-hidden="true">»</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeftSideBar;
