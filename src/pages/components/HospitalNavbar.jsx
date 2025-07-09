import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHospitalAlt, FaUserMd, FaUsers, FaSignOutAlt, FaSearch, FaBars, FaTachometerAlt } from "react-icons/fa";

const HospitalNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center gap-2 text-green-600 text-2xl font-bold">
          <FaHospitalAlt />
          <span>MedConnect</span>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex items-center bg-blue-100 rounded px-2 py-1 w-1/3">
          <FaSearch className="text-blue-600 mr-2" />
          <input
            type="text"
            placeholder="Search doctors or patients..."
            className="bg-transparent focus:outline-none text-sm w-full text-blue-900"
          />
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 items-center text-sm font-semibold">
          <li>
            <Link to="/admin/hospital" className="hover:text-green-600 flex items-center gap-1">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/hospital/doctors" className="hover:text-green-600 flex items-center gap-1">
              <FaUserMd /> Doctors
            </Link>
          </li>
          <li>
            <Link to="/admin/hospital/patients" className="hover:text-green-600 flex items-center gap-1">
              <FaUsers /> Patients
            </Link>
          </li>
          <li>
            <Link to="/logout" className="text-red-500 hover:underline flex items-center gap-1">
              <FaSignOutAlt /> Logout
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-blue-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={22} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-blue-50 text-blue-900">
          <Link to="/admin/hospital" className="block hover:text-green-600">📊 Dashboard</Link>
          <Link to="/admin/hospital/doctors" className="block hover:text-green-600">🧑‍⚕️ Doctors</Link>
          <Link to="/admin/hospital/patients" className="block hover:text-green-600">👥 Patients</Link>
          <Link to="/logout" className="block text-red-500 hover:underline">🚪 Logout</Link>
        </div>
      )}
    </nav>
  );
};

export default HospitalNavbar;
