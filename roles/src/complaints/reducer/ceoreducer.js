import {
    SELECT_COMPLAINT,
    ACCEPT_COMPLAINT_SUCCESS,
    REJECT_COMPLAINT_SUCCESS,
    FORWARD_COMPLAINT_SUCCESS,
    REASSIGN_COMPLAINT_SUCCESS,
    COMPLAINT_ERROR
} from '../types/ceotypes';

const complaintReducer = (state, action) => {
    switch (action.type) {
        case SELECT_COMPLAINT:
            return {
                ...state,
                selectedComplaint: action.payload,
            };
        case ACCEPT_COMPLAINT_SUCCESS:
            return {
                ...state,
                complaints: state.complaints.filter(
                    complaint => complaint.complaint_id !== action.payload
                ),
                selectedComplaint: null,
            };
        case REJECT_COMPLAINT_SUCCESS:
            return {
                ...state,
                complaints: state.complaints.filter(
                    complaint => complaint.complaint_id !== action.payload
                ),
                selectedComplaint: null,
            };
        case FORWARD_COMPLAINT_SUCCESS:
            return {
                ...state,
                // Handle the state update for a forwarded complaint
            };
        case REASSIGN_COMPLAINT_SUCCESS:
            return {
                ...state,
                // Handle the state update for a reassigned complaint
            };
        case COMPLAINT_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default complaintReducer;
