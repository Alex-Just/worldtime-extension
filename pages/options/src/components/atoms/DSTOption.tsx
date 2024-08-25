import React from 'react';
import { TextField, MenuItem } from '@mui/material';

interface DSTOptionProps {
  label: string;
  value: string;
  onChange: (value: 'DST' | 'Hide' | 'Summer/Winter') => void;
  options: string[];
}

const DSTOption = ({ label, value, onChange, options }: DSTOptionProps) => (
  <TextField
    select
    label={label}
    value={value}
    onChange={e => onChange(e.target.value as 'DST' | 'Hide' | 'Summer/Winter')} // Casting the value
    variant="standard"
    className="dst-option">
    {options.map(option => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </TextField>
);

export default DSTOption;
