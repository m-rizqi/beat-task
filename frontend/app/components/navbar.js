import React, { useState } from "react";

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-purple fixed top-0 left-0 w-full z-50">
            <div className="px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <img
                            src="/assets/logo.png"
                            className="img-logo2 p-1"
                            alt="Logo"
                        />
                        <div className="text-white font-semibold ml-2 text-xl">
                            Beat Task!
                        </div>
                    </div>
                    <div>
                        <div className="ml-4 flex items-center space-x-4">
                            <a href="/" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                                Home
                            </a>
                            <a href="/schedule" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                                Schedule
                            </a>
                            <a href="/music" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                                Music
                            </a>
                            <div className="relative">
                                <button
                                    className="text-white rounded-lg p-2 focus:outline-none"
                                    onClick={toggleDropdown}
                                >
                                    <img src="/assets/user.png" className="img-navprofile" alt="User" />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg">
                                        {/* Isi Dropdown Menu */}
                                        <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</a>
                                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
