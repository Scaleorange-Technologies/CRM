import axios from 'axios';
import { ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAILURE } from '../types/registertypes';
import { useNavigate } from 'react-router-dom';
export const addUser =  async(dispatch,formData,navigate) => {
    
    dispatch({ type: ADD_USER_REQUEST });
    console.log("request successful")
    try {
        const response = await axios.post('http://localhost:9000/roles/register', formData);
        console.log(response)
        dispatch({ type: ADD_USER_SUCCESS, payload: response.data });
       
        alert('User registered successfully');
        navigate('/')
    } catch (error) {
        dispatch({ type: ADD_USER_FAILURE, payload: error.message });
        console.error('Error registering user:', error);
        alert('Failed to register user');
    }
};
