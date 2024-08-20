import { useState, useEffect } from 'react';
import moment from 'moment-timezone';

export const useTimeZone = (timezone: string) => {
  const [time, setTime] = useState<string>('');
  const [currentHour, setCurrentHour] = useState<number>(moment().tz(timezone).hour());

  useEffect(() => {
    const updateTime = () => {
      const now = moment().tz(timezone);
      setTime(now.format('HH:mm'));
      setCurrentHour(now.hour());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return { time, currentHour };
};
