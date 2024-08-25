import React from 'react';

import { ColorOption, SwitchOption } from '@src/components/atoms';

interface ThemeSelectorProps {
  isDarkTheme: boolean;
  onThemeChange: () => void;
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
  colorOptions: Array<{ label: string; color: string }>;
}

const ThemeSelector = ({
  isDarkTheme,
  onThemeChange,
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
  colorOptions,
}: ThemeSelectorProps) => (
  <div className="section">
    <h2>Theme</h2>
    <SwitchOption label="Use dark theme" checked={isDarkTheme} onChange={onThemeChange} />
    <ColorOption label="Primary color" value={primaryColor} onChange={onPrimaryColorChange} options={colorOptions} />
    <ColorOption
      label="Secondary color"
      value={secondaryColor}
      onChange={onSecondaryColorChange}
      options={colorOptions}
    />
  </div>
);

export default ThemeSelector;
