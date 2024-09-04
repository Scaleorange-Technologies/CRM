// import React, { useState, useContext } from 'react';
// import { ComplaintContext } from './ComplaintContext';
// import { setTitle, setDescription, setFile, setAdditionalText, setStatus, setAssignedTo, submitComplaint } from './complaints/actions/ComplaintActions';

// const ComplaintForm = ({ onClose, isDarkMode }) => {
//   const { state, dispatch } = useContext(ComplaintContext);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', state.title);
//     formData.append('description', state.description);
//     formData.append('file', state.file);
//     formData.append('additional_text', state.additionalText);
//     formData.append('status', state.status);
//     formData.append('assigned_to', state.assignedTo);
//     console.log(formData.get('title'));
//     submitComplaint(dispatch, formData);
//     onClose(); // Close the modal after submission
//   };

//   return (
//     <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-600'}`}>
//       <div className={`p-6 rounded-lg shadow-lg w-1/2 max-h-[600px] overflow-y-auto ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
//         <h2 className="text-xl font-semibold mb-4">Post a Complaint</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
//             <input
//               type="text"
//               value={state.title}
//               onChange={(e) => setTitle(dispatch, e.target.value)}
//               className={`w-full p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
//             <textarea
//               value={state.description}
//               onChange={(e) => setDescription(dispatch, e.target.value)}
//               className={`w-full p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
//               required
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>File Upload</label>
//             <input
//               type="file"
//               onChange={(e) => setFile(dispatch, e.target.files[0])}
//               className={`w-full p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
//             />
//           </div>
//           <div className="mb-4">
//             <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Additional Text</label>
//             <textarea
//               value={state.additionalText}
//               onChange={(e) => setAdditionalText(dispatch, e.target.value)}
//               className={`w-full p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
//             <select
//               value={state.status}
//               onChange={(e) => setStatus(dispatch, e.target.value)}
//               className={`w-full p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
//               required
//             >
//               <option value="" disabled>Select status</option>
//               <option value="Open">Open</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Closed">Closed</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Assigned To</label>
//             <input
//               type="text"
//               value={state.assignedTo}
//               onChange={(e) => setAssignedTo(dispatch, e.target.value)}
//               className={`w-full p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
//               required
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={onClose}
//               className={`px-4 py-2 rounded-lg mr-2 ${isDarkMode ? 'bg-red-500' : 'bg-red-400'} text-white`}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white`}
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ComplaintForm;


import React, { useState, useContext } from 'react';
import { ComplaintContext } from './ComplaintContext';
import { setTitle, setDescription, setFile, setAdditionalText, setStatus, setAssignedTo, submitComplaint } from './complaints/actions/ComplaintActions';

const ComplaintForm = ({ onClose, isDarkMode }) => {
  const { state, dispatch } = useContext(ComplaintContext);

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    additionalText: ''
  
  });

  const validateTitle = (title) => /^[a-zA-Z\s]+$/.test(title.trim());
  const validateDescription = (description) => /^[a-zA-Z0-9\s]+$/.test(description.trim());
  const validateAdditionalText = (text) => /^[a-zA-Z0-9\s]+$/.test(text.trim()); // Validate additional text
 
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let error = '';

    switch (name) {
      case 'title':
        if (!validateTitle(value)) {
          error = 'Title must contain only alphabets';
        }
        break;
      case 'description':
        if (!validateDescription(value)) {
          error = 'Description must contain only numbers and alphabets';
        }
        break;
      case 'additionalText':
        if (!validateAdditionalText(value)) {
          error = 'Additional Text must contain only numbers and alphabets';
        }
        break;
      // case 'assignedTo':
      //   if (!validateAssignedTo(value)) {
      //     error = 'Assigned To must contain only numbers';
      //   }
      //   break;
      // case 'status':
      //   if (!validateStatus(value)) {
      //     error = 'Status must contain only alphabets and underscores';
      //   }
      //   break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: error });
    if (name === 'file') {
      setFile(dispatch, files[0]);
    } else if (name === 'additionalText') {
      setAdditionalText(dispatch, value);
    } 
     else {
      dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, file, additionalText } = state;

    if (
      !errors.title &&
      !errors.description &&
      !errors.additionalText 
     
    ) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file); // File is still included in the form data
      formData.append('additional_text', additionalText);
     

      submitComplaint(dispatch, formData);
      onClose(); // Close the modal after submission
    } else {
      alert('Please fix the errors before submitting');
    }
  };

  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-600'}`}>
      <div className={`p-6 rounded-lg shadow-lg w-full max-w-lg ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="text-2xl font-extrabold mb-6 text-center">Post a Complaint</h2>
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-hidden">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={state.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              value={state.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="file" className="block text-sm font-medium">File Upload</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="additionalText" className="block text-sm font-medium">Additional Text</label>
            <textarea
              id="additionalText"
              name="additionalText"
              value={state.additionalText}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            ></textarea>
            {errors.additionalText && <p className="text-red-500 text-sm mt-1">{errors.additionalText}</p>}
          </div>

          {/* <div>
            <label htmlFor="status" className="block text-sm font-medium">Status</label>
            <select
              id="status"
              name="status"
              value={state.status}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="" disabled>Select status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
          </div>

          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium">Assigned To</label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={state.assignedTo}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            {errors.assignedTo && <p className="text-red-500 text-sm mt-1">{errors.assignedTo}</p>}
          </div> */}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-red-500 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
