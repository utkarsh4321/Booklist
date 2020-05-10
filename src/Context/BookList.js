import React, { createContext, useReducer, useEffect } from "react";
export const BookListContext = createContext();

//Initializing the initial state

let InitialState = {
  books: [
    // { title: " Think like a monk", author: "Jay Shetty", id: 1 },
    // { title: "The way of king", author: "Juan", id: 2 },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOKS":
      return {
        books: [...state.books, action.payload],
      };
    case "DELETE_BOOKS":
      return {
        books: state.books.filter((item) => item.id !== action.payload),
      };
    case "LOAD_LOCAL_STORAGE_DATA":
      return {
        books: action.payload,
      };
    default:
      return state;
  }
};

const BookListContextProvide = (props) => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  useEffect(() => {
    let booksData = [];
    // localStorage.todo = JSON.stringify(state.books);

    fetch("https://test-projects-dacb2.firebaseio.com/todo.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          Object.entries(data).forEach(([key, value]) => {
            booksData.push({ id: key, ...value });
          });
        }
        dispatch({ type: "LOAD_LOCAL_STORAGE_DATA", payload: booksData });
      });
  }, []);
  return (
    <BookListContext.Provider value={{ state, dispatch }}>
      {props.children}
    </BookListContext.Provider>
  );
};

export default BookListContextProvide;
