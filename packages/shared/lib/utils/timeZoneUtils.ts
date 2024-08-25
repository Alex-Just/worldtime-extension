import type { Moment } from 'moment-timezone';
import moment from 'moment-timezone';

export const convertUserHourMoments = (userHourMoments: Moment[], targetTimezone: string): Moment[] => {
  return userHourMoments.map(datetime => datetime.clone().tz(targetTimezone));
};

export const dayLabel = (datetime: Moment, timezone: string): string => {
  const now = moment().tz(timezone);
  const midnightToday = now.clone().startOf('day');
  const midnightTomorrow = midnightToday.clone().add(1, 'day');

  if (datetime.isSameOrAfter(midnightTomorrow)) {
    return midnightTomorrow.format('MMM DD');
  }

  return midnightToday.format('MMM DD');
};

export const getHourClass = (datetime: Moment, currentHour: number): string => {
  if (currentHour === datetime.hour()) {
    return 'highlight';
  }
  if (datetime.hour() === 0) {
    return 'midnightHighlight'; // Secondary color for midnight
  }
  if (datetime.hour() >= 22 || datetime.hour() <= 7) {
    return 'nighttimeHighlight'; // Ternary color for 10 PM to 7 AM
  }
  return '';
};

export const getTimezoneInfo = (
  timezone: string,
  showTimezoneName: boolean,
  showAbbreviation: boolean,
  showUTCOffset: boolean,
  showDST: string, // "DST", "Hide", or "Summer/Winter"
) => {
  const now = moment().tz(timezone);
  const isDST = now.isDST();
  const utcOffset = showUTCOffset ? now.format('Z') : ''; // Include UTC offset if allowed
  const abbreviation = showAbbreviation ? now.format('z') : ''; // Include abbreviation if allowed

  let dstInfo = '';
  if (showDST === 'DST') {
    dstInfo = isDST ? 'DST' : '';
  } else if (showDST === 'Summer/Winter') {
    dstInfo = isDST ? 'Summer time' : 'Winter time';
  }

  if (timezone === 'UTC') {
    return `${showAbbreviation ? 'Universal UTC' : 'Universal'} ${dstInfo}`.trim();
  }

  let info = '';

  if (showTimezoneName) {
    info = `${timezone.replace('_', ' ')}`;
  }

  if (showAbbreviation && abbreviation) {
    info += ` ${abbreviation}`;
  }

  if (showUTCOffset && utcOffset) {
    info += ` UTC${utcOffset}`;
  }

  if (dstInfo) {
    info += ` ${dstInfo}`;
  }

  return info.trim();
};
