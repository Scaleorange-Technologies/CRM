// import React, { useState } from 'react';
// import { useComplaintContext } from '../EmpComplaintContext';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';

// const TeamLeadComplaintCards = () => {
//     const { state, dispatch, forwardComplaint, reassignComplaint, updateComplaint } = useComplaintContext();
//     const { complaints, error, selectedComplaint } = state;
//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         additional_text: '',
//         media: []
//     });

//     const handleCardClick = (complaint) => {
//         dispatch({ type: 'SELECT_COMPLAINT', payload: complaint });
//     };

//     const handleForward = async () => {
//         if (selectedComplaint) {
//             await forwardComplaint(dispatch, selectedComplaint.complaint_id);
//             alert("Successfully forwarded the complaint.");
//         }
//     };

//     const getRoleIdByUserId = async (user_id) => {
//         try {
//             const response = await axios.get(`http://localhost:9000/roles/role/${user_id}`);
//             return response.data.role_id;
//         } catch (error) {
//             console.error('Error fetching role ID:', error);
//             throw new Error('Failed to fetch role ID');
//         }
//     };

//     const handleReassign = async () => {
//         if (selectedComplaint) {
//             try {
//                 const roleId = await getRoleIdByUserId(selectedComplaint.user_id);

//                 // Fetch the current user's role ID
//                 const token = localStorage.getItem('accessToken');
//                 const decodedToken = jwtDecode(token);
//                 const currentUserRoleName = decodedToken.rolename;
//                 const roleMapping = {
//                     CEO: 1,
//                     HR: 2,
//                     TEAM_MANAGER: 3,
//                     TEAM_LEAD: 4,
//                     EMPLOYEE: 5,
//                     INTERN: 5
//                 };
//                 const currentUserRoleId = roleMapping[currentUserRoleName];

//                 // Check if the current user is the one who posted the complaint
//                 if (roleId === currentUserRoleId) {
//                     // Open the form with the complaint details
//                     setFormData({
//                         title: selectedComplaint.title,
//                         description: selectedComplaint.description,
//                         additional_text: selectedComplaint.additional_text,
//                         media: selectedComplaint.media
//                     });
//                     setIsFormOpen(true);
//                     return;
//                 }

//                 // Proceed with reassigning the complaint
//                 await reassignComplaint(dispatch, selectedComplaint.complaint_id);
//                 alert("Successfully reassigned the complaint.");
//             } catch (error) {
//                 console.error('Error handling reassignment:', error);
//                 alert("An error occurred while reassigning the complaint.");
//             }
//         }
//     };

