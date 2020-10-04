import { axiosInstance } from "../interceptor";
import { BASE_URL } from "../configs";

export const execChangePassword = (payload) => {
  return axiosInstance.patch(BASE_URL + "/admin/changePassword", payload);
};
