import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { t } from '@extension/i18n';
import type { MessageKey } from '@extension/i18n/lib/type';

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

  const displaySettings: Array<{ label: MessageKey; checked: boolean | string }> = [
    { label: 'showTimezoneName', checked: showTimezoneName },
    { label: 'showTimezoneAbbreviation', checked: showTimezoneAbbreviation },
    { label: 'showUTCOffset', checked: showUTCOffset },
    { label: 'showDateLabels', checked: showDateLabels },
    { label: 'showDSTFlag', checked: showDSTFlag },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className={useDarkTheme ? 'container dark-theme' : 'container light-theme'}>
        <CurrentTime />
        <hr />
        <h1>{t('displaySettings')}</h1>

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
          {t('resetToDefault')}
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default withErrorBoundary(withSuspense(Options, <div>Loading...</div>), <div>Error Occurred</div>);
