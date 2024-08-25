import React from 'react';

import { useStorageSuspense } from '@extension/shared/lib/hooks';
import { toggleUseDarkIcon, toggleUseDarkTheme, useDarkIconStorage, useDarkThemeStorage } from '@extension/storage/lib';
import { ColorOption, SwitchOption } from '@src/components/atoms';

interface ThemeSelectorProps {
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
  colorOptions: Array<{ label: string; color: string }>;
}

const ThemeSelector = ({
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
  colorOptions,
}: ThemeSelectorProps) => {
  const useDarkTheme = useStorageSuspense(useDarkThemeStorage);
  const useDarkIcon = useStorageSuspense(useDarkIconStorage);

  return (
    <div className="section">
      <h2>Theme</h2>
      <SwitchOption label="Use dark theme" checked={useDarkTheme} onChange={() => void toggleUseDarkTheme()} />
      <SwitchOption label="Use dark icon" checked={useDarkIcon} onChange={() => void toggleUseDarkIcon()} />
      <ColorOption label="Primary color" value={primaryColor} onChange={onPrimaryColorChange} options={colorOptions} />
      <ColorOption
        label="Secondary color"
        value={secondaryColor}
        onChange={onSecondaryColorChange}
        options={colorOptions}
      />
    </div>
  );
};

export default ThemeSelector;
