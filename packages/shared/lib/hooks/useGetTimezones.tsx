import { useCallback, useEffect, useState } from 'react';

import { getTimezones } from '@extension/storage';

export const useTimezones = () => {
  const [timezones, setTimezones] = useState<{ timezone: string; displayName: string }[]>([]);

  useEffect(() => {
    const loadTimezones = async () => {
      const tz = await getTimezones();
      setTimezones(tz);
    };
    loadTimezones();
  }, []);

  const setTimezonesState = useCallback((newTimezones: { timezone: string; displayName: string }[]) => {
    setTimezones(newTimezones);
  }, []);

  return {
    timezones,
    setTimezonesState,
  };
};

export default useTimezones;
