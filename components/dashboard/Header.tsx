import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Moon, 
  Sun,
  TrendingUp,
  BarChart2,
  BookOpen,
  Briefcase,
  Video,
  Calendar,
  Download,
  HelpingHand,
  ChevronDown,
  Star,
  Users
} from 'lucide-react';

interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <div className="bg-teal-500 text-white p-1.5 rounded mr-2 flex items-center justify-center">
              <span className="font-bold text-xs">PT</span>
            </div>
            <span className="text-xl font-bold text-teal-600">Profitever Traders</span>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-1">
            <Button variant="ghost" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <BarChart2 className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <Briefcase className="h-4 w-4 mr-2" />
              Portfolio
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <Users className="h-4 w-4 mr-2" />
              PET Zone
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <Star className="h-4 w-4 mr-2" />
              Invest Premium
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <Video className="h-4 w-4 mr-2" />
              Videos
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <Calendar className="h-4 w-4 mr-2" />
              Meetings
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <Download className="h-4 w-4 mr-2" />
              Downloads
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <HelpingHand className="h-4 w-4 mr-2" />
              How We Help
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-700"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              Menu
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showMobileMenu ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
        
        {/* Search and User Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search stocks, news, strategies..."
              className="pl-9 h-9 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <Moon className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <Settings className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2 ml-2 pl-2 border-l border-gray-200">
              <Avatar className="h-8 w-8 bg-teal-100 text-teal-600">
                <span className="font-medium text-sm">{username.charAt(0)}</span>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{username}</p>
                <p className="text-xs text-gray-500">Pro Trader</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white border-b border-gray-200 py-2 px-4">
          <nav className="flex flex-col space-y-1">
            <Button variant="ghost" className="justify-start text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <BarChart2 className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" className="justify-start text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <Briefcase className="h-4 w-4 mr-2" />
              Portfolio
            </Button>
            <Button variant="ghost" className="justify-start text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <Users className="h-4 w-4 mr-2" />
              PET Zone
            </Button>
            <Button variant="ghost" className="justify-start text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <Star className="h-4 w-4 mr-2" />
              Invest Premium
            </Button>
            <Button variant="ghost" className="justify-start text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <Video className="h-4 w-4 mr-2" />
              Videos
            </Button>
            <Button variant="ghost" className="justify-start text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <Calendar className="h-4 w-4 mr-2" />
              Meetings
            </Button>
            <Button variant="ghost" className="justify-start text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <Download className="h-4 w-4 mr-2" />
              Downloads
            </Button>
            <Button variant="ghost" className="justify-start text-gray-700 hover:text-teal-600 hover:bg-teal-50">
              <HelpingHand className="h-4 w-4 mr-2" />
              How We Help
            </Button>
          </nav>
        </div>
      )}
      
      {/* Market Status Bar */}
      <div className="bg-gray-50 border-b border-gray-200 py-1.5 px-4 text-sm">
        <div className="container mx-auto flex items-center justify-between overflow-x-auto">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">S&P 500</span>
              <span className="font-medium text-green-600">4,927.11</span>
              <span className="text-green-600 ml-1">+0.38%</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">NASDAQ</span>
              <span className="font-medium text-green-600">15,628.04</span>
              <span className="text-green-600 ml-1">+0.52%</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">DOW</span>
              <span className="font-medium text-red-600">38,671.69</span>
              <span className="text-red-600 ml-1">-0.14%</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">VIX</span>
              <span className="font-medium text-amber-600">18.62</span>
              <span className="text-amber-600 ml-1">+5.21%</span>
            </div>
          </div>
          <div className="flex items-center whitespace-nowrap">
            <span className="text-gray-600 mr-2">Market Status:</span>
            <span className="text-green-600 font-medium flex items-center">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-1.5"></span>
              Open
            </span>
            <span className="text-gray-600 mx-2">|</span>
            <span className="text-gray-600">Last Updated: 10:45 AM EST</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;