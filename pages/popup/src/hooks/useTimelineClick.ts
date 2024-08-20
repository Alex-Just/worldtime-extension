import type { MouseEvent } from 'react';
import { useState } from 'react';

export const useTimelineClick = (initialPosition: number) => {
  const [indicatorPosition, setIndicatorPosition] = useState<number>(initialPosition);

  const handleTimelineClick = (event: MouseEvent<HTMLDivElement>): void => {
    const timelineRect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - timelineRect.left;
    const timelineWidth = timelineRect.width;

    const totalMinutes: number = (clickX / timelineWidth) * (24 * 60);
    const clickedHour: number = Math.floor(totalMinutes / 60);
    const clickedMinute: number = totalMinutes % 60;

    const newPosition: number = ((clickedHour * 60 + clickedMinute) / (24 * 60)) * 100;
    setIndicatorPosition(newPosition);
  };

  return {
    indicatorPosition,
    handleTimelineClick,
  };
};
