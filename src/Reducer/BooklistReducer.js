//  Initialize the state

export const initialState = {
  books: [],
  loader: false,
  error: false,
  errorMessage: "",
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_BOOKS":
      return {
        books: [...state.books, action.payload],
      };
    case "DELETE_BOOKS":
      return {
        books: state.books.filter((item) => item.id !== action.payload),
      };
    case "":
      return {
        books: action.payload,
      };
    default:
      return state;
  }
};
