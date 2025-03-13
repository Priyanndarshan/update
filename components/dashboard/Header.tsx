import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';

interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  return (
    <header className="w-full">
      <div className="nav-header">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>{username.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{username}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="nav-links">
            <a href="#" className="nav-link active">Overview</a>
            <a href="#" className="nav-link">Customers</a>
            <a href="#" className="nav-link">Products</a>
            <a href="#" className="nav-link">Settings</a>
          </div>
        </div>
        <div className="search-input">
          <Input type="search" placeholder="Search..." />
        </div>
      </div>
    </header>
  );
};

export default Header; 