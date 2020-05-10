import {
  ADD_BOOKS,
  REMOVE_BOOKS,
  SHOW_ERROR,
  SHOW_LOADER,
  HIDE_ERROR,
  REMOVE_LOADER,
  FETCH_BOOKLIST_SUCCESS,
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
