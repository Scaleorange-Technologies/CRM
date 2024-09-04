import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { addReducer } from './services/reducer/registerreducer';


const initialState = {
    users: [],
    loading: false,
    error: null,
   
};

export const AddContext = createContext( initialState);

export const AddProvider = ({ children }) => {
    const [state, dispatch] = useReducer(addReducer, initialState);

    

   

    return (
        <AddContext.Provider value={{ state, dispatch }}>
            {children}
        </AddContext.Provider>
    );
};


