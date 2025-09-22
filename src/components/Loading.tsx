import { ReactNode } from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function Loading({
  size = 'md',
  text = 'Loading...',
  className = ""
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin`}></div>
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

// Skeleton component for loading states
interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
}

export function Skeleton({
  className = "",
  width = "w-full",
  height = "h-4",
  rounded = false
}: SkeletonProps) {
  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${width} ${height} ${rounded ? 'rounded' : ''} ${className}`}
    />
  );
}

// Table skeleton for loading table data
export function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4">
          <Skeleton width="w-10" height="h-10" rounded />
          <div className="flex-1 space-y-2">
            <Skeleton width="w-3/4" />
            <Skeleton width="w-1/2" />
          </div>
          <Skeleton width="w-20" />
          <Skeleton width="w-16" />
        </div>
      ))}
    </div>
  );
}
