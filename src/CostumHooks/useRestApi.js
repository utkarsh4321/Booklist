import React, { useCallback, useReducer } from "react";
import rootReducer, { initialState } from "../Reducer/BooklistReducer";
import { fetchBooklistSucces } from "../Actions/bookListActions";
// Creating the MY custum hooks

export const useGetTodos = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const fetchData = useCallback(() => {
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
        dispatch(fetchBooklistSucces(booksData));
      })
      .catch(({ message }) => {
        console.log(message);
      });
  }, []);
  return [state, fetchData];
};
