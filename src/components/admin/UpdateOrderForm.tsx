import React, { useState } from 'react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Order, OrderStatus, ORDER_STATUSES } from '../../types/Order';
import { X, Edit3 } from 'lucide-react';

interface UpdateOrderFormProps {
  order: Order;
  onClose: () => void;
}

const UpdateOrderForm: React.FC<UpdateOrderFormProps> = ({ order, onClose }) => {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (status === order.status) {
      onClose();
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await updateDoc(doc(db, 'orders', order.id), {
        status,
        lastUpdate: serverTimestamp()
      });
      
      onClose();
    } catch (error) {
      setError('Failed to update order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <Edit3 className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold">Update Order Status</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Order Details</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Order ID:</span> {order.orderId}</p>
              <p><span className="font-medium">Customer:</span> {order.customerName}</p>
              <p><span className="font-medium">Product:</span> {order.product}</p>
              <p><span className="font-medium">Current Status:</span> {order.status}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                New Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as OrderStatus)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {ORDER_STATUSES.map((statusOption) => (
                  <option key={statusOption} value={statusOption}>
                    {statusOption}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || status === order.status}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderForm;