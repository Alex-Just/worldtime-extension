import React, { type CSSProperties, useState } from 'react';
import type { Moment } from 'moment-timezone';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Typography from '@mui/material/Typography';

import { convertUserHourMoments, dayLabel, getHourClass, getTimezoneInfo, adjustColorLightness } from '../../utils';
import { useStorageSuspense } from '../../hooks';
import { useShiftPercentage, useTimeZone } from './hooks';
import { styles as defaultStyles } from './TimeZoneDisplay.styles';
import {
  showTimezoneNameStorage,
  showTimezoneAbbreviationStorage,
  showUTCOffsetStorage,
  showDateLabelsStorage,
  showDSTFlagStorage,
  primaryColorStorage,
  useDarkThemeStorage,
} from '@extension/storage/lib';

interface TimeZoneDisplayProps {
  timezone: string;
  displayName: string;
  userHourMoments: Moment[];
  isSettingsScreen?: boolean;
  onRemove?: (timezone: string) => void;
  onMoveUp?: (timezone: string) => void;
  onMoveDown?: (timezone: string) => void;
  onEdit?: (timezone: string, displayName: string) => void;
}

const TimeZoneDisplay = ({
  timezone,
  displayName,
  userHourMoments,
  isSettingsScreen = false,
  onRemove,
  onMoveUp,
  onMoveDown,
  onEdit,
}: TimeZoneDisplayProps) => {
  const { time, currentHour } = useTimeZone(timezone);
  const hours = convertUserHourMoments(userHourMoments, timezone);
  const timeRowRef = useShiftPercentage(timezone);
  const showTimezoneName = useStorageSuspense(showTimezoneNameStorage);
  const showTimezoneAbbreviation = useStorageSuspense(showTimezoneAbbreviationStorage);
  const showUTCOffset = useStorageSuspense(showUTCOffsetStorage);
  const showDST = useStorageSuspense(showDSTFlagStorage);
  const showDateLabels = useStorageSuspense(showDateLabelsStorage);
  const primaryColor = useStorageSuspense(primaryColorStorage);
  const timeZoneInfo = getTimezoneInfo(timezone, showTimezoneName, showTimezoneAbbreviation, showUTCOffset, showDST);
  const [isHovered, setIsHovered] = useState(false);
  const useDarkTheme = useStorageSuspense(useDarkThemeStorage);
  const buttonColor = useDarkTheme ? '#fff' : '#000';

  const styles: { [key: string]: CSSProperties } = {
    ...defaultStyles,
    highlight: {
      ...defaultStyles.highlight,
      backgroundColor: primaryColor,
    },
    midnightHighlight: {
      ...defaultStyles.midnightHighlight,
      backgroundColor: adjustColorLightness(primaryColor, 55),
    },
    nighttimeHighlight: {
      ...defaultStyles.nighttimeHighlight,
      backgroundColor: adjustColorLightness(primaryColor, 70),
    },
    button: {
      ...defaultStyles.button,
      color: buttonColor,
    },
  };

  return (
    <div
      style={styles.timeZoneWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div style={styles.timeZoneHeader}>
        <div style={styles.cityInfo}>
          <span style={styles.city}>{displayName}</span>
          <span style={styles.info}>{timeZoneInfo}</span>
        </div>
        <Typography variant="body1" style={styles.time}>
          {time}
        </Typography>
        {isSettingsScreen && (
          <div style={{ ...styles.buttonsContainer, visibility: isHovered ? 'visible' : 'hidden' }}>
            {onEdit && (
              <button style={styles.button} onClick={() => onEdit?.(timezone, displayName)}>
                <EditIcon />
              </button>
            )}
            {onRemove && (
              <button style={styles.button} onClick={() => onRemove?.(timezone)}>
                <DeleteIcon />
              </button>
            )}
            {onMoveUp && (
              <button style={styles.button} onClick={() => onMoveUp?.(timezone)}>
                <ArrowUpwardIcon />
              </button>
            )}
            {onMoveDown && (
              <button style={styles.button} onClick={() => onMoveDown?.(timezone)}>
                <ArrowDownwardIcon />
              </button>
            )}
          </div>
        )}
      </div>
      <div style={styles.timeRow} data-timezone={timezone} ref={timeRowRef}>
        {hours.map(datetime => {
          const hourClass = getHourClass(datetime, currentHour);
          return (
            <div key={datetime.format('DD HH')} style={{ ...styles.hourContainer, ...styles[hourClass] }}>
              <span style={{ ...styles.hour, ...styles[hourClass] }}>{datetime.hour()}</span>
              {datetime.hour() === 0 && showDateLabels && (
                <span style={styles.newDay}>{dayLabel(datetime, timezone)}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeZoneDisplay;
