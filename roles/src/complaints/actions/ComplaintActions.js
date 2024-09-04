
import { SET_TITLE,SET_DESCRIPTION, SET_FILE, SET_ADDITIONAL_TEXT, SET_STATUS, SET_ASSIGNED_TO, RESET_FORM } from '../types/ComplaintTypes';
import axios from 'axios'
export const setTitle = (dispatch, title) => {
  dispatch({ type: SET_TITLE, payload: title });
};

export const setDescription = (dispatch, description) => {
  dispatch({ type: SET_DESCRIPTION, payload: description });
};

export const setFile = (dispatch, file) => {
  dispatch({ type: SET_FILE, payload: file });
};

export const setAdditionalText = (dispatch, text) => {
  dispatch({ type: SET_ADDITIONAL_TEXT, payload: text });
};

export const setStatus = (dispatch, status) => {
  dispatch({ type: SET_STATUS, payload: status });
};

export const setAssignedTo = (dispatch, assignedTo) => {
  dispatch({ type: SET_ASSIGNED_TO, payload: assignedTo });
};

export const resetForm = (dispatch) => {
  dispatch({ type: RESET_FORM });
};
export const submitComplaint = async (dispatch, formData) => {
    try {
      const response = await axios.post('http://localhost:9000/roles/complaints', 
        {
            
            title: formData.get('title'),
            description: formData.get('description'),
            
            additional_text: formData.get('additional_text'),
            media: formData.get('media'),
        },
        {
          headers: {
            'access_token': localStorage.getItem('accessToken'), // Replace with actual token
            'Content-Type': 'application/json', // This will be automatically set by axios when sending FormData
          }
        }
      );
      console.log(response)
  
      if (response.status === 200) {
        alert('Complaint submitted successfully');
        resetForm(dispatch);
      }
    } catch (error) {

      alert('Failed to submit complaint:', error);
    }
  };
