import { notification } from "antd";

export const notifyFromApiErrors = (err) => {
  if (err.errors) {
    notifyError(err.errors.join(" "));
  }
  if (err.message) {
    notifyError(err.message);
  }
};

export const notifyError = (msg, placement = "bottomRight") => {
  notification.error({
    message: msg,
    placement: placement,
    duration: 4,
  });
};

export const notifySuccess = (msg, placement = "bottomRight") => {
  notification.success({
    message: msg,
    placement: placement,
    duration: 4,
  });
};
