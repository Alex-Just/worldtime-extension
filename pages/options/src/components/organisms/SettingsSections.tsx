import React from 'react';

import { ThemeSelector } from '@src/components/molecules';
import { DisplaySettings } from '@src/components/organisms';

interface SettingsSectionsProps {
  displaySettings: Array<{ label: string; checked: boolean | string }>;
  onDisplaySettingsChange: (label: string) => void;
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
  onShowDSTFlagChange: (newValue: 'DST' | 'Hide' | 'Summer/Winter') => void;
  colorOptions: Array<{ label: string; color: string }>;
}

const SettingsSections = ({
  displaySettings,
  onDisplaySettingsChange,
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
  onShowDSTFlagChange,
  colorOptions,
}: SettingsSectionsProps) => (
  <div id="settings-sections">
    <DisplaySettings
      settings={displaySettings}
      onSettingsChange={onDisplaySettingsChange}
      onShowDSTFlagChange={onShowDSTFlagChange}
    />
    <ThemeSelector
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      onPrimaryColorChange={onPrimaryColorChange}
      onSecondaryColorChange={onSecondaryColorChange}
      colorOptions={colorOptions}
    />
  </div>
);

export default SettingsSections;
