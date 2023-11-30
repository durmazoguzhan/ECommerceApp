import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/product";
import settingsReducer from "./slices/settings";
import userReducer from "./slices/user";
import categoryReducer from "./slices/category";
import brandReducer from "./slices/brand";
import cartReducer from "./slices/cart";

export const store = configureStore({
  reducer: {
    products: productReducer,
    users: userReducer,
    settings: settingsReducer,
    categories: categoryReducer,
    brands: brandReducer,
    carts: cartReducer
  },
});