import type { CSSProperties } from 'react';

export const styles: { [key: string]: CSSProperties } = {
  indicator: {
    position: 'absolute',
    height: '100%',
    borderLeft: '2px dotted',
    transform: 'translateX(-50%)',
    top: 0,
    transition: 'left 0.15s ease-in-out',
  },
};
