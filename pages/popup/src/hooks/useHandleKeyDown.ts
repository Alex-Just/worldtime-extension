import { useCallback } from 'react';

export const useHandleKeyDown = () => {
  return useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const timelineElement = e.currentTarget;
      const simulatedMouseEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: timelineElement.getBoundingClientRect().left + timelineElement.clientWidth / 2,
        clientY: timelineElement.getBoundingClientRect().top + timelineElement.clientHeight / 2,
      });

      timelineElement.dispatchEvent(simulatedMouseEvent);
    }
  }, []);
};

export default useHandleKeyDown;
