import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  return (
    <header className="w-full">
      <div className="pet-header">
        <div className="pet-logo">
          <div className="pet-logo-icon bg-primary text-white">PT</div>
          <div>
            <span className="font-bold text-gray-800">Profitever</span>
            <span className="text-sm text-gray-600 ml-1">Traders</span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-700">Welcome <span className="text-primary font-bold">{username}</span></p>
        </div>
      </div>
      <nav className="pet-navbar">
        <div className="pet-navbar-links">
          <Link href="/dashboard" className="pet-navbar-link active">
            Dashboard
          </Link>
          <Link href="/profile" className="pet-navbar-link">
            My Profile
          </Link>
          <Link href="/pet-zone" className="pet-navbar-link">
            PET Zone
          </Link>
          <Link href="/invest-premium" className="pet-navbar-link">
            Invest Premium
          </Link>
          <Link href="/videos" className="pet-navbar-link">
            Videos
          </Link>
          <Link href="/meetings" className="pet-navbar-link">
            Meetings
          </Link>
          <Link href="/downloads" className="pet-navbar-link">
            Downloads
          </Link>
          <Link href="/help" className="pet-navbar-link">
            How we Help
          </Link>
          <Link href="/logout" className="pet-navbar-link">
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar; 