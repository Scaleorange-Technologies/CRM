import React, { createContext, useReducer } from 'react';
import complaintReducer from './complaints/reducer/ComplaintReducer';

// Create Context
const ComplaintContext = createContext();

// Create Provider
const ComplaintProvider = ({ children }) => {
  const initialState = {
    title: '',
    description: '',
    file: null,
    additionalText: '',
    status: '',
    assignedTo: '',
  };

  const [state, dispatch] = useReducer(complaintReducer, initialState);

  return (
    <ComplaintContext.Provider value={{ state, dispatch }}>
      {children}
    </ComplaintContext.Provider>
  );
};

export { ComplaintContext, ComplaintProvider };
