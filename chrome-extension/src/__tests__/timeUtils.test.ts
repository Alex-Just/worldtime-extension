import { describe, it, expect } from 'vitest';

import { generateUserHourMoments } from '../../../pages/popup/src/utils/timeUtils';

describe('generateUserHourMoments', () => {
  it('should generate 24 moments for each hour of the day in the given timezone', () => {
    const userTimezone = 'America/New_York';
    const hours = generateUserHourMoments(userTimezone);

    expect(hours).toHaveLength(24);
    hours.forEach((hour, index) => {
      expect(hour.tz(userTimezone).hour()).toBe(index);
    });
  });
});
