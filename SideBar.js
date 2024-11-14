import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';

const SideBar = ({ onLogout }) => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/product-management">Product Management</Link></li>
          <li><Link to="/user-management">User Management</Link></li>
          {/* Additional links can be added here */}
          <li><Link to="/admin" className="admin-link">Admin Section</Link></li>
          <li>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;