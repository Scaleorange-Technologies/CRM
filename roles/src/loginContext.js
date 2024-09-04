import React, { createContext, useReducer } from 'react';
import { AuthReducer } from './services/reducer/loginReducer';

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    rolename: null,
    username: null,
    error: null,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};