import type { MouseEvent } from 'react';
import { useState } from 'react';
import moment from 'moment-timezone';

export const useTimeline = (userTimezone: string) => {
  const currentTime = moment().tz(userTimezone);
  const initialPosition = ((currentTime.hour() * 60 + currentTime.minute()) / (24 * 60)) * 100;

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

  const handleShiftTime = (hours: number) => {
    const newTime = moment().tz(userTimezone).add(hours, 'hours');
    const newPosition = ((newTime.hour() * 60 + newTime.minute()) / (24 * 60)) * 100;
    setIndicatorPosition(newPosition);
  };

  return {
    indicatorPosition,
    handleTimelineClick,
    handleShiftTime,
    setIndicatorPosition,
  };
};

export default useTimeline;
