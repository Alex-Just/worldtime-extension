import { createStorage } from './base';
import { StorageEnum } from './enums';

// Display Settings
export const showTimezoneNameStorage = createStorage<boolean>('showTimezoneName', true, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});
export const showTimezoneAbbreviationStorage = createStorage<boolean>('showTimezoneAbbreviation', false, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});
export const showUTCOffsetStorage = createStorage<boolean>('showUTCOffset', true, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});
export const showExportPanelStorage = createStorage<boolean>('showExportPanel', false, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});
export const showDateLabelsStorage = createStorage<boolean>('showDateLabels', true, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});
export const use24HoursFormatStorage = createStorage<boolean>('use24HoursFormat', false, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

// Time Selection Step
export const timeSelectionStepStorage = createStorage<string>('timeSelectionStep', '30 minutes', {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

// Theme Settings
export const useDarkThemeStorage = createStorage<boolean>('useDarkTheme', false, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});
export const primaryColorStorage = createStorage<string>('primaryColor', 'Blue', {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});
export const secondaryColorStorage = createStorage<string>('secondaryColor', 'Teal', {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

// DST (Daylight Saving Time) Option
export const showDSTFlagStorage = createStorage<string>('showDSTFlag', 'DST', {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

const defaultTimezones = [
  { timezone: 'US/Pacific', displayName: 'San Francisco' },
  { timezone: 'America/Denver', displayName: 'Denver' },
  { timezone: 'America/New_York', displayName: 'New York' },
  { timezone: 'UTC', displayName: 'UTC' },
  { timezone: 'Europe/Madrid', displayName: 'Madrid' },
  { timezone: 'Europe/Moscow', displayName: 'Moscow' },
  { timezone: 'Asia/Kolkata', displayName: 'India' },
  { timezone: 'Asia/Kathmandu', displayName: 'Nepal' },
];
export const timezonesStorage = createStorage<{ timezone: string; displayName: string }[]>(
  'timezones',
  defaultTimezones,
  {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
  },
);