//     const handleFormClose = () => {
//         setIsFormOpen(false);
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         if (selectedComplaint) {
//             await updateComplaint(dispatch, selectedComplaint.complaint_id, formData);
//             setIsFormOpen(false);
//         }
//     };

//     if (error) {
//         return <p className="text-red-500">Error: {error}</p>;
//     }

//     return (
//         <div className="bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl font-semibold mb-4">Complaints To Solve</h2>

//             {isFormOpen ? (
//                 <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded-lg shadow-lg">
//                     <h2 className="text-xl font-semibold mb-4">Reassign Complaint</h2>
//                     <label className="block mb-2">
//                         <span className="text-gray-700">Title</span>
//                         <input
//                             type="text"
//                             name="title"
//                             value={formData.title}
//                             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                             className="form-input mt-1 block w-full"
//                             required
//                         />
//                     </label>
//                     <label className="block mb-2">
//                         <span className="text-gray-700">Description</span>
//                         <textarea
//                             name="description"
//                             value={formData.description}
//                             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                             className="form-textarea mt-1 block w-full"
//                             required
//                         />
//                     </label>
//                     <label className="block mb-2">
//                         <span className="text-gray-700">Additional Text</span>
//                         <textarea
//                             name="additional_text"
//                             value={formData.additional_text}
//                             onChange={(e) => setFormData({ ...formData, additional_text: e.target.value })}
//                             className="form-textarea mt-1 block w-full"
//                         />
//                     </label>
//                     <div className="flex justify-end mt-4">
//                         <button
//                             type="submit"
//                             className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
//                         >
//                             Save
//                         </button>
//                         <button
//                             type="button"
//                             onClick={handleFormClose}
//                             className="ml-2 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </form>
//             ) : (
//                 selectedComplaint ? (
//                     <div className="bg-gray-100 p-6 rounded-lg">
//                         <h3 className="text-xl font-bold mb-2">Complaint ID: {selectedComplaint.complaint_id}</h3>
//                         <p><strong>Title:</strong> {selectedComplaint.title}</p>
//                         <p><strong>Description:</strong> {selectedComplaint.description}</p>
//                         <p><strong>Status:</strong> {selectedComplaint.status}</p>
//                         <p><strong>Assigned To:</strong> {selectedComplaint.assigned_to}</p>
//                         <p><strong>Additional Text:</strong> {selectedComplaint.additional_text}</p>
//                         <div>
//                             <strong>Media:</strong>
//                             {selectedComplaint.media && selectedComplaint.media.length > 0 ? (
//                                 selectedComplaint.media.map((item, index) => (
//                                     <div key={index}>
//                                         <img src={item} alt={`Media ${index}`} className="w-full h-auto mt-2" />
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p>No media available.</p>
//                             )}
//                         </div>
//                         <div className="mt-4 flex space-x-4">
//                             <button 
//                                 onClick={handleForward}
//                                 className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
//                             >
//                                 Forward
//                             </button>
//                             <button 
//                                 onClick={handleReassign}
//                                 className="px-4 py-2 bg-green-500 text-white rounded-lg"
//                             >
//                                 Reassign
//                             </button>
//                             <button 
//                                 onClick={() => dispatch({ type: 'SELECT_COMPLAINT', payload: null })} 
//                                 className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//                             >
//                                 Back to Complaints
//                             </button>
//                         </div>
//                     </div>
//                 ) : (
//                     <div>
//                         {complaints.length > 0 ? (
//                             complaints.map((complaint) => (
//                                 <div 
//                                     key={complaint.complaint_id} 
//                                     className="bg-gray-100 p-4 rounded-lg mb-4 cursor-pointer"
//                                     onClick={() => handleCardClick(complaint)}
//                                 >
//                                     <h3 className="text-lg font-bold">Complaint ID: {complaint.complaint_id}</h3>
//                                     <p><strong>Title:</strong> {complaint.title}</p>
//                                     <p><strong>Status:</strong> {complaint.status}</p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No complaints found.</p>
//                         )}
//                     </div>
//                 )
//             )}
//         </div>
//     );
// };

// export default TeamLeadComplaintCards;


import React, { useState, useEffect } from 'react';
import { useComplaintContext } from '../EmpComplaintContext';
import { fetchComplaints } from '../complaints/actions/EmpComplaintActions';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const TeamLeadComplaintCards = () => {
    const { state, dispatch, forwardComplaint, reassignComplaint, updateComplaint } = useComplaintContext();
    const { complaints, error, selectedComplaint } = state;
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        additional_text: '',
        media: []
    });

    useEffect(() => {
        fetchComplaints(dispatch);
      }, [dispatch]);

    const handleCardClick = (complaint) => {
        dispatch({ type: 'SELECT_COMPLAINT', payload: complaint });
    };

    const handleForward = async () => {
        if (selectedComplaint) {
            await forwardComplaint(dispatch, selectedComplaint.complaint_id);
            alert("Successfully forwarded the complaint.");
        }
    };

    const getRoleIdByUserId = async (user_id) => {
        try {
            const response = await axios.get(`http://localhost:9000/roles/role/${user_id}`);
            return response.data.role_id;
        } catch (error) {
            console.error('Error fetching role ID:', error);
            throw new Error('Failed to fetch role ID');
        }
    };

    const handleReassign = async () => {
        if (selectedComplaint) {
            try {
                const roleId = await getRoleIdByUserId(selectedComplaint.user_id);

                // Fetch the current user's role ID
                const token = localStorage.getItem('accessToken');
                const decodedToken = jwtDecode(token);
                const currentUserRoleName = decodedToken.rolename;
                const roleMapping = {
                    CEO: 1,
                    HR: 2,
                    TEAM_MANAGER: 3,
                    TEAM_LEAD: 4,
                    EMPLOYEE: 5,
                    INTERN: 5
                };
                const currentUserRoleId = roleMapping[currentUserRoleName];

                // Check if the current user is the one who posted the complaint
                if (roleId === currentUserRoleId) {
                    // Open the form with the complaint details
                    setFormData({
                        title: selectedComplaint.title,
                        description: selectedComplaint.description,
                        additional_text: selectedComplaint.additional_text,
                        media: selectedComplaint.media
                    });
                    setIsFormOpen(true);
                    return;
                }

                // Proceed with reassigning the complaint
                await reassignComplaint(dispatch, selectedComplaint.complaint_id);
                alert("Successfully reassigned the complaint.");
            } catch (error) {
                console.error('Error handling reassignment:', error);
                alert("An error occurred while reassigning the complaint.");
            }
        }
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (selectedComplaint) {
            await updateComplaint(dispatch, selectedComplaint.complaint_id, formData);
            setIsFormOpen(false);
        }
    };

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Complaints To Solve</h2>

            {isFormOpen ? (
                <form onSubmit={handleFormSubmit} className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Reassign Complaint</h2>
                    <label className="block mb-2">
                        <span className="text-gray-700">Title</span>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="form-input mt-1 block w-full"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Description</span>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="form-textarea mt-1 block w-full"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Additional Text</span>
                        <textarea
                            name="additional_text"
                            value={formData.additional_text}
                            onChange={(e) => setFormData({ ...formData, additional_text: e.target.value })}
                            className="form-textarea mt-1 block w-full"
                        />
                    </label>
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={handleFormClose}
                            className="ml-2 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                selectedComplaint ? (
                    <div className="bg-gray-100 p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">Complaint ID: {selectedComplaint.complaint_id}</h3>
                        <p><strong>Title:</strong> {selectedComplaint.title}</p>
                        <p><strong>Description:</strong> {selectedComplaint.description}</p>
                        <p><strong>Status:</strong> {selectedComplaint.status}</p>
                        <p><strong>Assigned To:</strong> {selectedComplaint.assigned_to}</p>
                        <p><strong>Additional Text:</strong> {selectedComplaint.additional_text}</p>
                        <div>
                            <strong>Media:</strong>
                            {selectedComplaint.media && selectedComplaint.media.length > 0 ? (
                                selectedComplaint.media.map((item, index) => (
                                    <div key={index}>
                                        <img src={item} alt={`Media ${index}`} className="w-full h-auto mt-2" />
                                    </div>
                                ))
                            ) : (
                                <p>No media available.</p>
                            )}
                        </div>
                        <div className="mt-4 flex space-x-4">
                            <button 
                                onClick={handleForward}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                            >
                                Forward
                            </button>
                            <button 
                                onClick={handleReassign}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                            >
                                Reassign
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
                            complaints.map((complaint) => (
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
                )
            )}
        </div>
    );
};

export default TeamLeadComplaintCards;

