import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/product";
import settingsReducer from "./slices/settings";
import userReducer from "./slices/user";
import categoriesReducer from "./slices/category";
import brandsReducer from "./slices/brand";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    settings: settingsReducer,
    categories: categoriesReducer,
    brands: brandsReducer
  },
});