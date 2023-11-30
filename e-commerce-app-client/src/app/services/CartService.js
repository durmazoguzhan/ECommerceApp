import http from "../http-commons/gateway-http-common";

const getByUserId = (userId) => {
  return http.get(`/cart/GetCart/${userId}`);
};

const create = (data) => {
  return http.post("/cart", data);
};

const update = (data) => {
  return http.post("/cart/UpdateCart", data);
};

const removeDetail = (detailId) => {
  return http.post("/cart/RemoveCart", detailId);
};

const CartService = {
  getByUserId,
  create,
  update,
  removeDetail,
};

export default CartService;
