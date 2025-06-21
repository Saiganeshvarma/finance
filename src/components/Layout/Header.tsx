import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Menu, X, DollarSign } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { notifications } = useApp();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'depositor': return '/depositor';
      case 'borrower': return '/borrower';
      case 'admin': return '/admin';
      default: return '/';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FinanceFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-gray-500 text-center">
                            No notifications
                          </div>
                        ) : (
                          notifications.slice(0, 5).map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                                !notification.read ? 'bg-blue-50' : ''
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-sm">{notification.title}</p>
                                  <p className="text-gray-600 text-xs mt-1">{notification.message}</p>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden lg:block">{user.name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-gray-600 hover:text-gray-900"
            >
              {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {user ? (
              <div className="space-y-4">
                <Link
                  to={getDashboardLink()}
                  className="block text-gray-700 hover:text-primary-600 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Dashboard
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-primary-600 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-primary-600 text-white px-4 py-2 rounded-lg text-center hover:bg-primary-700 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;