// Status types and utility functions

export type ClientStatus = 'healthy' | 'needs-attention' | 'at-risk';
export type ClientTrend = 'improving' | 'stable' | 'declining';

export const getStatusColor = (status: ClientStatus) => {
  switch (status) {
    case 'healthy':
      return {
        bg: 'bg-[#152C14]',
        text: 'text-[#07A500]',
        badge: 'bg-[#152C14] text-[#07A500]',
        dot: 'bg-[#07A500]',
        icon: 'text-[#07A500]',
        accentBg: 'bg-[#152C14]'
      };
    case 'needs-attention':
      return {
        bg: 'bg-[#333116]',
        text: 'text-[#EDDD05]',
        badge: 'bg-[#333116] text-[#EDDD05]',
        dot: 'bg-[#EDDD05]',
        icon: 'text-[#EDDD05]',
        accentBg: 'bg-[#333116]'
      };
    case 'at-risk':
      return {
        bg: 'bg-[#331616]',
        text: 'text-[#E30000]',
        badge: 'bg-[#331616] text-[#E30000]',
        dot: 'bg-[#E30000]',
        icon: 'text-[#E30000]',
        accentBg: 'bg-[#331616]'
      };
    default:
      return {
        bg: 'bg-[#192832]',
        text: 'text-[#0095FF]',
        badge: 'bg-[#192832] text-[#0095FF]',
        dot: 'bg-[#0095FF]',
        icon: 'text-[#0095FF]',
        accentBg: 'bg-[#192832]'
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
