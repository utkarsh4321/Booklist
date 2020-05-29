import {
  AUTH_STARTED,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_FAIL,
  RESET_LOADERS,
  REMOVE_LOADER,
} from "../Actions/actionTypes";

export const initialState = {
  authError: "",
  authMessage: "",
  authData: {},
  showLoader: false,
  showError: false,
  successedNotification: false,
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
        authData: payload,
        authMessage: "User created successfully",
        successedNotification: true,
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
        };
      }
      if (state.successedNotification) {
        return {
          ...state,
          successedNotification: payload,
        };
      }
      break;
    case REMOVE_LOADER:
      return {
        ...state,
        showLoader: false,
      };
    default:
      return state;
  }
};

export default rootReducer;
