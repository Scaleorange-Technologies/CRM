import { SET_TITLE, SET_DESCRIPTION, SET_FILE, SET_ADDITIONAL_TEXT, SET_STATUS, SET_ASSIGNED_TO, RESET_FORM } from '../types/ComplaintTypes';

const complaintReducer = (state, action) => {
  switch (action.type) {
    case SET_TITLE:
      return { ...state, title: action.payload };
    case SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case SET_FILE:
      return { ...state, file: action.payload };
    case SET_ADDITIONAL_TEXT:
      return { ...state, additionalText: action.payload };
    case SET_STATUS:
      return { ...state, status: action.payload };
    case SET_ASSIGNED_TO:
      return { ...state, assignedTo: action.payload };
    case RESET_FORM:
      return {
        title: '',
        description: '',
        file: null,
        additionalText: '',
        status: '',
        assignedTo: '',
      };
    default:
      return state;
  }
};

export default complaintReducer;
