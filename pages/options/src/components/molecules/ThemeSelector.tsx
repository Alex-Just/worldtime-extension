import React from 'react';

import { t } from '@extension/i18n';

import { useStorageSuspense } from '@extension/shared/lib/hooks';
import { toggleUseDarkIcon, toggleUseDarkTheme, useDarkIconStorage, useDarkThemeStorage } from '@extension/storage/lib';
import { ColorOption, SwitchOption } from '@src/components/atoms';

interface ThemeSelectorProps {
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
}

type ColorLabel =
  | 'red'
  | 'pink'
  | 'purple'
  | 'deepPurple'
  | 'indigo'
  | 'blue'
  | 'lightBlue'
  | 'cyan'
  | 'teal'
  | 'green'
  | 'lightGreen'
  | 'lime'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'deepOrange'
  | 'brown'
  | 'grey'
  | 'blueGrey';
const colorOptions: Array<{ label: ColorLabel; color: string }> = [
  { label: 'red', color: '#F44336' },
  { label: 'pink', color: '#E91E63' },
  { label: 'purple', color: '#9C27B0' },
  { label: 'deepPurple', color: '#673AB7' },
  { label: 'indigo', color: '#3F51B5' },
  { label: 'blue', color: '#3874CB' },
  { label: 'lightBlue', color: '#03A9F4' },
  { label: 'cyan', color: '#00BCD4' },
  { label: 'teal', color: '#429488' },
  { label: 'green', color: '#4CAF50' },
  { label: 'lightGreen', color: '#8BC34A' },
  { label: 'lime', color: '#CDDC39' },
  { label: 'yellow', color: '#FFEB3B' },
  { label: 'amber', color: '#FFC107' },
  { label: 'orange', color: '#FF9800' },
  { label: 'deepOrange', color: '#FF5722' },
  { label: 'brown', color: '#795548' },
  { label: 'grey', color: '#9E9E9E' },
  { label: 'blueGrey', color: '#607D8B' },
];

const ThemeSelector = ({
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
}: ThemeSelectorProps) => {
  const useDarkTheme = useStorageSuspense(useDarkThemeStorage);
  const useDarkIcon = useStorageSuspense(useDarkIconStorage);

  return (
    <div className="section">
      <h2>{t('theme')}</h2>
      <SwitchOption label={t('useDarkTheme')} checked={useDarkTheme} onChange={() => void toggleUseDarkTheme()} />
      <SwitchOption label={t('useDarkIcon')} checked={useDarkIcon} onChange={() => void toggleUseDarkIcon()} />
      <ColorOption
        label={t('primaryColor')}
        value={primaryColor}
        onChange={onPrimaryColorChange}
        options={colorOptions.map(option => ({
          label: t(option.label) as ColorLabel,
          color: option.color,
        }))}
      />
      <ColorOption
        label={t('secondaryColor')}
        value={secondaryColor}
        onChange={onSecondaryColorChange}
        options={colorOptions.map(option => ({
          label: t(option.label) as ColorLabel,
          color: option.color,
        }))}
      />
    </div>
  );
};

export default ThemeSelector;
