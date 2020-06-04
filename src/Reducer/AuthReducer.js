import {
  AUTH_STARTED,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_FAIL,
  RESET_LOADERS,
  REMOVE_LOADER,
  AUTH_LOGOUT,
  CHECKAUTH,
  FRESHEDLOGIN,
} from "../Actions/actionTypes";

export const initialState = {
  authError: "",
  authMessage: "",
  authData: {},
  showLoader: false,
  showError: false,
  successedNotification: false,
  isAuthenticated: false,
  freshedLogin: false,
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
        authData: payload.data || {},
        authMessage: payload.message,
        successedNotification: true,
        showLoader: false,
      };
    case AUTH_REQUEST_FAIL:
      return {
        ...state,
        authError: payload.message,
        showError: payload.showError,
      };
    case RESET_LOADERS:
      if (state.showError) {
        return {
          ...state,
          showError: payload,
          showLoader: false,
        };
      }
      if (state.successedNotification) {
        return {
          ...state,
          successedNotification: payload,
          showLoader: false,
        };
      }
      break;
    case REMOVE_LOADER:
      return {
        ...state,
        showLoader: false,
      };
    case AUTH_LOGOUT:
      return {
        authError: "",
        authMessage: "",
        authData: {},
        showLoader: false,
        showError: false,
        successedNotification: false,
        isAuthenticated: false,
      };
    case CHECKAUTH:
      return {
        ...state,
        isAuthenticated: payload,
      };
    case FRESHEDLOGIN:
      return {
        ...state,
        freshedLogin: payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
