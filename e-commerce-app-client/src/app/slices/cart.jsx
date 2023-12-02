import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "../services/CartService";
import Swal from "sweetalert2";

export const getCartByUserId = createAsyncThunk(
  "cart/getByUserId",
  async ({ userId }) => {
    const res = await CartService.getByUserId(userId);
    return res.data;
  }
);

export const createUpdateCart = createAsyncThunk(
  "cart/createUpdateCart",
  async ({ data, token }) => {
    const res = await CartService.create(data, token);
    return res.data;
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ data }) => {
    const res = await CartService.update(data);
    return res.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ cartDetailId, token }) => {
    const res = await CartService.removeDetail(cartDetailId, token);
    return [res.data, cartDetailId];
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartByUserId.fulfilled, (state, action) => {
        state.cart = action.payload.result;
      })
      .addCase(createUpdateCart.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          if (action.payload.result)
            state.cart=action.payload.result;
          Swal.fire({
            title: "Başarılı!",
            text: "Ürün başarıyla sepetinize eklendi.",
            timer: 1000,
            icon: 'success'
          });
        }
        else {
          Swal.fire({
            title: "Başarısız!",
            text: "Ürünü sepete eklerken bir hata oluştu.",
            timer: 2000,
            icon: 'error'
          });
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (action.payload[0].isSuccess) {
          state.cart.cartDetails = state.cart.cartDetails.filter(detail => detail.id !== action.payload[1]);
        }
        else {
          Swal.fire({
            title: "Başarısız!",
            text: "Ürün sepetten çıkarılırken bir hata oluştu.",
            timer: 2000,
            icon: 'error'
          });
        }
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          if (action.payload.result)
            state.cart = action.payload.result;
        }
        else {
          Swal.fire({
            title: "Başarısız!",
            text: "Sepetiniz güncellenirken bir hata oluştu.",
            timer: 2000,
            icon: 'error'
          });
        }
      })
  },
});

const cartReducer = cartSlice.reducer;
export default cartReducer;