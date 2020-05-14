//  Initialize the state

import {
  ADD_BOOKS,
  REMOVE_BOOKS,
  FETCH_BOOKLIST_SUCCESS,
  SHOW_LOADER,
  REMOVE_LOADER,
  SHOW_ERROR,
  HIDE_ERROR,
  SET_INPUT_AUTHOR,
  SET_INPUT_TITLE,
  GET_SINGLE_BOOKLIST_SUCCESS,
} from "../Actions/actionTypes";

export const initialState = {
  books: [],
  loader: false,
  error: false,
  errorMessage: "",
  author: "",
  title: "",
  isUpdateButtonClicked: false,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_BOOKS:
      return {
        ...state,
        books: [...state.books, payload],
      };
    case REMOVE_BOOKS:
      return {
        ...state,
        books: state.books.filter((item) => item.id !== payload),
      };
    case FETCH_BOOKLIST_SUCCESS:
      return {
        ...state,
        books: payload,
      };
    case SHOW_LOADER:
      return {
        ...state,
        loader: true,
      };
    case REMOVE_LOADER:
      return {
        ...state,
        loader: false,
      };
    case SHOW_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: payload,
      };
    case HIDE_ERROR:
      return {
        ...state,
        error: false,
        errorMessage: "",
      };
    case SET_INPUT_AUTHOR:
      return {
        ...state,
        author: payload,
      };
    case SET_INPUT_TITLE:
      return {
        ...state,
        title: payload,
      };
    case GET_SINGLE_BOOKLIST_SUCCESS:
      return {
        ...state,
        author: payload.author,
        title: payload.title,
        isUpdateButtonClicked: true,
      };
    default:
      return state;
  }
};

export default rootReducer;
