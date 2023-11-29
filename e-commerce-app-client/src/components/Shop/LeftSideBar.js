import React, { useState } from "react";
import SideBar from "./SideBar";
import ProductCard from "../Common/Product/ProductCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../app/slices/product";

const LeftSideBar = () => {
  const products = useSelector((state) => state.products.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [page, setPage] = useState(1);

  const changePage = (page) => {
    if (page) {
      setPage(page);
    }
  };

  return (
    <>
      <section id="shop_main_area" className="ptb-100">
        <div className="container">
          <div className="row">
            <SideBar filterEvent={changePage} />
            <div className="col-lg-9">
              <div className="row">
                {products.slice(0, 12).map((product) => (
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={product.id}>
                    <ProductCard data={product} />
                  </div>
                ))}
                <div className="col-lg-12">
                  <ul className="pagination">
                    <li
                      className="page-item"
                      onClick={(e) => {
                        changePage(page > 1 ? page - 1 : 0);
                      }}
                    >
                      <a className="page-link" href="#!" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>
                    <li
                      className={"page-item " + (page === 1 ? "active" : null)}
                      onClick={(e) => {
                        changePage(1);
                      }}
                    >
                      <a className="page-link" href="#!">
                        1
                      </a>
                    </li>
                    <li
                      className={"page-item " + (page === 2 ? "active" : null)}
                      onClick={(e) => {
                        changePage(2);
                      }}
                    >
                      <a className="page-link" href="#!">
                        2
                      </a>
                    </li>
                    <li
                      className={"page-item " + (page === 3 ? "active" : null)}
                      onClick={(e) => {
                        changePage(3);
                      }}
                    >
                      <a className="page-link" href="#!">
                        3
                      </a>
                    </li>
                    <li
                      className="page-item"
                      onClick={(e) => {
                        changePage(page < 3 ? page + 1 : 0);
                      }}
                    >
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
