import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaBars, FaSignOutAlt, FaCalendarAlt, FaUserInjured, FaSearch } from "react-icons/fa";

const DoctorNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Logo */}
        <div className="flex items-center gap-2 text-green-600 text-2xl font-bold">
          <FaUserMd />
          <span>MedConnect</span>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex items-center bg-blue-100 rounded px-2 py-1 w-1/3">
          <FaSearch className="text-blue-600 mr-2" />
          <input
            type="text"
            placeholder="Search patients, appointments..."
            className="bg-transparent focus:outline-none text-sm w-full text-blue-900"
          />
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-6 items-center text-sm font-medium">
          <li>
            <Link to="/admin/doctor" className="hover:text-green-600 flex items-center gap-1">
              <FaUserInjured /> DashBoard
            </Link>
          </li>
          <li>
            <Link to="/admin/doctor/schedule" className="hover:text-green-600 flex items-center gap-1">
              <FaCalendarAlt /> Schedule
            </Link>
          </li>
          <li>
            <Link to="/logout" className="text-red-500 hover:underline flex items-center gap-1">
              <FaSignOutAlt /> Logout
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-blue-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-blue-50 text-blue-800">
          <Link to="/admin/doctor" className="block hover:text-green-600">👥 Patients</Link>
          <Link to="/admin/doctor/schedule" className="block hover:text-green-600">📅 Appointments</Link>
          <Link to="/logout" className="block text-red-500 hover:underline">🚪 Logout</Link>
        </div>
      )}
    </nav>
  );
};

export default DoctorNavbar;
