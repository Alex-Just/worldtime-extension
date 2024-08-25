import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { Autocomplete, TextField, Button } from '@mui/material';
import { useStorageSuspense } from '@extension/shared';
import { timezonesStorage } from '@extension/storage';

interface AddTimelineInputProps {
  initialTimezone?: string | null;
  initialDisplayName?: string;
  onSaveComplete?: () => void;
}

const AddTimelineInput = ({ initialTimezone, initialDisplayName, onSaveComplete }: AddTimelineInputProps) => {
  const [timezone, setTimezone] = useState(initialTimezone || '');
  const [displayName, setDisplayName] = useState(initialDisplayName || '');
  const [isEditing, setIsEditing] = useState(false);
  const savedTimezones = useStorageSuspense(timezonesStorage);

  useEffect(() => {
    if (initialTimezone && initialDisplayName) {
      setTimezone(initialTimezone);
      setDisplayName(initialDisplayName);
      setIsEditing(true);
    }
  }, [initialTimezone, initialDisplayName]);

  const timezones = moment.tz.names().map(tz => {
    const offset = moment.tz(tz).format('Z');
    const abbreviation = moment().tz(tz).format('z'); // Get the correct timezone abbreviation
    return {
      label: `${tz.replace('_', ' ')} (${abbreviation})`,
      value: tz,
      offset: `UTC${offset}`,
    };
  });

  const handleSaveTimeline = async () => {
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

      setTimezone('');
      setDisplayName('');
      setIsEditing(false);
      if (onSaveComplete) onSaveComplete();
    }
  };

  return (
    <div id="add-timeline">
      <h1>{isEditing ? 'Edit timeline' : 'Add a new timeline'}</h1>
      <div className="timeline-form">
        <Autocomplete
          options={timezones}
          getOptionLabel={option => option.label}
          value={timezones.find(tz => tz.value === timezone) || null}
          onChange={(event, newValue) => setTimezone(newValue ? newValue.value : '')}
          renderOption={(props, option) => (
            <li
              {...props}
              key={option.value}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
                fontWeight: 'bold',
                fontSize: '16px',
                lineHeight: '24px',
              }}>
              <span>{option.label}</span>
              <span style={{ fontWeight: 'normal', fontSize: '14px', lineHeight: '20px' }}>{option.offset}</span>
            </li>
          )}
          renderInput={params => (
            <TextField
              {...params}
              placeholder="Choose timezone"
              variant="outlined"
              fullWidth
              InputProps={{
                ...params.InputProps,
                style: { color: '#FFFFFF', backgroundColor: 'transparent', height: '50px' },
              }}
              InputLabelProps={{ style: { color: '#B0B0B0' } }}
            />
          )}
        />
        <TextField
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          placeholder="Enter name to display"
          variant="outlined"
          fullWidth
          style={{ color: '#E0E0E0', backgroundColor: 'transparent', height: '50px', flex: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveTimeline}
          className="add-button"
          disabled={!timezone || !displayName}
          style={{ height: '50px' }}>
          {isEditing ? 'SAVE' : 'ADD'}
        </Button>
      </div>
    </div>
  );
};

export default AddTimelineInput;
