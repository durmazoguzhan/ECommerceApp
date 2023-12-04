import React from "react";
import search from "../../assets/img/svg/search.svg";
import { getAllBrands } from "../../app/slices/brand";
import { getAllCategories } from "../../app/slices/category";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const SideBar = (props) => {
  const [currentCategory, setCurrentCategory] = useState({ id: null });
  const [currentBrand, setCurrentBrand] = useState({ id: null });

  const brands = useSelector((state) => state.brands.brands);
  const categories = useSelector((state) => state.categories.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
  }, [dispatch]);

  const setBrandAndFilter = (brand) => {
    setCurrentBrand(brand);
    props.filterEvent(currentCategory, currentBrand);
  };
  const setCategoryAndFilter = (category) => {
    setCurrentCategory(category);
    props.filterEvent(currentCategory, currentBrand);
  };

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
            <h4>Kategori</h4>
            {
              <label className="custom_boxed_current_category" aria-readonly key={currentCategory.id}>
                {currentCategory.name}
              </label>
            }
            <form>
              {categories &&
                categories.map(
                  (category) =>
                    category.parentCategoryId === currentCategory.id && (
                      <label
                        className="custom_boxed"
                        key={category.id}
                        onClick={() => setCategoryAndFilter(category)}
                      >
                        {category.name}
                        <input type="radio" name="radio" />
                        <span className="checkmark"></span>
                      </label>
                    )
                )}
            </form>
          </div>

          <div className="shop_sidebar_boxed">
            <h4>Marka</h4>
            <form>
              {brands &&
                brands.map((brand) => (
                  <label className="custom_boxed" key={brand.id} onClick={() => setBrandAndFilter(brand)}>
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
                  FİLTREYİ TEMİZLE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
