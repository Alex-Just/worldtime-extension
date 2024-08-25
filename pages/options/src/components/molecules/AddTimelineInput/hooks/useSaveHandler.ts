import { useState, useEffect } from 'react';
import moment from 'moment-timezone';

import { useStorageSuspense } from '@extension/shared';
import { timezonesStorage } from '@extension/storage';

const useSaveHandler = (
  initialTimezone: string | null | undefined,
  initialDisplayName: string | undefined,
  onSaveComplete?: () => void,
) => {
  const [timezone, setTimezone] = useState(initialTimezone || '');
  const [displayName, setDisplayName] = useState(initialDisplayName || '');
  const [isEditing, setIsEditing] = useState(false);

  // Get the saved timezones from storage
  const savedTimezones = useStorageSuspense(timezonesStorage);

  // List of all timezones with formatted labels
  const timezones = moment.tz.names().map(tz => {
    const offset = moment.tz(tz).format('Z');
    const abbreviation = moment().tz(tz).format('z');
    return {
      label: `${tz.replace('_', ' ')} (${abbreviation})`,
      value: tz,
      offset: `UTC${offset}`,
    };
  });

  // Check if the handler is in edit mode based on initial values
  useEffect(() => {
    if (initialTimezone && initialDisplayName) {
      setDisplayName(initialDisplayName || '');
      setTimezone(initialTimezone || '');
      setIsEditing(true);
    }
  }, [initialTimezone, initialDisplayName]);

  const handleSaveTimeline = async (timezone: string, displayName: string) => {
    if (timezone && displayName) {
      if (isEditing) {
        const updatedTimezones = savedTimezones.map(tz =>
          tz.timezone === initialTimezone ? { timezone, displayName } : tz,
        );
        await timezonesStorage.set(updatedTimezones);
      } else {
        const newTimelines = [...savedTimezones, { timezone, displayName }];
        await timezonesStorage.set(newTimelines);
      }
    }
  };

  const onSave = async () => {
    await handleSaveTimeline(timezone, displayName);
    setTimezone('');
    setDisplayName('');
    if (onSaveComplete) onSaveComplete();
  };

  return {
    timezone,
    setTimezone,
    timezones,
    displayName,
    setDisplayName,
    onSave,
    isEditing,
    setIsEditing,
  };
};

export default useSaveHandler;
