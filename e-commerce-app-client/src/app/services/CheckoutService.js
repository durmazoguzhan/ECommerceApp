import http from "../http-commons/gateway-http-common";

const checkout = (dto, token) => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
  console.log(dto);
  return http.post("/cartc", dto);
};

const CheckoutService = {
  checkout,
};

export default CheckoutService;
