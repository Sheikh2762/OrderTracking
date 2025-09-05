import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Shield } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAdminRoute && (
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link to="/" className="flex items-center">
                <Package className="w-8 h-8 text-blue-600 mr-3" />
                <span className="text-xl font-bold text-gray-900">ParcelTracker</span>
              </Link>
              <Link
                to="/admin"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Portal
              </Link>
            </div>
          </div>
        </nav>
      )}
      {children}
    </div>
  );
};

export default Layout;