import React, { useState } from 'react';
import { Search, Package } from 'lucide-react';
import OrderDetails from './OrderDetails';

const TrackingPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [searchOrderId, setSearchOrderId] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setSearchOrderId(orderId.trim().toUpperCase());
    }
  };

  const handleReset = () => {
    setOrderId('');
    setSearchOrderId('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Package className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Track Your Order</h1>
            <p className="text-lg text-gray-600">
              Enter your order ID to check the current status and delivery progress
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your order ID (e.g., ORD123456)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Track Order
                </button>
              </div>
            </form>
          </div>

          {searchOrderId && (
            <OrderDetails orderId={searchOrderId} onReset={handleReset} />
          )}

          {!searchOrderId && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Package className="w-24 h-24 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready to track your order?
              </h3>
              <p className="text-gray-600">
                Enter your order ID above to get real-time tracking information and delivery updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;