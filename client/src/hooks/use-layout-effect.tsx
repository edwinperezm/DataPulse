import { useEffect, useLayoutEffect as useReactLayoutEffect } from 'react';

export function useLayoutEffect(effect: React.EffectCallback, deps?: React.DependencyList) {
  // First run the effect passed by the component
  useReactLayoutEffect(() => {
    const cleanup = effect();
    
    // Then set up our resize observer
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);

    // Create resize observer to handle layout changes
    const resizeObserver = new ResizeObserver(() => {
      window.dispatchEvent(resizeEvent);
    });

    // Observe document body
    resizeObserver.observe(document.body);

    return () => {
      // Clean up the effect
      if (cleanup) cleanup();
      // Clean up the resize observer
      resizeObserver.disconnect();
    };
  }, deps);
}
