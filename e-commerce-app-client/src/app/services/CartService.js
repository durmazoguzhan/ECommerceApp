import http from "../http-commons/gateway-http-common";

const getByUserId = (userId) => {
  return http.get(`/cart/GetCart/${userId}`);
};

const create = (data, token) => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
  return http.post("/cart", data);
};

const update = (data) => {
  return http.post("/cart/UpdateCart", data);
};

const removeDetail = (detailId, token) => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
  return http.post("/cart/RemoveCart", parseInt(detailId));
};

const CartService = {
  getByUserId,
  create,
  update,
  removeDetail,
};

export default CartService;
