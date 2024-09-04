// src/context/reducers/complaintReducer.js
import { GET_MY_COMPLAINTS, SET_LOADING, COMPLAINTS_ERROR } from '../types/mycomplainttypes';

export const complaintReducer = (state, action) => {
  switch (action.type) {
    case GET_MY_COMPLAINTS:
      return {
        ...state,
        complaints: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case COMPLAINTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
