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
    // METHOD for the update
    if (method === "UPDATE") {
      fetch(
        `https://test-projects-dacb2.firebaseio.com/todo/${params.id}/.json`,
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
          console.log(data, "This is updated data");
          dispatch(getSingleBooklist(data));
          dispatch(setUpdateInputs(""));
          dispatch(setInputTitle({ id: "", title: "", author: "", index: "" }));

          // dispatch(removeBooksAction(params));
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
    // Get the single element
    if (method === "id") {
      fetch(`https://test-projects-dacb2.firebaseio.com/todo/${params}/.json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        // body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(getSingleBooklist(data));
          // dispatch(removeBooksAction(params));
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

    return () => console.log("Just wipe me out");
  }, []);
  return [state, fetchData, dispatch];
};
