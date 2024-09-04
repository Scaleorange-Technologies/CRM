// src/context/GlobalState.js
import React, { createContext, useReducer } from 'react';
import { complaintReducer } from './complaints/reducer/mycomplaintreducer';

export const MyComplaintContext = createContext();

const initialState = {
  complaints: [],
  loading: false,
  error: null,
};

export const MyComplaintProvider = ({ children }) => {
  const [state, dispatch] = useReducer(complaintReducer, initialState);

  return (
    <MyComplaintContext.Provider
      value={
        { state, dispatch }
      }
    >
      {children}
    </MyComplaintContext.Provider>
  );
};
