import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import FavoriteService from "../services/FavoriteService";

export const getFavoriteByUserId = createAsyncThunk(
  "favorite/getByUserId",
  async ({ userId }) => {
    const res = await FavoriteService.getByUserId(userId);
    return res.data;
  }
);

export const createUpdateFavorite = createAsyncThunk(
  "favorite/createUpdateFavorite",
  async ({ data, token }) => {
    const res = await FavoriteService.create(data, token);
    return res.data;
  }
);

export const updateFavorite = createAsyncThunk(
  "favorite/updateFavorite",
  async ({ data }) => {
    const res = await FavoriteService.update(data);
    return res.data;
  }
);

export const removeFromFavorite = createAsyncThunk(
  "favorite/removeFromFavorite",
  async ({ favoriteDetailId, token }) => {
    const res = await FavoriteService.removeDetail(favoriteDetailId, token);
    return [res.data, favoriteDetailId];
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorite: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavoriteByUserId.fulfilled, (state, action) => {
        state.favorite = action.payload.result;
      })
      .addCase(createUpdateFavorite.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          if (action.payload.result)
            state.favorite = action.payload.result;
          Swal.fire({
            title: "Başarılı!",
            text: "Ürün başarıyla favorilerinize eklendi.",
            timer: 1500,
            icon: 'success',
            showConfirmButton: false
          });
        }
        else {
          Swal.fire({
            title: "Başarısız!",
            text: "Ürün favorilerinize eklenirken bir hata oluştu.",
            timer: 2000,
            icon: 'error'
          });
        }
      })
      .addCase(removeFromFavorite.fulfilled, (state, action) => {
        if (action.payload[0].isSuccess) {
          state.favorite.favoriteDetails = state.favorite.favoriteDetails.filter(detail => detail.id !== action.payload[1]);
        }
        else {
          Swal.fire({
            title: "Başarısız!",
            text: "Ürün favorilerden çıkarılırken bir hata oluştu.",
            timer: 2000,
            icon: 'error'
          });
        }
      })
      .addCase(updateFavorite.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          if (action.payload.result)
            state.favorite = action.payload.result;
        }
        else {
          Swal.fire({
            title: "Başarısız!",
            text: "Favorileriniz güncellenirken bir hata oluştu.",
            timer: 2000,
            icon: 'error'
          });
        }
      })
  },
});

const favoriteReducer = favoriteSlice.reducer;
export default favoriteReducer;