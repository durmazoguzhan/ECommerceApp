import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const getBrands = createAsyncThunk("brands/getBrands", async () => {
  const response = await axios.get("https://localhost:5050/api/brands");
  return response.data;
});

const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    brand: null,
    status: "idle"
  },
  reducers: {
    getBrandById: (state, action) => {

    },
    createBrand: (state, action) => {
      Swal.fire({
        title: "Başarılı",
        text: "Kategori oluşturuldu!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    },
    updateBrand: (state, action) => {
      Swal.fire({
        title: "Başarılı",
        text: "Kategori güncellendi!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    },
    deleteBrand: (state, action) => {
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
      .addCase(getBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = "success";
      });
  },
});

const brandsReducer = brandsSlice.reducer;
export default brandsReducer;
