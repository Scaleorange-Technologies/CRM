import { ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAILURE } from '../types/registertypes';

export const addReducer = (state, action) => {
    switch (action.type) {
        case ADD_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [...state.users, action.payload], // Add new user to the list
            };
        case ADD_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
