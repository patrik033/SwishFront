import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './User/UserContext';

const LogOut: React.FC = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    const logoutUser = () => {
        setUser(null);
        navigate('/');
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md max-w-md">
                <p className="text-lg font-semibold mb-4">Are you sure you want to log out?</p>
                <button
                    onClick={logoutUser}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default LogOut;