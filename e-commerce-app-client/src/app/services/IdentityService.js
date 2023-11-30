import http from "../http-commons/identity-http-common";

const login = (returnUrl) => {
  return http.get("/account/login", returnUrl);
};

const IdentityService = {
  login,
};

export default IdentityService;
