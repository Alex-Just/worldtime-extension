import React from 'react';
import { Switch } from '@mui/material';

import { primaryColorStorage } from '@extension/storage/lib';
import { useStorageSuspense } from '@extension/shared/lib/hooks';

interface SwitchOptionProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const SwitchOption = ({ label, checked, onChange }: SwitchOptionProps) => {
  const primaryColor = useStorageSuspense(primaryColorStorage);

  return (
    <div className="option with-switch">
      <label>
        <Switch
          checked={checked}
          onChange={onChange}
          className="toggle-switch"
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: primaryColor,
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: primaryColor,
            },
            '& .MuiSwitch-thumb': {
              backgroundColor: primaryColor,
            },
          }}
        />
        {label}
      </label>
    </div>
  );
};

export default SwitchOption;
