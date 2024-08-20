import React from 'react';

import { useCurrentTime } from '@src/hooks/useCurrentTime';

const CurrentTime = () => {
  const currentTime = useCurrentTime();

  return (
    <div className="time-display">
      <div className="current-time">{currentTime.format('HH:mm:ss')}</div>
    </div>
  );
};

export default CurrentTime;
