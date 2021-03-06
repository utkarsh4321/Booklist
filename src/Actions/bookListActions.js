import {
  ADD_BOOKS,
  REMOVE_BOOKS,
  SHOW_ERROR,
  SHOW_LOADER,
  HIDE_ERROR,
  REMOVE_LOADER,
  FETCH_BOOKLIST_SUCCESS,
  SET_INPUT_TITLE,
  GET_SINGLE_BOOKLIST_SUCCESS,
  SET_UPDATE_INPUTS,
  AUTH_STARTED,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_FAIL,
  RESET_LOADERS,
  AUTH_LOGOUT,
  CHECKAUTH,
  FRESHEDLOGIN,
} from "./actionTypes";

export const addBooksAction = (response) => ({
  type: ADD_BOOKS,
  payload: response,
});

export const removeBooksAction = (response) => ({
  type: REMOVE_BOOKS,
  payload: response,
});

export const showLoaderAction = () => ({ type: SHOW_LOADER });

export const removeLoaderAction = () => ({ type: REMOVE_LOADER });

export const showErrorAction = (response) => ({
  type: SHOW_ERROR,
  payload: response,
});

export const removeErrorAction = () => ({ type: HIDE_ERROR });

export const fetchBooklistSucces = (response) => ({
  type: FETCH_BOOKLIST_SUCCESS,
  payload: response,
});

export const setInputTitle = (response) => ({
  type: SET_INPUT_TITLE,
  payload: response,
});

// export const setInputAuthor = (response) => ({
//   type: SET_INPUT_AUTHOR,
//   payload: response,
// });

export const getSingleBooklist = (response) => ({
  type: GET_SINGLE_BOOKLIST_SUCCESS,
  payload: response,
});
export const setUpdateInputs = (response) => ({
  type: SET_UPDATE_INPUTS,
  payload: response,
});

// ACTION METHODS FOR THE AUTH

export const authStarted = () => ({
  type: AUTH_STARTED,
});

export const authRequestSuccess = (response) => ({
  type: AUTH_REQUEST_SUCCESS,
  payload: response,
});

export const authFails = (payload) => ({
  type: AUTH_REQUEST_FAIL,
  payload,
});

export const resetLoaders = (payload) => ({
  type: RESET_LOADERS,
  payload,
});

export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const checkAuth = (response) => {
  return {
    type: CHECKAUTH,
    payload: response || false,
  };
};

export const freshedLogin = (response) => ({
  type: FRESHEDLOGIN,
  payload: response || false,
});
