import React, { useEffect, useState } from 'react';

import { getTimezones, removeTimezone, setTimezones } from '@extension/storage';
import { TimeZoneDisplay } from '@extension/shared/lib/components';
import AddTimelineInput from './AddTimelineInput';
import { getTimezoneInfo, generateUserHourMoments } from '@extension/shared/lib/utils';

const SelectedTimelines = () => {
  const [timezones, setTimezonesState] = useState<{ timezone: string; displayName: string }[]>([]);
  const [editingTimezone, setEditingTimezone] = useState<string | null>(null);
  const [editingDisplayName, setEditingDisplayName] = useState<string>('');
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userHourMoments = generateUserHourMoments(userTimezone);

  useEffect(() => {
    async function fetchTimezones() {
      const tz = await getTimezones();
      setTimezonesState(tz);
    }

    void fetchTimezones();
  }, []);

  const handleRemoveTimezone = async (timezoneToRemove: string) => {
    const updatedTimezones = timezones.filter(tz => tz.timezone !== timezoneToRemove);
    setTimezonesState(updatedTimezones);
    await removeTimezone(timezoneToRemove);
    const tz = await getTimezones();
    setTimezonesState(tz);
  };

  const handleMoveUp = async (timezoneToMove: string) => {
    const index = timezones.findIndex(tz => tz.timezone === timezoneToMove);
    if (index > 0) {
      const updatedTimezones = [...timezones];
      [updatedTimezones[index - 1], updatedTimezones[index]] = [updatedTimezones[index], updatedTimezones[index - 1]];
      setTimezonesState([...updatedTimezones]);
      await setTimezones(updatedTimezones);
    }
  };

  const handleMoveDown = async (timezoneToMove: string) => {
    const index = timezones.findIndex(tz => tz.timezone === timezoneToMove);
    if (index < timezones.length - 1) {
      const updatedTimezones = [...timezones];
      [updatedTimezones[index + 1], updatedTimezones[index]] = [updatedTimezones[index], updatedTimezones[index + 1]];
      setTimezonesState([...updatedTimezones]);
      await setTimezones(updatedTimezones);
    }
  };

  const handleEditTimezone = (timezoneToEdit: string, displayNameToEdit: string) => {
    setEditingTimezone(timezoneToEdit);
    setEditingDisplayName(displayNameToEdit);
  };

  return (
    <div>
      <h1>Selected timelines</h1>
      <div className="timeline" role="button" tabIndex={0}>
        {timezones.map(({ timezone, displayName }) => (
          <TimeZoneDisplay
            key={timezone}
            timezone={timezone}
            displayName={displayName}
            info={getTimezoneInfo(timezone)}
            userHourMoments={userHourMoments}
            isSettingsScreen={true}
            onRemove={handleRemoveTimezone}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onEdit={handleEditTimezone} // Pass the edit handler to the TimeZoneDisplay
          />
        ))}
      </div>
      <AddTimelineInput
        initialTimezone={editingTimezone}
        initialDisplayName={editingDisplayName}
        onSaveComplete={() => {
          setEditingTimezone(null);
          setEditingDisplayName('');

          async function fetchTimezones() {
            const tz = await getTimezones();
            setTimezonesState(tz);
          }

          void fetchTimezones();
        }}
      />
    </div>
  );
};

export default SelectedTimelines;
