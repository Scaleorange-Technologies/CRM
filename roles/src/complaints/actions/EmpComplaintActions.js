import axios from 'axios';

export const setComplaints = (complaints) => ({
  type: 'SET_COMPLAINTS',
  payload: complaints,
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error,
});

export const selectComplaint = (complaint) => ({
  type: 'SELECT_COMPLAINT',
  payload: complaint,
});

export const removeComplaint = (complaint_id) => ({
  type: 'REMOVE_COMPLAINT',
  payload: complaint_id,
});


 


export const fetchComplaints = async (dispatch) => {
  try {
   const token = localStorage.getItem('accessToken');
 console.log("fetch");
    const response = await axios.get('http://localhost:9000/roles/getcomplaints', {
      headers: {
        "access_token": token
      },
    });
    console.log(response.data);
    dispatch(setComplaints(response.data));
  } catch (err) {
    dispatch(setError(err.response ? err.response.data.message : err.message));
  }
};

export const forwardComplaint = async (dispatch,complaint_id) => {
  try {
    const token = localStorage.getItem('accessToken');
    await axios.post(
      'http://localhost:9000/roles/complaints/forward',
      { complaint_id },
      {
        headers: {
          "access_token": token,
        },
      }
    );
    dispatch(removeComplaint(complaint_id));
  } catch (err) {
    dispatch(setError(err.response ? err.response.data.message : err.message));
  }
};

export const updateComplaint = async (dispatch, complaint_id, updatedData) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(
      `http://localhost:9000/roles/complaints/${complaint_id}`,
      updatedData,
      {
        headers: {
          "access_token": token,
        },
      }
    );
    dispatch({
      type: 'UPDATE_COMPLAINT',
      payload: response.data,
    });
  } catch (err) {
    dispatch(setError(err.response ? err.response.data.message : err.message));
  }
};


export const reassignComplaint = async (dispatch,complaint_id) => {
  try {
    const token = localStorage.getItem('accessToken');
    await axios.post(
      'http://localhost:9000/roles/postreinvestigation',
      { complaint_id },
      {
        headers: {
          "access_token": token,
        },
      }
    );
    dispatch(removeComplaint(complaint_id));
  } catch (err) {
    dispatch(setError(err.response ? err.response.data.message : err.message));
  }
}; 


export const reassignComplaintDirectly = async (dispatch,complaint_id,directToEmployee) => {

  try {
    const token = localStorage.getItem('accessToken'); // Assuming the token is stored in localStorage

     await axios.post(
      'http://localhost:9000/roles/postreinvestigation',
      {
        complaint_id,
        directToEmployee
      },
      {
        headers: {
          access_token: token, // Add the token in the Authorization header
          'Content-Type': 'application/json', // You can add other headers if needed
        },
      }
    );
    dispatch(removeComplaint(complaint_id));
  //  alert('Successfully reassigned the complaint to originsl poster.');
  } catch (err) {
    dispatch(setError(err.response ? err.response.data.message : err.message));
   
  }
}
