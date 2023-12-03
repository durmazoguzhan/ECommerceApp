import http from "../http-commons/gateway-http-common";

const getByUserId = (userId) => {
  return http.get(`/orders/GetByUserId/${userId}`);
};

const OrderService = {
  getByUserId,
};

export default OrderService;
