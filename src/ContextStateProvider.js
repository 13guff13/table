import React, { useContext, useReducer, createContext } from "react";

const Context = createContext();

export function ContextStateProvider({ children, initState, reducer }) {
  const value = useReducer(reducer, initState);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useContextState() {
  return useContext(Context);
}
