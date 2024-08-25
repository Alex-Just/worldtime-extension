import { useEffect, useRef } from 'react';
import moment from 'moment-timezone';

const useShiftPercentage = (timezone: string) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const totalMinutesOffset = moment.tz(timezone).utcOffset();
    const minuteOffset = totalMinutesOffset % 60;
    const shiftPercentage = -minuteOffset / 15;

    if (ref.current) {
      ref.current.style.left = `${shiftPercentage}%`;
    }
  }, [timezone]);

  return ref;
};

export default useShiftPercentage;
