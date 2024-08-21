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
    return 'midnight-highlight'; // Secondary color for midnight
  }
  if (datetime.hour() >= 22 || datetime.hour() <= 7) {
    return 'nighttime-highlight'; // Ternary color for 10 PM to 7 AM
  }
  return '';
};
