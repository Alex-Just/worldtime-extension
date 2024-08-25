import React from 'react';

import { ThemeSelector } from '@src/components/molecules';
import { DisplaySettings } from '@src/components/organisms';

interface SettingsSectionsProps {
  displaySettings: Array<{ label: string; checked: boolean | string }>;
  onDisplaySettingsChange: (label: string) => void;
  timeStep: string;
  onTimeStepChange: (timeStep: string) => void;
  isDarkTheme: boolean;
  onThemeChange: () => void;
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
  colorOptions: Array<{ label: string; color: string }>;
}

const SettingsSections = ({
  displaySettings,
  onDisplaySettingsChange,
  timeStep,
  onTimeStepChange,
  isDarkTheme,
  onThemeChange,
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
  colorOptions,
}: SettingsSectionsProps) => (
  <div id="settings-sections">
    <DisplaySettings
      settings={displaySettings}
      onSettingsChange={onDisplaySettingsChange}
      timeStep={timeStep}
      onTimeStepChange={onTimeStepChange}
    />
    <ThemeSelector
      isDarkTheme={isDarkTheme}
      onThemeChange={onThemeChange}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      onPrimaryColorChange={onPrimaryColorChange}
      onSecondaryColorChange={onSecondaryColorChange}
      colorOptions={colorOptions}
    />
  </div>
);

export default SettingsSections;
