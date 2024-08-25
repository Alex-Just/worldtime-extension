import React from 'react';

import { DSTOption, SwitchOption } from '@src/components/atoms';
import { showDSTFlagStorage } from '@extension/storage';
import { useStorageSuspense } from '@extension/shared';

interface DisplaySettingsProps {
  settings: Array<{ label: string; checked: boolean | string }>;
  onSettingsChange: (label: string) => void;
  onShowDSTFlagChange: (newValue: 'DST' | 'Hide' | 'Summer/Winter') => void;
}

const DisplaySettings = ({ settings, onSettingsChange, onShowDSTFlagChange }: DisplaySettingsProps) => {
  const showDSTFlag = useStorageSuspense(showDSTFlagStorage);

  return (
    <div className="section">
      <h2>User Interface</h2>
      {settings.map(setting =>
        typeof setting.checked === 'boolean' ? (
          <SwitchOption
            key={setting.label}
            label={setting.label}
            checked={setting.checked}
            onChange={() => onSettingsChange(setting.label)}
          />
        ) : null,
      )}
      <DSTOption
        label="Show DST (daylight saving time) flag"
        value={showDSTFlag}
        onChange={(newValue: 'DST' | 'Hide' | 'Summer/Winter') => {
          onShowDSTFlagChange(newValue);
        }}
        options={['Hide', 'DST', 'Summer/Winter']}
      />
    </div>
  );
};

export default DisplaySettings;
