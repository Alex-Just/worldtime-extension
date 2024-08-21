import React from 'react';
import type { Moment } from 'moment-timezone';

import { useTimeZone } from '@src/hooks';
import { convertUserHourMoments, dayLabel, getHourClass } from '@src/utils';

interface TimeZoneDisplayProps {
  timezone: string;
  city: string;
  info: string;
  userHourMoments: Moment[];
}

const TimeZoneDisplay = ({ timezone, city, info, userHourMoments }: TimeZoneDisplayProps) => {
  const { time, currentHour } = useTimeZone(timezone);
  const hours = convertUserHourMoments(userHourMoments, timezone);

  return (
    <div className="timezone">
      <div className="timezone-header">
        <div className="city-info">
          <span className="city">{city}</span>
          <span className="info">{info}</span>
        </div>
        <div className="time">{time}</div>
      </div>
      <div className="time-row">
        {hours.map(datetime => (
          <div key={datetime.format('HH')} className={`hour-container ${getHourClass(datetime, currentHour)}`}>
            <span className={`hour ${getHourClass(datetime, currentHour)}`}>{datetime.hour()}</span>
            {datetime.hour() === 0 && <span className="new-day">{dayLabel(datetime, timezone)}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeZoneDisplay;
