import http from "../http-commons/gateway-http-common";

const getByCouponCode = (couponCode) => {
  return http.get(`/coupon/${couponCode}`);
};

const CouponService = {
  getByCouponCode,
};

export default CouponService;
