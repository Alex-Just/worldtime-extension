import React from 'react';

import { useCurrentTime } from './hooks';
import { styles } from './CurrentTime.styles';

const CurrentTime = () => <div style={styles.timeText}>{useCurrentTime().format('HH:mm:ss')}</div>;

export default CurrentTime;
