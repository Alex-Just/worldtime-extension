import type { Moment } from 'moment-timezone';
import moment from 'moment-timezone';

export const generateUserHourMoments = (userTimezone: string): Moment[] => {
  return Array.from({ length: 25 }, (_, i) => moment().tz(userTimezone).startOf('day').add(i, 'hours'));
};

export default generateUserHourMoments;
