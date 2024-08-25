import { useEffect, useState } from 'react';

import { getTimezones, removeTimezone, setTimezones, timezonesStorage } from '@extension/storage';
import { useGetTimezones } from '@extension/shared/lib/hooks';

export const useSelectedTimelines = () => {
  const { timezones = [], setTimezonesState } = useGetTimezones();
  const [editingTimezone, setEditingTimezone] = useState<string | null>(null);
  const [editingDisplayName, setEditingDisplayName] = useState<string>('');

  useEffect(() => {
    const unsubscribe = timezonesStorage.subscribe(async () => {
      const updatedTimezones = await getTimezones();
      setTimezonesState(updatedTimezones);
    });
    return () => unsubscribe();
  }, [setTimezonesState]);

  const handleRemoveTimezone = async (timezoneToRemove: string) => {
    await removeTimezone(timezoneToRemove);
    setTimezonesState(await getTimezones());
  };

  const handleMoveUp = async (timezoneToMove: string) => {
    const index = timezones.findIndex(tz => tz.timezone === timezoneToMove);
    if (index > 0) {
      const newList = [...timezones];
      [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
      await setTimezones(newList);
      setTimezonesState(await getTimezones());
    }
  };

  async function refetchTimezones() {
    setTimezonesState(await getTimezones());
  }

  const handleMoveDown = async (timezoneToMove: string) => {
    const index = timezones.findIndex(tz => tz.timezone === timezoneToMove);
    if (index < timezones.length - 1) {
      const newList = [...timezones];
      [newList[index + 1], newList[index]] = [newList[index], newList[index + 1]];
      await setTimezones(newList);
      await refetchTimezones();
    }
  };

  const handleEditTimezone = (timezoneToEdit: string, displayNameToEdit: string) => {
    setEditingTimezone(timezoneToEdit);
    setEditingDisplayName(displayNameToEdit);
  };

  return {
    timezones,
    refetchTimezones,
    editingTimezone,
    editingDisplayName,
    setEditingTimezone,
    setEditingDisplayName,
    handleRemoveTimezone,
    handleMoveUp,
    handleMoveDown,
    handleEditTimezone,
  };
};

export default useSelectedTimelines;
