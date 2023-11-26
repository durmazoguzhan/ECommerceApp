import React, { useEffect } from "react";
import search from "../../assets/img/svg/search.svg";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../app/slices/category";
import { getBrands } from "../../app/slices/brand";

const SideBar = (props) => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);
  const categoryStatus = useSelector((state) => state.categories.status);

  const brands = useSelector((state) => state.brands.brands);
  const brandStatus = useSelector((state) => state.brands.status);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  if (categoryStatus === "success" && brandStatus === "success") {
    return (
      <>
        <div className="col-lg-3">
          <div className="shop_sidebar_wrapper">
            <div className="shop_Search">
              <form>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ara..."
                  onKeyUp={() => {
                    props.filterEvent(1);
                  }}
                />
                <button>
                  <img src={search} alt="img" />
                </button>
              </form>
            </div>

            <div className="shop_sidebar_boxed">
              <h4>Ürün Kategorileri</h4>
              <form>
                {categories.result.map(
                  (category) =>
                    category.parentCategoryId === null && (
                      <label className="custom_boxed" key={category.id}>
                        {category.name}
                        <input type="radio" name="radio" />
                        <span className="checkmark"></span>
                      </label>
                    )
                )}
              </form>
            </div>

            <div className="shop_sidebar_boxed">
              <h4>Fiyat</h4>
              <div className="price_filter">
                <input type="range" min="10" max="200" className="form-control-range" id="formControlRange" />
                <div className="price_slider_amount mt-2">
                  <span>Fiyat : </span>
                </div>
              </div>
            </div>
            <div className="shop_sidebar_boxed">
              <h4>Marka</h4>
              <form>
                {brands.result.map((brand) => (
                  <label className="custom_boxed" key={brand.id}>
                    {brand.name}
                    <input type="radio" name="radio" />
                    <span className="checkmark"></span>
                  </label>
                ))}
                <div className="clear_button">
                  <button
                    className="theme-btn-one btn_sm btn-black-overlay"
                    type="button"
                    onClick={() => {
                      props.filterEvent(1);
                    }}
                  >
                    Filtreyi Temizle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default SideBar;
