import React from 'react';
import { cn } from '@/lib/utils';
import { BarChart2 } from 'lucide-react';

interface BrandedSpinnerProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  text?: string;
}

export function BrandedSpinner({
  className,
  size = 'medium',
  showText = true,
  text = 'Loading...'
}: BrandedSpinnerProps) {
  // Size mappings
  const sizeClasses = {
    small: 'h-12 w-12',
    medium: 'h-16 w-16',
    large: 'h-24 w-24'
  };

  const iconSizes = {
    small: 'h-5 w-5',
    medium: 'h-7 w-7',
    large: 'h-10 w-10'
  };

  const textSizes = {
    small: 'text-xs mt-2',
    medium: 'text-sm mt-3',
    large: 'text-base mt-4'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className={cn('relative', sizeClasses[size])}>
        {/* Outer spinning circle */}
        <div className={cn(
          'absolute inset-0 rounded-full border-4 border-primary-200 border-t-primary-600',
          'animate-spin duration-1000'
        )}></div>
        
        {/* Inner circle with brand icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn(
            'bg-white rounded-full flex items-center justify-center',
            size === 'small' ? 'h-8 w-8' : size === 'medium' ? 'h-10 w-10' : 'h-14 w-14'
          )}>
            <BarChart2 className={cn('text-primary-600', iconSizes[size])} />
          </div>
        </div>
      </div>
      
      {showText && (
        <p className={cn('text-gray-600 font-medium', textSizes[size])}>
          {text}
        </p>
      )}
    </div>
  );
}

// More elaborate branded spinner with pulse effect
export function BrandedSpinnerPro({
  className,
  size = 'medium',
  showText = true,
  text = 'Loading...'
}: BrandedSpinnerProps) {
  // Size mappings
  const sizeClasses = {
    small: 'h-16 w-16',
    medium: 'h-24 w-24',
    large: 'h-32 w-32'
  };

  const iconSizes = {
    small: 'h-6 w-6',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const textSizes = {
    small: 'text-xs mt-2',
    medium: 'text-sm mt-3',
    large: 'text-base mt-4'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className={cn('relative', sizeClasses[size])}>
        {/* Outer spinning circle */}
        <div className={cn(
          'absolute inset-0 rounded-full border-4 border-primary-100 border-t-primary-600 border-r-primary-400',
          'animate-spin duration-1500'
        )}></div>
        
        {/* Middle spinning circle (opposite direction) */}
        <div className={cn(
          'absolute rounded-full border-4 border-transparent border-b-primary-300',
          'animate-spin duration-1000 animate-reverse',
          size === 'small' ? 'inset-2' : size === 'medium' ? 'inset-3' : 'inset-4'
        )}></div>
        
        {/* Pulsing brand background */}
        <div className={cn(
          'absolute flex items-center justify-center rounded-full bg-primary-50',
          'animate-pulse duration-2000',
          size === 'small' ? 'inset-4' : size === 'medium' ? 'inset-6' : 'inset-8'
        )}>
          {/* Brand icon */}
          <BarChart2 className={cn('text-primary-600', iconSizes[size])} />
        </div>
      </div>
      
      {showText && (
        <p className={cn('text-gray-600 font-medium animate-pulse', textSizes[size])}>
          {text}
        </p>
      )}
    </div>
  );
}