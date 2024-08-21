import React from 'react';

import { useCurrentTime } from '@src/hooks';

const CurrentTime = () => (
  <div className="time-display">
    <div className="current-time">{useCurrentTime().format('HH:mm:ss')}</div>
  </div>
);

export default CurrentTime;
