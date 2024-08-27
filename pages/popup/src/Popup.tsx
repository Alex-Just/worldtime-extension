import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SettingsIcon from '@mui/icons-material/Settings';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { t } from '@extension/i18n';
import { useDarkThemeStorage } from '@extension/storage/lib';
import { CurrentTime, TimeZoneDisplay } from '@extension/shared/lib/components';
import { useGetTimezones, useStorageSuspense } from '@extension/shared/lib/hooks';
import { generateUserHourMoments } from '@extension/shared/lib/utils';

import '@src/Popup.css';
import { CurrentTimeIndicator } from '@src/components';
import { useHandleKeyDown, useTimeline } from '@src/hooks';

const Popup = () => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userHourMoments = generateUserHourMoments(userTimezone);
  const { indicatorPosition, handleTimelineClick, handleShiftTime } = useTimeline(userTimezone);
  const handleKeyDown = useHandleKeyDown(handleTimelineClick);
  const { timezones } = useGetTimezones();
  const useDarkTheme = useStorageSuspense(useDarkThemeStorage);
  const theme = createTheme({
    palette: {
      mode: useDarkTheme ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="header">
          <CurrentTime />
          <div className="top-buttons">
            <Tooltip title={t('shiftTimeBack')}>
              <IconButton onClick={() => handleShiftTime(-6)}>
                <ArrowBackIcon className="icon-button" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('shiftTimeNow')}>
              <IconButton onClick={() => handleShiftTime(0)}>
                <CenterFocusWeakIcon className="icon-button" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('shiftTimeForward')}>
              <IconButton onClick={() => handleShiftTime(6)}>
                <ArrowForwardIcon className="icon-button" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('settings')}>
              <IconButton onClick={() => chrome.runtime.openOptionsPage()}>
                <SettingsIcon className="icon-button" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="timeline" role="button" tabIndex={0} onClick={handleTimelineClick} onKeyDown={handleKeyDown}>
          {timezones.map(({ timezone, displayName }) => (
            <TimeZoneDisplay
              key={timezone}
              timezone={timezone}
              displayName={displayName}
              userHourMoments={userHourMoments}
            />
          ))}
          <CurrentTimeIndicator position={indicatorPosition} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Popup;
