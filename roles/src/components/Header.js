import React, { useState } from 'react';
import { Bell, Moon } from 'lucide-react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    // Redirect to login or another page if needed
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <input 
          type="text" 
          placeholder="Search" 
          className="p-2 rounded-lg border w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Moon size={20} />
          </button>
          <div className="relative">
            <div
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
              onClick={toggleMenu}
            >
              <i className="fas fa-user text-gray-600 text-sm"></i>
            </div>
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2">
                <div className="p-2 border-b">
                  <p className="font-semibold">Profile</p>
                </div>
                <button
                  className="w-full text-left p-2 hover:bg-gray-100"
                  onClick={() => {
                    // Handle profile view
                  }}
                >
                  View Profile
                </button>
                <button
                  className="w-full text-left p-2 hover:bg-gray-100"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
