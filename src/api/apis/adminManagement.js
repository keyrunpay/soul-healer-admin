import { axiosInstance } from "../interceptor";
import { BASE_URL } from "../configs";

export const execGetVolunteers = () => {
  return axiosInstance.get(BASE_URL + "/admin/volunteers");
};

export const execAddVolunteer = (payload) => {
  return axiosInstance.post(BASE_URL + "/admin/volunteer", payload);
};

export const execDeleteVolunteer = (id) => {
  return axiosInstance.delete(BASE_URL + "/admin/volunteer?vid=" + id);
};

export const execGetBotTriggers = () => {
  return axiosInstance.get(BASE_URL + "/admin/bot_triggers");
};

export const execEditBotTrigger = (payload) => {
  return axiosInstance.patch(BASE_URL + "/admin/bot_trigger", payload);
};

export const execAddBotTrigger = (payload) => {
  return axiosInstance.post(BASE_URL + "/admin/bot_trigger", payload);
};

export const execGetBotPending = () => {
  return axiosInstance.get(BASE_URL + "/admin/bot_pending");
};
