import {
  showDateLabelsStorage,
  showDSTFlagStorage,
  showExportPanelStorage,
  showTimezoneAbbreviationStorage,
  showTimezoneNameStorage,
  showUTCOffsetStorage,
  timezonesStorage,
  use24HoursFormatStorage,
  useDarkThemeStorage,
  useDarkIconStorage,
} from './index';

export async function toggleShowTimezoneName() {
  await showTimezoneNameStorage.set(!(await showTimezoneNameStorage.get()));
}

export async function toggleShowTimezoneAbbreviation() {
  await showTimezoneAbbreviationStorage.set(!(await showTimezoneAbbreviationStorage.get()));
}

export async function toggleShowUTCOffset() {
  await showUTCOffsetStorage.set(!(await showUTCOffsetStorage.get()));
}

export async function toggleShowExportPanel() {
  await showExportPanelStorage.set(!(await showExportPanelStorage.get()));
}

export async function toggleShowDateLabels() {
  await showDateLabelsStorage.set(!(await showDateLabelsStorage.get()));
}

export async function toggleUse24HoursFormat() {
  await use24HoursFormatStorage.set(!(await use24HoursFormatStorage.get()));
}

export async function toggleUseDarkTheme() {
  await useDarkThemeStorage.set(!(await useDarkThemeStorage.get()));
}

export async function toggleUseDarkIcon() {
  await useDarkIconStorage.set(!(await useDarkIconStorage.get()));
}

export async function setShowDSTFlag(newValue: 'DST' | 'Hide' | 'Summer/Winter') {
  await showDSTFlagStorage.set(newValue);
}

export async function addTimezone(timezone: string, displayName: string) {
  const timezones = await timezonesStorage.get();
  const newTimezone = { timezone, displayName };
  await timezonesStorage.set([...timezones, newTimezone]);
}

export async function removeTimezone(timezone: string) {
  const timezones = await timezonesStorage.get();
  const updatedTimezones = timezones.filter(tz => tz.timezone !== timezone);
  await timezonesStorage.set(updatedTimezones);
}

export async function setTimezones(timezones: { timezone: string; displayName: string }[]): Promise<void> {
  await timezonesStorage.set(timezones);
}

export async function getTimezones() {
  return await timezonesStorage.get();
}
