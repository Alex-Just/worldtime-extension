import React from 'react';

import { useStorageSuspense, withErrorBoundary, withSuspense } from '@extension/shared';
import {
  showTimezoneNameStorage,
  showTimezoneAbbreviationStorage,
  showUTCOffsetStorage,
  showExportPanelStorage,
  showDateLabelsStorage,
  use24HoursFormatStorage,
  timeSelectionStepStorage,
  primaryColorStorage,
  secondaryColorStorage,
  useDarkThemeStorage,
  showDSTFlagStorage,
  toggleShowDSTFlag,
  toggleShowTimezoneName,
  toggleShowTimezoneAbbreviation,
  toggleShowUTCOffset,
  toggleShowExportPanel,
  toggleShowDateLabels,
  toggleUse24HoursFormat,
  toggleUseDarkTheme,
} from '@extension/storage';

import '@src/Options.css';
import { Button } from '@mui/material';
import { SettingsSections } from '@src/components/organisms';
import { SelectedTimelines } from '@src/components/molecules';

const Options = () => {
  const showTimezoneName = useStorageSuspense(showTimezoneNameStorage);
  const showTimezoneAbbreviation = useStorageSuspense(showTimezoneAbbreviationStorage);
  const showUTCOffset = useStorageSuspense(showUTCOffsetStorage);
  const showExportPanel = useStorageSuspense(showExportPanelStorage);
  const showDateLabels = useStorageSuspense(showDateLabelsStorage);
  const use24HoursFormat = useStorageSuspense(use24HoursFormatStorage);
  const timeSelectionStep = useStorageSuspense(timeSelectionStepStorage);
  const primaryColor = useStorageSuspense(primaryColorStorage);
  const secondaryColor = useStorageSuspense(secondaryColorStorage);
  const useDarkTheme = useStorageSuspense(useDarkThemeStorage);
  const showDSTFlag = useStorageSuspense(showDSTFlagStorage); // Now using showDSTFlag

  const displaySettings = [
    { label: 'Show Timezone name', checked: showTimezoneName },
    { label: 'Show Timezone abbreviation (if available)', checked: showTimezoneAbbreviation },
    { label: 'Show UTC offset', checked: showUTCOffset },
    { label: 'Show export panel (at the bottom)', checked: showExportPanel },
    { label: 'Show date labels', checked: showDateLabels },
    { label: 'Use 24 hours format', checked: use24HoursFormat },
    { label: 'Show DST flag', checked: showDSTFlag },
  ];

  const colorOptions = [
    { label: 'Red', color: '#F44336' },
    { label: 'Pink', color: '#E91E63' },
    { label: 'Purple', color: '#9C27B0' },
    { label: 'Deep Purple', color: '#673AB7' },
    { label: 'Indigo', color: '#3F51B5' },
    { label: 'Blue', color: '#2196F3' },
    { label: 'Light Blue', color: '#03A9F4' },
    { label: 'Cyan', color: '#00BCD4' },
    { label: 'Teal', color: '#009688' },
    { label: 'Green', color: '#4CAF50' },
    { label: 'Light Green', color: '#8BC34A' },
    { label: 'Lime', color: '#CDDC39' },
    { label: 'Yellow', color: '#FFEB3B' },
    { label: 'Amber', color: '#FFC107' },
    { label: 'Orange', color: '#FF9800' },
    { label: 'Deep Orange', color: '#FF5722' },
    { label: 'Brown', color: '#795548' },
    { label: 'Grey', color: '#9E9E9E' },
    { label: 'Blue Grey', color: '#607D8B' },
  ];

  return (
    <div className={useDarkTheme ? 'container dark-theme' : 'container light-theme'}>
      <div id="time-display">14:48:21</div>
      <hr />
      <h1>Display Settings</h1>

      <SettingsSections
        displaySettings={displaySettings}
        onDisplaySettingsChange={label => {
          switch (label) {
            case 'Show Timezone name':
              void toggleShowTimezoneName();
              break;
            case 'Show Timezone abbreviation (if available)':
              void toggleShowTimezoneAbbreviation();
              break;
            case 'Show UTC offset':
              void toggleShowUTCOffset();
              break;
            case 'Show export panel (at the bottom)':
              void toggleShowExportPanel();
              break;
            case 'Show date labels':
              void toggleShowDateLabels();
              break;
            case 'Use 24 hours format':
              void toggleUse24HoursFormat();
              break;
            case 'Show DST flag':
              void toggleShowDSTFlag();
              break;
            default:
              break;
          }
        }}
        timeStep={timeSelectionStep}
        onTimeStepChange={newStep => timeSelectionStepStorage.set(newStep)}
        isDarkTheme={useDarkTheme}
        onThemeChange={() => void toggleUseDarkTheme()}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        onPrimaryColorChange={color => primaryColorStorage.set(color)}
        onSecondaryColorChange={color => secondaryColorStorage.set(color)}
        colorOptions={colorOptions}
      />

      <SelectedTimelines />

      <Button
        variant="contained"
        color="primary"
        className="reset-button"
        onClick={async () => {
          await Promise.all([
            showTimezoneNameStorage.set(true),
            showTimezoneAbbreviationStorage.set(false),
            showUTCOffsetStorage.set(true),
            showExportPanelStorage.set(false),
            showDateLabelsStorage.set(true),
            use24HoursFormatStorage.set(false),
            showDSTFlagStorage.set('DST'),
            timeSelectionStepStorage.set('30 minutes'),
            primaryColorStorage.set('Blue'),
            secondaryColorStorage.set('Teal'),
            useDarkThemeStorage.set(false),
          ]);
        }}>
        RESET TO DEFAULT
      </Button>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div>Loading...</div>), <div>Error Occurred</div>);
