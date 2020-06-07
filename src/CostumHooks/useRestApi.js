import { useCallback, useReducer } from "react";
import rootReducer, { initialState } from "../Reducer/BooklistReducer";
import {
  fetchBooklistSucces,
  addBooksAction,
  removeBooksAction,
  getSingleBooklist,
  setUpdateInputs,
  setInputTitle,
} from "../Actions/bookListActions";
// Creating the MY custum hooks

export const useGetTodos = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const fetchData = useCallback(({ method = "GET", params = {} } = {}) => {
    let booksData = [];
    // localStorage.todo = JSON.stringify(state.books);
    if (method === "GET") {
      fetch(
        `https://booklist-project-32f2a.firebaseio.com/todos.json?orderBy="userId"&equalTo=${localStorage.getItem(
          "userId"
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            Object.entries(data).forEach(([key, value]) => {
              booksData[value.index] = { id: key, ...value };
            });
          }

          dispatch(fetchBooklistSucces(booksData));
        })
        .catch(({ message }) => {
          // console.log(message);
        });
    }

    if (method === "POST") {
      fetch("https://booklist-project-32f2a.firebaseio.com/todos.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(addBooksAction({ ...params, id: data.name }));
        })
        .catch((err) => console.log(err));
    }
    if (method === "DELETE") {
      fetch(`https://booklist-project-32f2a.firebaseio.com/todos.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params.obj),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(removeBooksAction(params.id));
        })
        .catch((err) => console.log(err));
    }
    // METHOD for the update
    if (method === "UPDATE") {
      fetch(
        `https://booklist-project-32f2a.firebaseio.com/todos/${params.id}/.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(params.data),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(getSingleBooklist(data));
          dispatch(setUpdateInputs(""));
          dispatch(
            setInputTitle({
              id: "",
              title: "",
              author: "",
              index: "",
              userId: "",
            })
          );
        })
        .catch((err) => console.log(err));
    }
    // Get the single element
    if (method === "PUT") {
      let booksData = [];
      fetch(`https://booklist-project-32f2a.firebaseio.com/todos.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            Object.entries(data).forEach(([key, value]) => {
              booksData[value.index] = { id: key, ...value };
            });
          }

          dispatch(fetchBooklistSucces(booksData));
        })
        .catch((err) => console.log(err));
    }

    return () => console.log("Just wipe me out");
  }, []);
  return [state, fetchData, dispatch];
};
