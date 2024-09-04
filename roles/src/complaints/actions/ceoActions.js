import axios from 'axios';
import { CloudCog } from 'lucide-react';

export const acceptComplaint = async (dispatch, complaintId) => {
    try {
        const token = localStorage.getItem('accessToken');
        console.log(token)
      console.log("fetching");
      const response = await axios.post(
        `http://localhost:9000/roles/complaints/${complaintId}/accept`,
        {}, // Empty object for the request body if there's no body content to send
        {
            headers: {
                "access_token": token,
                "Content-Type": "application/json",
            },
        }
    );
        // Dispatch any necessary actions to update state after acceptance
        dispatch({ type: 'ACCEPT_COMPLAINT_SUCCESS', payload: complaintId });
    } catch (error) {
        console.error("Failed to accept complaint:", error);
        dispatch({ type: 'COMPLAINT_ERROR', payload: error.message });
    }
};

export const rejectComplaint = async (dispatch, complaintId) => {
    try {
        const token = localStorage.getItem('accessToken');
        console.log(token)
      console.log("fetching");
      const response = await axios.post(
        `http://localhost:9000/roles/complaints/${complaintId}/reject`,
        {}, // Empty object for the request body if there's no body content to send
        {
            headers: {
                "access_token": token,
                "Content-Type": "application/json",
            },
        }
    );
        // Dispatch any necessary actions to update state after rejection
        dispatch({ type: 'REJECT_COMPLAINT_SUCCESS', payload: complaintId });
    } catch (error) {
        console.error("Failed to reject complaint:", error);
        dispatch({ type: 'COMPLAINT_ERROR', payload: error.message });
    }
};
