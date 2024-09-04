import React from 'react';
import axios from 'axios';
import { useComplaintContext } from '../EmpComplaintContext';
import { acceptComplaint,rejectComplaint } from '../complaints/actions/ceoActions';
import { fetchComplaints } from '../complaints/actions/EmpComplaintActions';
import { useEffect } from 'react';
const CeoComplaintCards = () => {
    const { state, dispatch, forwardComplaint, reassignComplaint,reassignComplaintDirectly } = useComplaintContext();
    const { complaints, error, selectedComplaint } = state;

    useEffect(() => {
      fetchComplaints(dispatch);
    }, [dispatch]);
    const handleCardClick = (complaint) => {
      dispatch({ type: 'SELECT_COMPLAINT', payload: complaint });
    };
  
    const handleForward = async () => {
        if (selectedComplaint) {
            await forwardComplaint(dispatch, selectedComplaint.complaint_id);
            console.log("hello")
            alert("Successfully forwarded the complaint.");
        }
    };
    const handleAccept = async () => {
        if (selectedComplaint) {
            await acceptComplaint(dispatch, selectedComplaint.complaint_id);
            alert("Successfully accepted the complaint.");
        }
    };
    const handleReject = async () => {
      if (selectedComplaint) {
          await rejectComplaint(dispatch, selectedComplaint.complaint_id);
          alert("Successfully rejected the complaint.");
      }
  };
    const handleReassign = async () => {
        if (selectedComplaint) {
            await reassignComplaint(dispatch, selectedComplaint.complaint_id);
            alert("Successfully reassigned the complaint.");
        }
    };
    const handleReassignDirectly = async () => {

      if (selectedComplaint) {
        await reassignComplaintDirectly(dispatch, selectedComplaint.complaint_id,true);
      // Assuming the token is stored in localStorage
      alert("Successfully reassigned the complaint to who posted it.");
          
    };
  }
    if (error) {
      return <p className="text-red-500">Error: {error}</p>;
    }
  
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Complaints To Solve</h2>
        
        {selectedComplaint  ? (
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Complaint ID: {selectedComplaint.complaint_id}</h3>
            <p><strong>Title:</strong> {selectedComplaint.title}</p>
            <p><strong>Description:</strong> {selectedComplaint.description}</p>
            <p><strong>Status:</strong> {selectedComplaint.status}</p>
            <p><strong>Assigned To:</strong> {selectedComplaint.assigned_to}</p>
            <p><strong>Additional Text:</strong> {selectedComplaint.additional_text}</p>
           
            <div className="mt-4 flex space-x-4">
            
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={handleAccept}>
            Accept
              </button>
              <button 
                
                className="px-4 py-2 bg-red-500 text-white rounded-lg"  onClick={handleReject}
              >
                Reject
              </button>
              <button 
                onClick={handleReassign}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
              >
                Reassign
              </button>
              <button 
                onClick={handleReassignDirectly}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
              >
                Reassign Directly
              </button>
            
              <button 
                onClick={() => dispatch({ type: 'SELECT_COMPLAINT', payload: null })} 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Back to Complaints
              </button>
            </div>
          </div>
        ) : (
          <div>
            {complaints.length > 0 ? (
              
              complaints
              .filter((complaint) => (complaint.status !== 'Accepted' && complaint.status !== 'Rejected' ))
              .map((complaint) => (
                <div 
                  key={complaint.complaint_id} 
                  className="bg-gray-100 p-4 rounded-lg mb-4 cursor-pointer"
                  onClick={() => handleCardClick(complaint)}
                >
                  <h3 className="text-lg font-bold">Complaint ID: {complaint.complaint_id}</h3>
                  <p><strong>Title:</strong> {complaint.title}</p>
                  <p><strong>Status:</strong> {complaint.status}</p>
                </div>
              ))
            ) : (
              <p>No complaints found.</p>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default CeoComplaintCards;