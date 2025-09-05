import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Order } from '../../types/Order';
import { RefreshCw, AlertCircle } from 'lucide-react';
import ProgressBar from '../shared/ProgressBar';
import StatusBadge from '../shared/StatusBadge';
import LoadingSpinner from '../shared/LoadingSpinner';

interface OrderDetailsProps {
  orderId: string;
  onReset: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId, onReset }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    setOrder(null);

    // First, we need to query the collection to find the order by orderId
    import('firebase/firestore').then(({ collection, query, where, onSnapshot: firestoreOnSnapshot }) => {
      const q = query(collection(db, 'orders'), where('orderId', '==', orderId));
      
      const unsubscribe = firestoreOnSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) {
          setError('Order not found. Please check your order ID and try again.');
          setLoading(false);
          return;
        }
        
        const orderDoc = querySnapshot.docs[0];
        const orderData = { id: orderDoc.id, ...orderDoc.data() } as Order;
        setOrder(orderData);
        setLoading(false);
      }, (error) => {
        setError('Failed to fetch order details. Please try again.');
        setLoading(false);
      });

      return () => unsubscribe();
    });
  }, [orderId]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <LoadingSpinner />
        <p className="text-center text-gray-600 mt-4">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={onReset}
            className="flex items-center mx-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Order Details</h2>
            <p className="opacity-90">Order ID: {order.orderId}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Customer:</span>
                <span className="font-medium">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Product:</span>
                <span className="font-medium">{order.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium">{formatDate(order.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Update:</span>
                <span className="font-medium">{formatDate(order.lastUpdate)}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
            <div className="space-y-4">
              <StatusBadge status={order.status} />
              <p className="text-gray-600">
                {order.status === 'Delivered' 
                  ? 'Your order has been successfully delivered!'
                  : `Your order is currently ${order.status.toLowerCase()}.`
                }
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Delivery Progress</h3>
          <ProgressBar currentStatus={order.status} />
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={onReset}
            className="flex items-center px-6 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Track Another Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;