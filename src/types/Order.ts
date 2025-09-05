export interface Order {
  id: string;
  orderId: string;
  customerName: string;
  product: string;
  status: OrderStatus;
  lastUpdate: any; // Firebase Timestamp
  createdAt: any; // Firebase Timestamp
}

export type OrderStatus = 'Packed' | 'Dispatched' | 'In Transit' | 'Out for Delivery' | 'Delivered';

export const ORDER_STATUSES: OrderStatus[] = [
  'Packed',
  'Dispatched', 
  'In Transit',
  'Out for Delivery',
  'Delivered'
];