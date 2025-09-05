import React from 'react';
import { OrderStatus } from '../../types/Order';

interface StatusBadgeProps {
  status: OrderStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Packed':
        return 'bg-yellow-100 text-yellow-800';
      case 'Dispatched':
        return 'bg-blue-100 text-blue-800';
      case 'In Transit':
        return 'bg-purple-100 text-purple-800';
      case 'Out for Delivery':
        return 'bg-orange-100 text-orange-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;