import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, BarChart3, FileText, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/dashboard/invoer', icon: FileText, label: 'Data Invoer' },
    { path: '/dashboard/rapporten', icon: FileText, label: 'Rapporten' },
    { path: '/dashboard/instellingen', icon: Settings, label: 'Instellingen' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">CO2-Inzicht</span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Uitloggen</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}