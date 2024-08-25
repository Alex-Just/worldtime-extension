import React, { type CSSProperties } from 'react';

import { useStorageSuspense } from '@extension/shared/lib/hooks';
import { secondaryColorStorage } from '@extension/storage/lib';

import { styles as defaultStyles } from './CurrentTimeIndicator.styles';

interface CurrentTimeIndicatorProps {
  position: number;
}

const CurrentTimeIndicator = ({ position }: CurrentTimeIndicatorProps) => {
  const secondaryColor = useStorageSuspense(secondaryColorStorage);
  const styles: { [key: string]: CSSProperties } = {
    ...defaultStyles,
    indicator: {
      ...defaultStyles.indicator,
      borderLeftColor: secondaryColor,
      left: `${position}%`,
    },
  };

  return <div style={styles.indicator} />;
};

export default CurrentTimeIndicator;
