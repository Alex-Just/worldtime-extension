import { useState, useEffect } from 'react';
import type { Moment } from 'moment-timezone';
import moment from 'moment-timezone';

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState<Moment>(moment());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return currentTime;
};

export default useCurrentTime;
