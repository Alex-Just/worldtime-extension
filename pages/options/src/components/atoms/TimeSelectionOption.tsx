import React from 'react';
import { TextField, MenuItem } from '@mui/material';

interface TimeSelectionOptionProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const TimeSelectionOption = ({ label, value, onChange, options }: TimeSelectionOptionProps) => (
  <TextField
    select
    label={label}
    value={value}
    onChange={e => onChange(e.target.value)}
    variant="standard"
    className="time-selection-option" // This class now ensures full width
    SelectProps={{
      MenuProps: {
        PaperProps: {
          style: {
            backgroundColor: '#424242', // Ensure the dropdown matches the dark theme
            color: '#fff', // Text color
          },
        },
      },
    }}
    InputProps={{
      style: {
        color: '#939393', // Text color
        borderBottom: '1px solid #939393', // Bottom border color
      },
    }}>
    {options.map(option => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </TextField>
);

export default TimeSelectionOption;
