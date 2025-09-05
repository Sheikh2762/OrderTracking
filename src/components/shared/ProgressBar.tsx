import React from 'react';
import { OrderStatus, ORDER_STATUSES } from '../../types/Order';
import { Check, Package, Truck, MapPin, Home } from 'lucide-react';

interface ProgressBarProps {
  currentStatus: OrderStatus;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStatus }) => {
  const currentIndex = ORDER_STATUSES.indexOf(currentStatus);
  
  const getIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Packed':
        return <Package className="w-5 h-5" />;
      case 'Dispatched':
        return <Truck className="w-5 h-5" />;
      case 'In Transit':
        return <MapPin className="w-5 h-5" />;
      case 'Out for Delivery':
        return <Truck className="w-5 h-5" />;
      case 'Delivered':
        return <Home className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex items-center justify-between">
      {ORDER_STATUSES.map((status, index) => {
        const isCompleted = index <= currentIndex;
        const isActive = index === currentIndex;
        
        return (
          <React.Fragment key={status}>
            <div className="flex flex-col items-center">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                ${isCompleted 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-400'
                }
                ${isActive ? 'ring-4 ring-blue-200' : ''}
              `}>
                {isCompleted && index < currentIndex ? (
                  <Check className="w-5 h-5" />
                ) : (
                  getIcon(status)
                )}
              </div>
              <span className={`
                mt-2 text-xs font-medium text-center
                ${isCompleted ? 'text-blue-600' : 'text-gray-400'}
              `}>
                {status}
              </span>
            </div>
            {index < ORDER_STATUSES.length - 1 && (
              <div className={`
                flex-1 h-1 mx-2 transition-all duration-300
                ${index < currentIndex ? 'bg-blue-600' : 'bg-gray-200'}
              `} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;