import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REQUEST } from '../types/logintypes';

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case REQUEST:
            return {
                ...state,
                isAuthenticated: false,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                accessToken: action.payload.accessToken,
                rolename: action.payload.rolename,
                username: action.payload.username,
                error: null,
            };
        case LOGIN_FAILURE:
            return { ...state, isAuthenticated: false, error: action.payload };
        case LOGOUT:
            return { ...state, isAuthenticated: false, accessToken: null, rolename: null, username: null };
        default:
            return state;
    }
};