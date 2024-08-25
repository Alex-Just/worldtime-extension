import React, { useState } from 'react';
import type { Moment } from 'moment-timezone';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { convertUserHourMoments, dayLabel, getHourClass } from '../../utils';
import { useShiftPercentage, useTimeZone } from '../../hooks';
import { styles } from './TimeZoneDisplay.styles';

interface TimeZoneDisplayProps {
  timezone: string;
  displayName: string;
  info: string;
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
  info,
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

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={styles.timeZoneWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div style={styles.timeZoneHeader}>
        <div style={styles.cityInfo}>
          <span style={styles.city}>{displayName}</span>
          <span style={styles.info}>{info}</span>
        </div>
        <div style={styles.time}>{time}</div>
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
              {datetime.hour() === 0 && <span style={styles.newDay}>{dayLabel(datetime, timezone)}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeZoneDisplay;
