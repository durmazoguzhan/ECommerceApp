import http from "../http-commons/gateway-http-common";

const getByUserId = (userId) => {
  return http.get(`/favorite/GetFavorite/${userId}`);
};

const create = (data, token) => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
  return http.post("/favorite", data);
};

const update = (data) => {
  return http.post("/favorite/UpdateFavorite", data);
};

const removeDetail = (detailId, token) => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
  return http.post("/favorite/RemoveFavorite", parseInt(detailId));
};

const FavoriteService = {
  getByUserId,
  create,
  update,
  removeDetail,
};

export default FavoriteService;
