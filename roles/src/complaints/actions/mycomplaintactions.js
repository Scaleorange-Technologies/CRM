// src/context/actions/complaintActions.js
import { GET_MY_COMPLAINTS, SET_LOADING, COMPLAINTS_ERROR } from '../types/mycomplainttypes';
import axios from 'axios';
export const getMyComplaints = async (dispatch) => {
  console.log("Request")
  try {
    setLoading(dispatch);

    const response = await axios.get("http://localhost:9000/roles/mycomplaints", {
        headers: {
          'access_token': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      
   
    const data = response.data;
    
    
    if (response.status===200) {
      dispatch({
        type: GET_MY_COMPLAINTS,
        payload: data,
      });
      console.log("OK")
    } else {
      dispatch({
        type: COMPLAINTS_ERROR,
        payload: data.error || 'Something went wrong',
      });
     
    }
  } catch (error) {
    dispatch({
      type: COMPLAINTS_ERROR,
      payload: 'Something went wrong',
    });
  }
};

const setLoading = (dispatch) => {
  dispatch({ type: SET_LOADING });
};
