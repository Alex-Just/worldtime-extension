import React, { useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SettingsIcon from '@mui/icons-material/Settings';

import '@src/Popup.css';
import { getTimezones } from '@extension/storage';
import { CurrentTime } from '@src/components';
import { useHandleKeyDown, useTimeline } from '@src/hooks';
import { generateUserHourMoments, getTimezoneInfo } from '@src/utils';
import { TimeZoneDisplay } from '@extension/shared';

const Popup = () => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userHourMoments = generateUserHourMoments(userTimezone);
  const { indicatorPosition, handleTimelineClick, handleShiftTime } = useTimeline(userTimezone);
  const handleKeyDown = useHandleKeyDown(handleTimelineClick);

  const [timezones, setTimezones] = useState<{ timezone: string; displayName: string }[]>([]);

  useEffect(() => {
    async function fetchTimezones() {
      const tz = await getTimezones();
      setTimezones(tz);
    }

    void fetchTimezones();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <CurrentTime />
        <div className="top-buttons">
          <Tooltip title="-6 Hours">
            <IconButton onClick={() => handleShiftTime(-6)}>
              <ArrowBackIcon className="icon-button" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Now">
            <IconButton onClick={() => handleShiftTime(0)}>
              <CenterFocusWeakIcon className="icon-button" />
            </IconButton>
          </Tooltip>
          <Tooltip title="+6 Hours">
            <IconButton onClick={() => handleShiftTime(6)}>
              <ArrowForwardIcon className="icon-button" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
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
            info={getTimezoneInfo(timezone)}
            userHourMoments={userHourMoments}
          />
        ))}
        <div className="current-time-indicator" style={{ left: `${indicatorPosition}%` }}></div>
      </div>
    </div>
  );
};

export default Popup;
