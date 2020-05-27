import {
  AUTH_STARTED,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_FAIL,
} from "../Actions/actionTypes";

export const initialState = {
  authError: "",
  authData: {},
  showLoader: false,
  showError: false,
};
const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_STARTED:
      return {
        ...state,
        showLoader: true,
      };
    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        showLoader: false,
        authData: payload,
      };
    case AUTH_REQUEST_FAIL:
      return {
        ...state,
        authError: payload.data,
        showError: payload.showError,
      };
  }
};

export default rootReducer;
