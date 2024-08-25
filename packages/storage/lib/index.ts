import { createStorage } from './base';
import { exampleThemeStorage } from './exampleThemeStorage';
import {
  showTimezoneNameStorage,
  showTimezoneAbbreviationStorage,
  showUTCOffsetStorage,
  showExportPanelStorage,
  showDateLabelsStorage,
  use24HoursFormatStorage,
  timeSelectionStepStorage,
  primaryColorStorage,
  secondaryColorStorage,
  useDarkThemeStorage,
  showDSTFlagStorage,
  timezonesStorage,
} from './settingsStorage';
import {
  toggleShowTimezoneName,
  toggleShowTimezoneAbbreviation,
  toggleShowUTCOffset,
  toggleShowExportPanel,
  toggleShowDateLabels,
  toggleUse24HoursFormat,
  toggleUseDarkTheme,
  toggleShowDSTFlag,
  addTimezone,
  removeTimezone,
  getTimezones,
  setTimezones,
} from './useSettings';
import { SessionAccessLevelEnum, StorageEnum } from './enums';
import type { BaseStorage } from './types';

export {
  exampleThemeStorage,
  showTimezoneNameStorage,
  showTimezoneAbbreviationStorage,
  showUTCOffsetStorage,
  showExportPanelStorage,
  showDateLabelsStorage,
  use24HoursFormatStorage,
  timeSelectionStepStorage,
  primaryColorStorage,
  secondaryColorStorage,
  useDarkThemeStorage,
  showDSTFlagStorage,
  timezonesStorage,
  createStorage,
  StorageEnum,
  SessionAccessLevelEnum,
  toggleShowTimezoneName,
  toggleShowTimezoneAbbreviation,
  toggleShowUTCOffset,
  toggleShowExportPanel,
  toggleShowDateLabels,
  toggleUse24HoursFormat,
  toggleUseDarkTheme,
  toggleShowDSTFlag,
  addTimezone,
  removeTimezone,
  getTimezones,
  setTimezones,
};

export type { BaseStorage };
