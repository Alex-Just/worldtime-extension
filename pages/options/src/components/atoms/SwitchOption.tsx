import React from 'react';
import { Switch } from '@mui/material';

interface SwitchOptionProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const SwitchOption = ({ label, checked, onChange }: SwitchOptionProps) => (
  <div className="option with-switch">
    <label>
      <Switch checked={checked} onChange={onChange} className="toggle-switch" />
      {label}
    </label>
  </div>
);

export default SwitchOption;
