import { axiosInstance } from "../interceptor";
import { BASE_URL } from "../configs";

export const execGetList = () => {
  return axiosInstance.get(BASE_URL + "/list");
};

export const execGetSubList = (id) => {
  return axiosInstance.get(BASE_URL + "/list/" + id);
};

export const execAddToList = (id, payload) => {
  return axiosInstance.patch(BASE_URL + "/list/" + id + "/add", payload);
};

export const execDeleteFromList = (id, payload) => {
  return axiosInstance.patch(BASE_URL + "/list/" + id + "/remove", payload);
};
