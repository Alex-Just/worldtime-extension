import type React from 'react';
import { useCallback } from 'react';

const useHandleKeyDown = (onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) => {
  return useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        // Simulate a mouse event for the keydown action
        const simulatedMouseEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          clientX: e.currentTarget.getBoundingClientRect().left,
          clientY: e.currentTarget.getBoundingClientRect().top,
        });
        onClick(simulatedMouseEvent as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>);
      }
    },
    [onClick],
  );
};

export default useHandleKeyDown;
