import { axiosInstance } from "../interceptor";
import { BASE_URL } from "../configs";

export const execLogin = (payload) => {
  return axiosInstance.post(BASE_URL + "/admin/login", payload);
};
