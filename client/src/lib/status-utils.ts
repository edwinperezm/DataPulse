// Status types and utility functions

export type ClientStatus = 'healthy' | 'needs-attention' | 'at-risk';
export type ClientTrend = 'improving' | 'stable' | 'declining';

export const getStatusColor = (status: ClientStatus) => {
  switch (status) {
    case 'healthy':
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        badge: 'bg-blue-100 text-blue-800',
        dot: 'bg-blue-500',
        icon: 'text-blue-500',
        accentBg: 'bg-blue-50'
      };
    case 'needs-attention':
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        badge: 'bg-yellow-100 text-yellow-800',
        dot: 'bg-yellow-500',
        icon: 'text-yellow-500',
        accentBg: 'bg-yellow-50'
      };
    case 'at-risk':
      return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        badge: 'bg-red-100 text-red-800',
        dot: 'bg-red-500',
        icon: 'text-red-500',
        accentBg: 'bg-red-50'
      };
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        badge: 'bg-gray-100 text-gray-800',
        dot: 'bg-gray-500',
        icon: 'text-gray-500',
        accentBg: 'bg-gray-50'
      };
  }
};

export const getIconBackground = (iconBg: string) => {
  switch (iconBg) {
    case 'success':
      return 'bg-green-100';
    case 'warning':
      return 'bg-yellow-100';
    case 'danger':
      return 'bg-red-100';
    case 'primary':
      return 'bg-primary-100';
    default:
      return 'bg-gray-100';
  }
};

export const getIconColor = (iconBg: string) => {
  switch (iconBg) {
    case 'success':
      return 'text-green-600';
    case 'warning':
      return 'text-yellow-600';
    case 'danger':
      return 'text-red-600';
    case 'primary':
      return 'text-primary-600';
    default:
      return 'text-gray-500';
  }
};

export const getTrendIcon = (trend: ClientTrend) => {
  switch (trend) {
    case 'improving':
      return { icon: 'arrow-up', color: 'text-green-600' };
    case 'declining':
      return { icon: 'arrow-down', color: 'text-red-600' };
    default:
      return { icon: 'arrow-right', color: 'text-gray-600' };
  }
};

export const getActivityIcon = (icon: string) => {
  return icon || 'circle';
};

export const getStatusLabel = (status: ClientStatus): string => {
  switch (status) {
    case 'healthy':
      return 'Healthy';
    case 'needs-attention':
      return 'Needs Attention';
    case 'at-risk':
      return 'At Risk';
    default:
      return 'Unknown';
  }
};

export const formatActivityDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Less than a day ago
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    if (hours < 1) {
      return 'Just now';
    }
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }
  
  // Less than a week ago
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
  
  // Format as date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};
