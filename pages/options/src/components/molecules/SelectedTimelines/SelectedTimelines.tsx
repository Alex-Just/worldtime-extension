import React from 'react';

import { TimeZoneDisplay } from '@extension/shared/lib/components';
import { generateUserHourMoments } from '@extension/shared/lib/utils';
import { AddTimelineInput } from '@src/components/molecules';

import { useSelectedTimelines } from './hooks';
import { styles } from './SelectedTimelines.styles';

const SelectedTimelines = () => {
  const {
    timezones = [],
    refetchTimezones,
    editingTimezone,
    editingDisplayName,
    setEditingTimezone,
    setEditingDisplayName,
    handleRemoveTimezone,
    handleMoveUp,
    handleMoveDown,
    handleEditTimezone,
  } = useSelectedTimelines();

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userHourMoments = generateUserHourMoments(userTimezone);

  return (
    <div>
      <h1>Selected timelines</h1>
      <div style={styles.timeline} role="button" tabIndex={0}>
        {timezones.map(({ timezone, displayName }) => (
          <TimeZoneDisplay
            key={timezone}
            timezone={timezone}
            displayName={displayName}
            userHourMoments={userHourMoments}
            isSettingsScreen={true}
            onRemove={handleRemoveTimezone}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onEdit={handleEditTimezone}
          />
        ))}
      </div>
      <AddTimelineInput
        initialTimezone={editingTimezone}
        initialDisplayName={editingDisplayName}
        onSaveComplete={() => {
          setEditingTimezone(null);
          setEditingDisplayName('');
          void refetchTimezones();
        }}
      />
    </div>
  );
};

export default SelectedTimelines;
