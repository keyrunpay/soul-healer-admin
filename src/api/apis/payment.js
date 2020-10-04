import { axiosInstance } from "../interceptor";
import { BASE_URL } from "../configs";

export const execGetSales = (payload) => {
  return axiosInstance.post(BASE_URL + "/payment/get-sales", payload);
};
