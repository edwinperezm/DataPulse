import { useEffect } from 'react';

export function useLayoutEffect() {
  useEffect(() => {
    // Force a resize event to ensure proper layout
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);

    // Create resize observer to handle layout changes
    const resizeObserver = new ResizeObserver(() => {
      window.dispatchEvent(resizeEvent);
    });

    // Observe document body
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []); // Run only once when component mounts
}
