import React from 'react';
import './navbar.css';

interface NavbarProps {
  activePage?: 'home' | 'create' | 'view';
}

const Navbar: React.FC<NavbarProps> = ({ activePage = 'home' }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="app-logo">note.able</span>
        </div>
        <div className="navbar-links">
          <a href="#" className={`navbar-link ${activePage === 'home' ? 'active' : ''}`}>
            Home
          </a>
          <a href="#" className={`navbar-link ${activePage === 'create' ? 'active' : ''}`}>
            Create Playlist
          </a>
          <a href="#" className={`navbar-link ${activePage === 'view' ? 'active' : ''}`}>
            My Playlists
          </a>
        </div>
        <div className="navbar-profile">
          <div className="profile-icon">
            <span>A</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;