import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignOutButton } from '@clerk/clerk-react';
import { User } from 'lucide-react'; // Profile icon
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-text">
          TransformoDocs
        </Link>
      </div>
      <div className="navbar-actions">
        <SignedIn>
          <div className="profile-container">
            <User
              className="profile-icon"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <SignOutButton>
                  <button className="dropdown-item logout-button">Logout</button>
                </SignOutButton>
              </div>
            )}
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;