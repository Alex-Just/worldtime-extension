import type { Moment } from 'moment-timezone';
import moment from 'moment-timezone';

export const generateUserHourMoments = (userTimezone: string): Moment[] => {
  return Array.from({ length: 24 }, (_, i) => moment().tz(userTimezone).startOf('day').add(i, 'hours'));
};
