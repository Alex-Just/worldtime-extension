import React from 'react';

import { Autocomplete, TextField, Button } from '@mui/material';

import { t } from '@extension/i18n';

import { useSaveHandler } from './hooks';
import { styles } from './AddTimelineInput.styles';
import { useStorageSuspense } from '@extension/shared/lib/hooks';
import { secondaryColorStorage } from '@extension/storage/lib';

interface AddTimelineInputProps {
  initialTimezone?: string | null;
  initialDisplayName?: string;
  onSaveComplete?: () => void;
}

const AddTimelineInput = ({ initialTimezone, initialDisplayName, onSaveComplete }: AddTimelineInputProps) => {
  const { timezone, setTimezone, timezones, displayName, setDisplayName, onSave, isEditing, setIsEditing } =
    useSaveHandler(initialTimezone, initialDisplayName, onSaveComplete);
  const secondaryColor = useStorageSuspense(secondaryColorStorage);

  return (
    <div id="add-timeline" style={styles.addTimelineContainer}>
      <h1>{isEditing ? t('editTimelineTitle') : t('addNewTimelineTitle')}</h1>
      <div className="timeline-form" style={styles.timelineForm}>
        <Autocomplete
          options={timezones}
          getOptionLabel={option => option.label}
          style={styles.autocompleteRoot}
          value={timezones.find(tz => tz.value === timezone) || null}
          onChange={(_, newValue) => {
            if (newValue === null) {
              setIsEditing(false);
            }
            setTimezone(newValue ? newValue.value : '');
          }}
          renderOption={(props, option) => (
            <li {...props} key={option.value} style={styles.option}>
              <span>{option.label}</span>
              <span style={styles.optionOffset}>{option.offset}</span>
            </li>
          )}
          renderInput={params => (
            <TextField
              {...params}
              placeholder={t('chooseTimezonePlaceholder')}
              variant="outlined"
              fullWidth
              InputProps={{
                ...params.InputProps,
                style: styles.inputProps,
              }}
              InputLabelProps={{ style: styles.inputLabelProps }}
            />
          )}
        />
        <TextField
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          placeholder={t('enterNamePlaceholder')}
          variant="outlined"
          fullWidth
          style={styles.textField}
        />
        <Button
          variant="contained"
          onClick={onSave}
          className="add-button"
          disabled={!timezone || !displayName}
          style={{
            ...styles.button,
            backgroundColor: isEditing ? secondaryColor : undefined,
          }}>
          {isEditing ? t('saveButton') : t('addButton')}
        </Button>
      </div>
    </div>
  );
};

export default AddTimelineInput;
