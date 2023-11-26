import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const getCategories = createAsyncThunk("categories/getCategories", async () => {
  const response = await axios.get("https://localhost:5050/api/categories");
  return response.data;
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    category: null,
    status: "idle"
  },
  reducers: {
    getCategoryById: (state, action) => {

    },
    createCategory: (state, action) => {
      Swal.fire({
        title: "Başarılı",
        text: "Kategori oluşturuldu!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    },
    updateCategory: (state, action) => {
      Swal.fire({
        title: "Başarılı",
        text: "Kategori güncellendi!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    },
    deleteCategory: (state, action) => {
      Swal.fire({
        title: "Başarılı",
        text: "Kategori silindi!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "success";
      });
  },
});

const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;
