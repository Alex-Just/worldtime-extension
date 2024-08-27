import React from 'react';

import type { MessageKey } from '@extension/i18n/lib/type';

import { ThemeSelector } from '@src/components/molecules';
import { DisplaySettings } from '@src/components/organisms';

interface SettingsSectionsProps {
  displaySettings: Array<{ label: MessageKey; checked: boolean | string }>;
  onDisplaySettingsChange: (label: string) => void;
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
  onShowDSTFlagChange: (newValue: 'DST' | 'Hide' | 'Summer/Winter') => void;
}

const SettingsSections = ({
  displaySettings,
  onDisplaySettingsChange,
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
  onShowDSTFlagChange,
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
    />
  </div>
);

export default SettingsSections;
