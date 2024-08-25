import React, { useState } from 'react';

import { DSTOption, SwitchOption, TimeSelectionOption } from '@src/components/atoms';
import { showDSTFlagStorage, toggleShowDSTFlag } from '@extension/storage';
import { useStorageSuspense } from '@extension/shared';

interface DisplaySettingsProps {
  settings: Array<{ label: string; checked: boolean | string }>;
  onSettingsChange: (label: string) => void;
  timeStep: string;
  onTimeStepChange: (timeStep: string) => void;
}

const DisplaySettings = ({ settings, onSettingsChange, timeStep, onTimeStepChange }: DisplaySettingsProps) => {
  const showDSTFlag = useStorageSuspense(showDSTFlagStorage); // Now using showDSTFlag
  const [dstOption, setDSTOption] = useState(showDSTFlag); // useState now initializes from storage

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
        value={dstOption}
        onChange={newValue => {
          setDSTOption(newValue);
          void toggleShowDSTFlag(); // Use the centralized toggle function
        }}
        options={['Hide', 'DST', 'Summer/Winter']}
      />
      <TimeSelectionOption
        label="Time selection step"
        value={timeStep}
        onChange={onTimeStepChange}
        options={['15 minutes', '30 minutes']}
      />
    </div>
  );
};

export default DisplaySettings;
