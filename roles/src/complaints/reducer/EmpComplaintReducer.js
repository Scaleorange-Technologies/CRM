import * as types from '../types/EmpComplaintTypes';



const EmpComplaintReducer = (state , action) => {
  switch (action.type) {
    case types.SET_COMPLAINTS:
        console.log(action.payload);

      return { ...state, complaints: action.payload };
    case types.SET_ERROR:
      return { ...state, error: action.payload };
    case types.SELECT_COMPLAINT:
      return { ...state, selectedComplaint: action.payload };
    case types.REMOVE_COMPLAINT:
      return {
        ...state,
        complaints: state.complaints.filter(
          (complaint) => complaint.complaint_id !== action.payload
        ),
        selectedComplaint: null,
      };
      case 'UPDATE_COMPLAINT':
        return {
          ...state,
          complaints: state.complaints.map((complaint) =>
            complaint.complaint_id === action.payload.complaint_id
              ? { ...complaint, ...action.payload }
              : complaint
          ),
          selectedComplaint: action.payload, // Update the selected complaint with new data
        };
    default:
      return state;
  }
};

export default EmpComplaintReducer; 