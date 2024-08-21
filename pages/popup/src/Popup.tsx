import React from 'react';
import moment from 'moment-timezone';

import '@src/Popup.css';
import { TimeZoneDisplay, CurrentTime } from '@src/components';
import { useTimelineClick, useHandleKeyDown } from '@src/hooks';
import { generateUserHourMoments } from '@src/utils';

const Popup = () => {
  const userTimezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userHourMoments = generateUserHourMoments(userTimezone);
  const currentTime = moment().tz(userTimezone);
  const userHour = currentTime.hour();
  const userMinute = currentTime.minute();

  const initialPosition = ((userHour * 60 + userMinute) / (24 * 60)) * 100;
  const { indicatorPosition, handleTimelineClick } = useTimelineClick(initialPosition);

  const timezones = [
    { timezone: 'US/Pacific', city: 'San Francisco', info: 'US/Pacific PST UTC-07:00 DST', isUserTimezone: false },
    { timezone: 'America/Denver', city: 'Denver', info: 'America/Denver MST UTC-06:00 DST', isUserTimezone: false },
    {
      timezone: 'America/New_York',
      city: 'New York',
      info: 'America/New_York EST UTC-04:00 DST',
      isUserTimezone: false,
    },
    { timezone: 'UTC', city: 'UTC', info: 'Universal UTC UTC+00:00', isUserTimezone: false },
    { timezone: 'Europe/Madrid', city: 'Madrid', info: 'Europe/Madrid CET UTC+02:00 DST', isUserTimezone: true },
    { timezone: 'Europe/Moscow', city: 'Moscow', info: 'Europe/Moscow MSK UTC+03:00', isUserTimezone: false },
    { timezone: 'Asia/Kolkata', city: 'India', info: 'Asia/Kolkata IST UTC+05:30', isUserTimezone: false },
  ];

  const handleKeyDown = useHandleKeyDown();

  return (
    <div className="container">
      <CurrentTime />
      <div className="timeline" role="button" tabIndex={0} onClick={handleTimelineClick} onKeyDown={handleKeyDown}>
        {timezones.map(({ timezone, city, info }) => (
          <TimeZoneDisplay
            key={timezone}
            timezone={timezone}
            city={city}
            info={info}
            userHourMoments={userHourMoments}
          />
        ))}
        <div className="current-time-indicator" style={{ left: `${indicatorPosition}%` }}></div>
      </div>
    </div>
  );
};

export default Popup;
