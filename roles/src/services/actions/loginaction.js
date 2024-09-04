import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REQUEST } from '../types/logintypes';

// Define the API URL
const API_URL = 'http://localhost:9000/roles/login';

// Action for login
export const login = async (formData, dispatch, navigate) => {
    dispatch(REQUEST);
    console.log("request successfull")
    try {
        console.log("In login");
        // Make the API request to login
        const response = await axios.post(API_URL, formData);
        const accessToken = response.data.access_token;
        console.log(accessToken);

        // Decode the JWT to extract user role
        const decodedToken = jwtDecode(accessToken);
        const rolename = decodedToken.rolename; // Assuming the role is stored in 'rolename' field
        const username = decodedToken.username;
        // Dispatch success action with token and user role
        dispatch({ type: LOGIN_SUCCESS, payload: { accessToken, rolename, username } });

        // Navigate based on role
        if(rolename === 'INTERN'){
            localStorage.setItem('accessToken', accessToken);
            navigate('/interndashboard');
        }
        else if(rolename === 'EMPLOYEE'){
            localStorage.setItem('accessToken', accessToken);
            navigate('/employeedashboard');
        }
       
       else if (rolename === 'TEAM_LEAD') {
            localStorage.setItem('accessToken', accessToken);
            navigate('/teamleaddashboard');

        }
        else if (rolename === 'TEAM_MANAGER') {
            localStorage.setItem('accessToken', accessToken);
            navigate('/teammanagerdashboard');

        }
        else if (rolename === 'HR') {
            localStorage.setItem('accessToken', accessToken);
            navigate('/hrdashboard');

        }
        else if(rolename === 'CEO'){
            localStorage.setItem('accessToken', accessToken);
            navigate('/ceodashboard');
        }
        else{
            alert("You are not authorized to access Dashboard")
        }
    } catch (error) {

        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        alert('Invalid Credentials')
    }
};


export const logout = (dispatch, navigate) => {
    // Clear the token and role from state
    dispatch({ type: LOGOUT });

    // Redirect to the login page
    navigate('/');
};