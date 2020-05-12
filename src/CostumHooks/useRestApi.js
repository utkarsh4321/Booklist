import React, { useCallback, useReducer } from "react";
import rootReducer, { initialState } from "../Reducer/BooklistReducer";
import {
  fetchBooklistSucces,
  addBooksAction,
  removeBooksAction,
} from "../Actions/bookListActions";
// Creating the MY custum hooks

export const useGetTodos = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const fetchData = useCallback(({ method = "GET", params = {} } = {}) => {
    let booksData = [];
    // localStorage.todo = JSON.stringify(state.books);
    if (method === "GET") {
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
    }

    if (method === "POST") {
      fetch("https://test-projects-dacb2.firebaseio.com/todo.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch(addBooksAction({ ...params, id: data.name }));
          // dispatch({
          //   type: "ADD_BOOKS",
          //   payload: { title, author, id: data.name },
          // // });
          // setAuthor("");
          // setTitle("");
        })
        .catch((err) => console.log(err));
    }
    if (method === "DELETE") {
      fetch(`https://test-projects-dacb2.firebaseio.com/todo/${params}/.json`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        // body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch(removeBooksAction(params));
          // dispatch({
          //   type: "DELETE_BOOKS",
          //   payload: id,
          // })
          // dispatch(addBooksAction({ ...params, id: data.name }));
          // dispatch({
          //   type: "ADD_BOOKS",
          //   payload: { title, author, id: data.name },
          // // });
          // setAuthor("");
          // setTitle("");
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return [state, fetchData];
};