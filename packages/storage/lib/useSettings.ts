import {
  showTimezoneNameStorage,
  showTimezoneAbbreviationStorage,
  showUTCOffsetStorage,
  showExportPanelStorage,
  showDateLabelsStorage,
  use24HoursFormatStorage,
  useDarkThemeStorage,
  showDSTFlagStorage,
  timezonesStorage,
} from './index';

export async function toggleShowTimezoneName() {
  console.log('initial showTimezoneName:', await showTimezoneNameStorage.get());
  await showTimezoneNameStorage.set(!(await showTimezoneNameStorage.get()));
  console.log('toggled showTimezoneName:', await showTimezoneNameStorage.get());
}

export async function toggleShowTimezoneAbbreviation() {
  console.log('initial showTimezoneAbbreviation:', await showTimezoneAbbreviationStorage.get());
  await showTimezoneAbbreviationStorage.set(!(await showTimezoneAbbreviationStorage.get()));
  console.log('toggled showTimezoneAbbreviation:', await showTimezoneAbbreviationStorage.get());
}

export async function toggleShowUTCOffset() {
  console.log('initial showUTCOffset:', await showUTCOffsetStorage.get());
  await showUTCOffsetStorage.set(!(await showUTCOffsetStorage.get()));
  console.log('toggled showUTCOffset:', await showUTCOffsetStorage.get());
}

export async function toggleShowExportPanel() {
  console.log('initial showExportPanel:', await showExportPanelStorage.get());
  await showExportPanelStorage.set(!(await showExportPanelStorage.get()));
  console.log('toggled showExportPanel:', await showExportPanelStorage.get());
}

export async function toggleShowDateLabels() {
  console.log('initial showDateLabels:', await showDateLabelsStorage.get());
  await showDateLabelsStorage.set(!(await showDateLabelsStorage.get()));
  console.log('toggled showDateLabels:', await showDateLabelsStorage.get());
}

export async function toggleUse24HoursFormat() {
  console.log('initial use24HoursFormat:', await use24HoursFormatStorage.get());
  await use24HoursFormatStorage.set(!(await use24HoursFormatStorage.get()));
  console.log('toggled use24HoursFormat:', await use24HoursFormatStorage.get());
}

export async function toggleUseDarkTheme() {
  console.log('initial useDarkTheme:', await useDarkThemeStorage.get());
  await useDarkThemeStorage.set(!(await useDarkThemeStorage.get()));
  console.log('toggled useDarkTheme:', await useDarkThemeStorage.get());
}

export async function toggleShowDSTFlag() {
  const currentValue = await showDSTFlagStorage.get();

  console.log('initial showDSTFlag:', currentValue);

  // Handle the toggle based on the current value
  let newValue: string;
  if (currentValue === 'DST') {
    newValue = 'Hide';
  } else if (currentValue === 'Hide') {
    newValue = 'Summer/Winter';
  } else {
    newValue = 'DST';
  }

  await showDSTFlagStorage.set(newValue);

  console.log('toggled showDSTFlag:', await showDSTFlagStorage.get());
}

export async function addTimezone(timezone: string, displayName: string) {
  const timezones = await timezonesStorage.get();
  const newTimezone = { timezone, displayName };
  await timezonesStorage.set([...timezones, newTimezone]);
  console.log('Timezone added:', newTimezone);
}

export async function removeTimezone(timezone: string) {
  const timezones = await timezonesStorage.get();
  const updatedTimezones = timezones.filter(tz => tz.timezone !== timezone);
  await timezonesStorage.set(updatedTimezones);
  console.log('Timezone removed:', timezone);
}

export async function setTimezones(timezones: { timezone: string; displayName: string }[]): Promise<void> {
  await chrome.storage.sync.set({ timezones });
}

export async function getTimezones() {
  const timezones = await timezonesStorage.get();
  console.log('Current timezones:', timezones);
  return timezones;
}
