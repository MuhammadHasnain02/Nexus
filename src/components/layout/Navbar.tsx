import React, { useRef, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, MessageCircle, LogOut, Building2, CircleDollarSign, Home, Users, FileText, TrendingUp, VideoIcon, CreditCard, CalendarDays } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.ts';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!user) return null;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define sidebar items based on user role
  const entrepreneurItems = [
    { to: '/dashboard/entrepreneur', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/dashboard/profile/entrepreneur/' + user.id, icon: <Building2 size={20} />, text: 'My Startup' },
    { to: '/dashboard', icon: <CircleDollarSign size={20} />, text: 'Find Investors' },
    { to: '/dashboard/messages', icon: <MessageCircle size={20} />, text: 'Messages' },
    { to: '/dashboard/notifications', icon: <Bell size={20} />, text: 'Notifications' },
    { to: '/dashboard/scheduler', icon: <CalendarDays size={20} />, text: 'Scheduler' },
    { to: '/dashboard/entrepreneurs/meeting_room', icon: <VideoIcon size={20} />, text: 'Meeting Details' },
    { to: '/dashboard/entrepreneur/documents', icon: <FileText size={20} />, text: 'Documents' },
    { to: '/dashboard/entrepreneurs/payments', icon: <CreditCard size={20} />, text: 'payments' },
  ];
  
  const investorItems = [
    { to: '/dashboard/investor', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/dashboard/profile/investor/' + user.id, icon: <CircleDollarSign size={20} />, text: 'My Portfolio' },
    { to: '/dashboard/entrepreneurs/startups', icon: <Users size={20} />, text: 'Find Startups' },
    { to: '/dashboard/messages', icon: <MessageCircle size={20} />, text: 'Messages' },
    { to: '/dashboard/notifications', icon: <Bell size={20} />, text: 'Notifications' },
    { to: '/dashboard/deals', icon: <FileText size={20} />, text: 'Deals' },
    { to: '/dashboard/meetings', icon: <TrendingUp size={20} />, text: 'Investor Meetings' },
    { to: '/dashboard/investors/meeting_room', icon: <VideoIcon size={20} />, text: 'Video Calls' },
    { to: '/dashboard/investor/documents', icon: <FileText size={20} />, text: 'Documents' },
    { to: '/dashboard/investors/payments', icon: <CreditCard size={20} />, text: 'payments' },
  ];

  const navLinks = user?.role === 'entrepreneur' ? entrepreneurItems : investorItems;
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5">
        <div className="flex justify-between h-16">
          
          {/* Logo and brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900">Business Nexus</span>
            </Link>
          </div>
          
          {/* Desktop navigation (Scrollable Area) */}
          <div className="hidden md:flex md:items-center md:ml-5 lg:ml-8 flex-1 overflow-hidden relative group">
            
            {user && (
              <div className="hidden md:flex flex-1 overflow-hidden relative group">
                <div 
                  ref={scrollRef}
                  className="flex space-x-1 overflow-x-auto no-scrollbar scroll-smooth items-center py-2 px-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {navLinks.map((item, index) => {
                    const isActive = location.pathname === item.to;
                    return (
                      <Link
                        key={index}
                        to={item.to}
                        className={`flex items-center px-3 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                          isActive 
                            ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <span className="mr-2 opacity-80">{item.icon}</span>
                        {item.text}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Right Section: User Info & Logout */}
          <div className="hidden md:flex items-center space-x-4 ml-4">
            
            {user ? (
              <>
                <div className="h-8 w-px bg-gray-200 mx-2" />
                <Link to={`/dashboard/profile/${user.role}/${user.id}`} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <Avatar src={user.avatarUrl} alt={user.name} size="sm" status={user.isOnline ? 'online' : 'offline'} />
                  <span className="text-sm font-semibold text-gray-700 truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
                <Link to="/register"><Button size="sm">Get Started</Button></Link>
              </div>
            )}

          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
          
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <div className="flex items-center space-x-3 px-3 py-2">
                  <Avatar
                    src={user.avatarUrl}
                    alt={user.name}
                    size="sm"
                    status={user.isOnline ? 'online' : 'offline'}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-2">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-3">{link.icon}</span>
                      {link.text}
                    </Link>
                  ))}
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                  >
                    <LogOut size={18} className="mr-3" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link 
                  to="/login" 
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" fullWidth>Log in</Button>
                </Link>
                <Link 
                  to="/register" 
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button fullWidth>Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
