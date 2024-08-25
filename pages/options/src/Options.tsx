import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useStorageSuspense, withErrorBoundary, withSuspense } from '@extension/shared';
import { CurrentTime } from '@extension/shared/lib/components';
import {
  showTimezoneNameStorage,
  showTimezoneAbbreviationStorage,
  showUTCOffsetStorage,
  showExportPanelStorage,
  showDateLabelsStorage,
  timeSelectionStepStorage,
  primaryColorStorage,
  secondaryColorStorage,
  useDarkThemeStorage,
  showDSTFlagStorage,
  timezonesStorage,
  setShowDSTFlag,
  toggleShowTimezoneName,
  toggleShowTimezoneAbbreviation,
  toggleShowUTCOffset,
  toggleShowExportPanel,
  toggleShowDateLabels,
  defaultTimezones,
} from '@extension/storage';

import '@src/Options.css';
import { Button } from '@mui/material';
import { SettingsSections } from '@src/components/organisms';
import { SelectedTimelines } from '@src/components/molecules';

const Options = () => {
  const showTimezoneName = useStorageSuspense(showTimezoneNameStorage);
  const showTimezoneAbbreviation = useStorageSuspense(showTimezoneAbbreviationStorage);
  const showUTCOffset = useStorageSuspense(showUTCOffsetStorage);
  const showDateLabels = useStorageSuspense(showDateLabelsStorage);
  const primaryColor = useStorageSuspense(primaryColorStorage);
  const secondaryColor = useStorageSuspense(secondaryColorStorage);
  const useDarkTheme = useStorageSuspense(useDarkThemeStorage);
  const showDSTFlag = useStorageSuspense(showDSTFlagStorage);
  const theme = createTheme({
    palette: {
      mode: useDarkTheme ? 'dark' : 'light',
    },
  });

  const displaySettings = [
    { label: 'Show Timezone name', checked: showTimezoneName },
    { label: 'Show Timezone abbreviation (if available)', checked: showTimezoneAbbreviation },
    { label: 'Show UTC offset', checked: showUTCOffset },
    { label: 'Show date labels', checked: showDateLabels },
    { label: 'Show DST flag', checked: showDSTFlag },
  ];

  const colorOptions = [
    { label: 'Red', color: '#F44336' },
    { label: 'Pink', color: '#E91E63' },
    { label: 'Purple', color: '#9C27B0' },
    { label: 'Deep Purple', color: '#673AB7' },
    { label: 'Indigo', color: '#3F51B5' },
    { label: 'Blue', color: '#3874CB' },
    { label: 'Light Blue', color: '#03A9F4' },
    { label: 'Cyan', color: '#00BCD4' },
    { label: 'Teal', color: '#429488' },
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
    <ThemeProvider theme={theme}>
      <div className={useDarkTheme ? 'container dark-theme' : 'container light-theme'}>
        <CurrentTime />
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
              default:
                break;
            }
          }}
          onShowDSTFlagChange={(newValue: 'DST' | 'Hide' | 'Summer/Winter') => setShowDSTFlag(newValue)}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          onPrimaryColorChange={color => primaryColorStorage.set(color)}
          onSecondaryColorChange={color => secondaryColorStorage.set(color)}
          colorOptions={colorOptions}
        />

        <SelectedTimelines />

        <Button
          variant="contained"
          style={{ backgroundColor: primaryColor, color: '#fff' }}
          className="reset-button"
          onClick={async () => {
            await Promise.all([
              showTimezoneNameStorage.set(true),
              showTimezoneAbbreviationStorage.set(false),
              showUTCOffsetStorage.set(true),
              showExportPanelStorage.set(false),
              showDateLabelsStorage.set(true),
              showDSTFlagStorage.set('DST'),
              timeSelectionStepStorage.set('30 minutes'),
              primaryColorStorage.set('#3874CB'),
              secondaryColorStorage.set('#429488'),
              useDarkThemeStorage.set(true),
              timezonesStorage.set(defaultTimezones),
            ]);
          }}>
          RESET TO DEFAULT
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default withErrorBoundary(withSuspense(Options, <div>Loading...</div>), <div>Error Occurred</div>);
