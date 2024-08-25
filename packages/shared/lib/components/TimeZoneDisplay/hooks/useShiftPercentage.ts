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

      const currentWidth = ref.current.style.width;
      if (currentWidth) {
        // Safely parse the current width value and unit
        const widthMatch = currentWidth.match(/^(\d+(\.\d+)?)(.*)$/);
        if (widthMatch) {
          const [, value, , unit] = widthMatch;
          const currentWidthValue = parseFloat(value);
          const newWidthValue = currentWidthValue * (1 - (shiftPercentage * 1.1) / 100);
          const finalWidthValue = Math.max(newWidthValue, 0); // Ensure new width isn't negative
          ref.current.style.width = `${finalWidthValue}${unit}`;
        }
      }
    }
  }, [timezone]);

  return ref;
};

export default useShiftPercentage;
