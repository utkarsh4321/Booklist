import React, { useCallback, useReducer } from "react";

// Creating the MY custum hooks

export const useGetTodos = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
};
