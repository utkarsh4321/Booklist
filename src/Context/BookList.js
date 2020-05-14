import React, { createContext, useEffect } from "react";
import { useGetTodos } from "../CostumHooks/useRestApi";
export const BookListContext = createContext();

const BookListContextProvide = (props) => {
  // const [state, dispatch] = useReducer(reducer, InitialState);
  const [state, fetchData] = useGetTodos();
  useEffect(() => {
    fetchData();
    return () => console.log("Please remove me");
  }, [fetchData]);
  return (
    <BookListContext.Provider value={{ state, fetchData }}>
      {props.children}
    </BookListContext.Provider>
  );
};

export default BookListContextProvide;
