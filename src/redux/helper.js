import { updateState } from "redux-helper-np";

const fetchOnRedux = async (dispatch, reducer, axiosInstance, ...axiosInstanceParams) => {
  dispatch(updateState(reducer, { status: "loading", data: null }));
  try {
    const res = await axiosInstance(...axiosInstanceParams);
    dispatch(updateState(reducer, { status: "data", data: res }));
  } catch (err) {
    dispatch(updateState(reducer, { status: "error", data: err }));
  }
};

export { fetchOnRedux };
