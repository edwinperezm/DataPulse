import React from 'react';
import { cn } from '@/utils/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  actions,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn('l-layout-header pl-0', className)}>
      <div className="l-layout-title-wrapper">
        <h1 className="l-layout-title">{title}</h1>
        {subtitle && <p className="l-layout-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="l-layout-actions">{actions}</div>}
    </div>
  );
}