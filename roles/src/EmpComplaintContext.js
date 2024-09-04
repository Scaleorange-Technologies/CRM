import React, { createContext, useReducer, useContext,useEffect } from 'react';
import EmpComplaintReducer from './complaints/reducer/EmpComplaintReducer';
import { fetchComplaints, forwardComplaint, reassignComplaint ,reassignComplaintDirectly,updateComplaint} from './complaints/actions/EmpComplaintActions';

const ComplainttContext = createContext();
const initialState = {
    complaints: [],
    error: null,
    selectedComplaint: null,
  };
export const ComplainttProvider = ({ children }) => {
  const [state, dispatch] = useReducer(EmpComplaintReducer, initialState);

  useEffect(() => {
    fetchComplaints(dispatch);
  }, [dispatch]);
  

  


  return (
    <ComplainttContext.Provider
      value={{
        state,
        dispatch,
        forwardComplaint,
        reassignComplaint,
        updateComplaint,
        reassignComplaintDirectly

      }}
    >
      {children}
    </ComplainttContext.Provider>
  );
};

export const useComplaintContext = () => useContext(ComplainttContext);