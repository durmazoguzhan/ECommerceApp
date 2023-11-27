import http from "../http-commons/gateway-http-common";

const getAll = () => {
  return http.get("/categories");
};

const get = (id) => {
  return http.get(`/categories/${id}`);
};

const create = (data) => {
  return http.post("/categories", data);
};

const update = (id, data) => {
  return http.put(`/categories/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/categories/${id}`);
};

const CategoryService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default CategoryService;
