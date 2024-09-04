// // src/components/Register.jsx
// import React, { useState,useContext} from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// import { addUser } from '../services/actions/registeraction';
// import { AddContext } from '../registerContext';
// const Register = () => {
//   const roles = ['CEO', 'TEAM_LEAD', 'TEAM_MANAGER', 'EMPLOYEE', 'INTERN', 'HR'];
//   const navigate=useNavigate()
//   const {dispatch}= useContext(AddContext)
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmpassword: '',
//     phone: '',
//     rolename: roles[0],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async(e) => {
//     try{
//     e.preventDefault();
//     console.log(formData)
//     if (formData.password !== formData.confirmpassword) {
//       alert('Passwords do not match');
//       return;
//     }
//     await addUser(dispatch,formData,navigate);
  
//     }
//     catch{
//       alert('Not Registered')
//     }
    
//   }

//   // Dispatch the addUser action



//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg ">
//         <h2 className="text-2xl font-extrabold mb-6 text-gray-800 text-center">Register</h2>
//         <form onSubmit={handleSubmit} className="space-y-4 overflow-y-hidden">
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmpassword"
//               name="confirmpassword"
//               value={formData.confirmpassword}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone</label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="role" className="block text-sm font-medium text-gray-600">Role</label>
//             <select
//               id="rolename"
//               name="rolename"
//               value={formData.rolename}
//               onChange={handleChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//               required
//             >
//               {roles.map((role) => (
//                 <option key={role} value={role}>
//                   {role}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition duration-300"
//           >
//             Register
//           </button>

//           <div className="mt-4 text-center">
//             <p className="text-sm text-gray-600">Already have an account?<button
//                             type="button"
//                             onClick={() => navigate('/')}
//                             className="text-green-600 hover:text-green-700"
//                         >
//                             Login
//                         </button></p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default Register;


import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../services/actions/registeraction';
import { AddContext } from '../registerContext';

const Register = () => {
  const roles = ['CEO', 'TEAM_LEAD', 'TEAM_MANAGER', 'EMPLOYEE', 'INTERN', 'HR'];
  const navigate = useNavigate();
  const { dispatch } = useContext(AddContext);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    phone: '',
    rolename: roles[0],
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    phone: '',
  });

  const validateUsername = (username) =>
    /^[a-z0-9]{6,}$/.test(username); // Minimum 6 characters, only lowercase letters

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePasswordLength = (password) => password.length >= 6;

  const validatePhone = (phone) =>
    phone.length === 10 && /^\d+$/.test(phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'username':
        if (!validateUsername(value)) {
          error = 'Username should not be capital letters and special characters';
        }
        break;
      case 'email':
        if (!validateEmail(value)) {
          error = 'Email must be a valid email address';
        }
        break;
      case 'password':
        if (!validatePasswordLength(value)) {
          error = 'Password must be at least 6 characters long';
        }
        break;
      case 'confirmpassword':
        if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
      case 'phone':
        if (!validatePhone(value)) {
          error = 'Phone number must contain exactly 10 digits';
        }
        break;
      default:
        break;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !errors.username &&
      !errors.email &&
      !errors.password &&
      !errors.confirmpassword &&
      !errors.phone
    ) {
      try {
        await addUser(dispatch, formData, navigate);
      } catch {
        alert('Registration failed');
      }
    } else {
      alert('Please fix the errors before submitting');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-extrabold mb-6 text-gray-800 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-hidden">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            {errors.confirmpassword && <p className="text-red-500 text-sm mt-1">{errors.confirmpassword}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="rolename" className="block text-sm font-medium text-gray-600">Role</label>
            <select
              id="rolename"
              name="rolename"
              value={formData.rolename}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition duration-300"
          >
            Register
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-green-600 hover:text-green-700"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;








