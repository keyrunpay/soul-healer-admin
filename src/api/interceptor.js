import Axios from "axios";

export const axiosInstance = Axios.create({
  timeout: 10000,
});

//add token to all request
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("admin_token");
  config.headers.Authorization = "Bearer " + token;
  return config;
});

axiosInstance.interceptors.response.use(
  //handle on success
  function (response) {
    return response.data || null;
  },

  //handle on error
  function (error) {
    if (error.response && error.response.data) {
    } else {
      return Promise.reject({
        error: "Error connecting with remote server, please try again",
      });
    }
    return Promise.reject(error.response.data);
  }
);
