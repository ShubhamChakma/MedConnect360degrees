import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-gray-800 to-gray-900 text-gray-300 pt-10 pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-600 pb-10">
        
        {/* Brand Column */}
        <div>
          <h2 className="text-xl font-semibold text-indigo-400 mb-3">MedConnect 360</h2>
          <p className="text-sm leading-relaxed">
            Your complete healthcare companion, powered by AI and designed for modern healthcare needs.
          </p>
          <p className="text-xs text-gray-400 mt-4">
            © <span className="text-white">2025</span> MedConnect 360. All rights reserved.
            <br />
            Created by <span className="text-indigo-300">Shivam & Shubham Chakma</span>.
            <br />
            This software and its documentation are protected by copyright law.
          </p>
        </div>

        {/* Full Features */}
        <div>
          <h3 className="text-indigo-400 font-semibold mb-3">Features</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-indigo-300">Home</Link></li>
            <li><Link to="/appointment" className="hover:text-indigo-300">Appointment Booking</Link></li>
            <li><Link to="/diet" className="hover:text-indigo-300">Diet Planner</Link></li>
            <li><Link to="/analytics" className="hover:text-indigo-300">Health Analytics</Link></li>
            <li><Link to="/medicine" className="hover:text-indigo-300">Medicine Tracker</Link></li>
            <li><Link to="/dashboard" className="hover:text-indigo-300">Patient Dashboard</Link></li>
            <li><Link to="/symptom" className="hover:text-indigo-300">Symptom Checker</Link></li>
            <li><Link to="/telemedicine" className="hover:text-indigo-300">TeleMedicine</Link></li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h3 className="text-indigo-400 font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-indigo-300">About Us</Link></li>
            <li><Link to="/privacy" className="hover:text-indigo-300">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-indigo-300">Terms of Service</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-300">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-indigo-400 font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-300">Help Center</a></li>
            <li><a href="#" className="hover:text-indigo-300">Documentation</a></li>
            <li><a href="#" className="hover:text-indigo-300">Community</a></li>
            <li><a href="#" className="hover:text-indigo-300">Status</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs text-gray-500 pt-6">
        &copy; 2025 MedConnect 360. Built with 💦💦💦 by Shivam & Shubham Chakma & Keshav Verma.
      </div>
    </footer>
  );
};

export default Footer;
