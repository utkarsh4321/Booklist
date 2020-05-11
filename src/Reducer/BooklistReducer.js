//  Initialize the state

import {
  ADD_BOOKS,
  REMOVE_BOOKS,
  FETCH_BOOKLIST_SUCCESS,
  SHOW_LOADER,
  REMOVE_LOADER,
  SHOW_ERROR,
  HIDE_ERROR,
} from "../Actions/actionTypes";

export const initialState = {
  books: [],
  loader: false,
  error: false,
  errorMessage: "",
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
    default:
      return state;
  }
};

export default rootReducer;
