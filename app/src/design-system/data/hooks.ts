import { useRef } from 'react';

/**
 * Simple zoom hook for timeline container
 * Simplified version that just provides a container ref
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useCenterBasedZoom = (_zoomLevel: number) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return {
    containerRef
  };
}; 