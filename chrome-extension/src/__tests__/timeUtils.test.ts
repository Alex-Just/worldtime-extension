import { describe, it, expect } from 'vitest';

import { generateUserHourMoments } from '@extension/shared/lib/utils';

describe('generateUserHourMoments', () => {
  it('should generate 25 moments for each hour of the day in the given timezone', () => {
    const userTimezone = 'America/New_York';
    const hours = generateUserHourMoments(userTimezone);

    expect(hours).toHaveLength(25);
    hours.forEach((hour, index) => {
      if (index < 24) {
        expect(hour.tz(userTimezone).hour()).toBe(index);
      } else {
        // The last moment is the start of the next day (00:00)
        expect(hour.tz(userTimezone).hour()).toBe(0);
      }
    });
  });
});
