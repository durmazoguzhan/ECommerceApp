import http from "../http-commons/gateway-http-common";

const getAll = () => {
  return http.get("/brands");
};

const get = (id) => {
  return http.get(`/brands/${id}`);
};

const create = (data) => {
  return http.post("/brands", data);
};

const update = (id, data) => {
  return http.put(`/brands/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/brands/${id}`);
};

const BrandService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default BrandService;
