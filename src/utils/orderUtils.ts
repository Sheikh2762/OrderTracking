export const generateOrderId = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  return `ORD${timestamp}`;
};

export const formatTimestamp = (timestamp: any): string => {
  if (!timestamp) return 'N/A';
  return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};