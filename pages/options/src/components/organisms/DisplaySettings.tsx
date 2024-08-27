import React from 'react';

import { t } from '@extension/i18n';
import type { MessageKey } from '@extension/i18n/lib/type';

import { DSTOption, SwitchOption } from '@src/components/atoms';
import { showDSTFlagStorage } from '@extension/storage';
import { useStorageSuspense } from '@extension/shared';

interface DisplaySettingsProps {
  settings: Array<{ label: MessageKey; checked: boolean | string }>;
  onSettingsChange: (label: MessageKey) => void;
  onShowDSTFlagChange: (newValue: 'DST' | 'Hide' | 'Summer/Winter') => void;
}

const DisplaySettings = ({ settings, onSettingsChange, onShowDSTFlagChange }: DisplaySettingsProps) => {
  const showDSTFlag = useStorageSuspense(showDSTFlagStorage);

  return (
    <div className="section">
      <h2>{t('userInterface')}</h2>
      {settings.map(setting =>
        typeof setting.checked === 'boolean' ? (
          <SwitchOption
            key={setting.label}
            label={t(setting.label)}
            checked={setting.checked}
            onChange={() => onSettingsChange(setting.label)}
          />
        ) : null,
      )}
      <DSTOption
        label={t('showDSTFlag')}
        value={showDSTFlag}
        onChange={(newValue: 'DST' | 'Hide' | 'Summer/Winter') => {
          onShowDSTFlagChange(newValue);
        }}
        options={[t('hide'), t('dst'), t('summerWinter')]}
      />
    </div>
  );
};

export default DisplaySettings;
