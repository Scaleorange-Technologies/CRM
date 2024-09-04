import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../loginContext';
import { login } from '../services/actions/loginaction';
const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData,dispatch,navigate)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg shadow-md hover:from-teal-600 hover:to-blue-600 transition duration-300"
                    >
                        Login
                    </button>

                    <p className="text-center mt-4 text-gray-600">
                        Don’t have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                            className="text-teal-600 hover:text-teal-700"
                        >
                            Register
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;










