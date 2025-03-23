import React from 'react';
import { cn } from '@/lib/utils';
import { BarChart2, UserCheck, ChartPie, Activity } from 'lucide-react';

interface BrandedSpinnerProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  text?: string;
  type?: 'default' | 'primary' | 'secondary' | 'tertiary';
  hideIcon?: boolean;
}

// Function to get a random icon to enhance the branded spinner visuals
const getRandomIcon = () => {
  const icons = [
    <BarChart2 className="h-full w-full" />, 
    <UserCheck className="h-full w-full" />, 
    <ChartPie className="h-full w-full" />, 
    <Activity className="h-full w-full" />
  ];
  return icons[Math.floor(Math.random() * icons.length)];
};

export function BrandedSpinner({
  className,
  size = 'medium',
  showText = true,
  text = 'Loading...',
  type = 'default',
  hideIcon = false
}: BrandedSpinnerProps) {
  // Size mappings
  const sizeClasses = {
    small: 'h-12 w-12',
    medium: 'h-16 w-16',
    large: 'h-24 w-24'
  };

  const iconContainerSizes = {
    small: 'h-5 w-5',
    medium: 'h-7 w-7',
    large: 'h-10 w-10'
  };

  const textSizes = {
    small: 'text-xs mt-2',
    medium: 'text-sm mt-3',
    large: 'text-base mt-4'
  };

  // Color variations based on type
  const typeColors = {
    default: {
      track: 'border-gray-100',
      spinner: 'border-t-primary-500 border-r-primary-300',
      icon: 'text-primary-600',
      text: 'text-gray-600'
    },
    primary: {
      track: 'border-blue-50',
      spinner: 'border-t-blue-500 border-r-blue-300', 
      icon: 'text-blue-600',
      text: 'text-blue-700'
    },
    secondary: {
      track: 'border-indigo-50',
      spinner: 'border-t-indigo-500 border-r-indigo-300',
      icon: 'text-indigo-600', 
      text: 'text-indigo-700'
    },
    tertiary: {
      track: 'border-purple-50',
      spinner: 'border-t-purple-500 border-r-purple-300',
      icon: 'text-purple-600',
      text: 'text-purple-700'
    }
  };

  // Get color scheme based on type
  const colors = typeColors[type];

  // Memoize the random icon to prevent re-renders
  const [icon] = React.useState(getRandomIcon);

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className={cn('relative', sizeClasses[size])}>
        {/* Outer track circle */}
        <div className={cn(
          'absolute inset-0 rounded-full border-4',
          colors.track
        )}></div>
        
        {/* Spinning circle */}
        <div className={cn(
          'absolute inset-0 rounded-full border-4 border-transparent',
          colors.spinner,
          'animate-spin duration-1000'
        )}></div>
        
        {/* Inner circle with brand icon */}
        {!hideIcon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn(
              'bg-white rounded-full flex items-center justify-center shadow-sm',
              size === 'small' ? 'h-8 w-8' : size === 'medium' ? 'h-10 w-10' : 'h-14 w-14'
            )}>
              <div className={cn(colors.icon, iconContainerSizes[size])}>
                {icon}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {showText && (
        <p className={cn('font-medium', colors.text, textSizes[size])}>
          {text}
        </p>
      )}
    </div>
  );
}

// More elaborate branded spinner with pulse effect and glowing animation
export function BrandedSpinnerPro({
  className,
  size = 'medium',
  showText = true,
  text = 'Loading...',
  type = 'default',
  hideIcon = false
}: BrandedSpinnerProps) {
  // Size mappings
  const sizeClasses = {
    small: 'h-16 w-16',
    medium: 'h-24 w-24',
    large: 'h-32 w-32'
  };

  const iconContainerSizes = {
    small: 'h-6 w-6',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const textSizes = {
    small: 'text-xs mt-2',
    medium: 'text-sm mt-3',
    large: 'text-base mt-4'
  };

  // Color variations based on type
  const typeColors = {
    default: {
      outerTrack: 'border-gray-100',
      outerSpinner: 'border-t-primary-500 border-r-primary-300',
      middleTrack: 'border-gray-50',
      middleSpinner: 'border-b-primary-300 border-l-primary-200',
      iconBg: 'bg-primary-50',
      iconGlow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]',
      icon: 'text-primary-600',
      text: 'text-gray-600'
    },
    primary: {
      outerTrack: 'border-blue-50',
      outerSpinner: 'border-t-blue-500 border-r-blue-300',
      middleTrack: 'border-blue-50',
      middleSpinner: 'border-b-blue-300 border-l-blue-200',
      iconBg: 'bg-blue-50',
      iconGlow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]',
      icon: 'text-blue-600',
      text: 'text-blue-700'
    },
    secondary: {
      outerTrack: 'border-indigo-50',
      outerSpinner: 'border-t-indigo-500 border-r-indigo-300',
      middleTrack: 'border-indigo-50',
      middleSpinner: 'border-b-indigo-300 border-l-indigo-200',
      iconBg: 'bg-indigo-50',
      iconGlow: 'shadow-[0_0_15px_rgba(99,102,241,0.5)]',
      icon: 'text-indigo-600',
      text: 'text-indigo-700'
    },
    tertiary: {
      outerTrack: 'border-purple-50',
      outerSpinner: 'border-t-purple-500 border-r-purple-300',
      middleTrack: 'border-purple-50',
      middleSpinner: 'border-b-purple-300 border-l-purple-200',
      iconBg: 'bg-purple-50',
      iconGlow: 'shadow-[0_0_15px_rgba(139,92,246,0.5)]',
      icon: 'text-purple-600',
      text: 'text-purple-700'
    }
  };

  // Get color scheme based on type
  const colors = typeColors[type];

  // Memoize the random icon to prevent re-renders
  const [icon] = React.useState(getRandomIcon);

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className={cn('relative', sizeClasses[size])}>
        {/* Outer track circle */}
        <div className={cn(
          'absolute inset-0 rounded-full border-4',
          colors.outerTrack
        )}></div>
        
        {/* Outer spinning circle */}
        <div className={cn(
          'absolute inset-0 rounded-full border-4 border-transparent',
          colors.outerSpinner,
          'animate-spin duration-1500'
        )}></div>
        
        {/* Middle track circle */}
        <div className={cn(
          'absolute rounded-full border-4',
          colors.middleTrack,
          size === 'small' ? 'inset-2' : size === 'medium' ? 'inset-3' : 'inset-4'
        )}></div>
        
        {/* Middle spinning circle (opposite direction) */}
        <div className={cn(
          'absolute rounded-full border-4 border-transparent',
          colors.middleSpinner,
          'animate-spin duration-1000 animate-reverse',
          size === 'small' ? 'inset-2' : size === 'medium' ? 'inset-3' : 'inset-4'
        )}></div>
        
        {!hideIcon && (
          /* Pulsing brand background with glow effect */
          <div className={cn(
            'absolute flex items-center justify-center rounded-full',
            colors.iconBg,
            colors.iconGlow,
            'animate-pulse duration-2000',
            size === 'small' ? 'inset-4' : size === 'medium' ? 'inset-6' : 'inset-8'
          )}>
            {/* Brand icon */}
            <div className={cn(colors.icon, iconContainerSizes[size])}>
              {icon}
            </div>
          </div>
        )}
      </div>
      
      {showText && (
        <p className={cn('font-medium animate-pulse', colors.text, textSizes[size])}>
          {text}
        </p>
      )}
    </div>
  );
}