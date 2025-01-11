'use client';

interface SkeletonLoaderProps {
  height?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ height = 200 }) => {
  return (
    <div 
      className="animate-pulse bg-gray-700 rounded-lg"
      style={{ height: `${height}px` }}
    />
  );
};