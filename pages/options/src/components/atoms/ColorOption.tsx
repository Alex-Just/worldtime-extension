import React from 'react';
import { TextField, MenuItem, Box } from '@mui/material';

interface ColorOptionProps {
  label: string;
  value: string;
  options: Array<{ label: string; color: string }>;
  onChange: (value: string) => void;
}

const ColorOption = ({ label, value, options, onChange }: ColorOptionProps) => {
  const renderSelectedColor = (selectedValue: unknown) => {
    const selectedColor = options.find(option => option.color === (selectedValue as string));
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          component="span"
          sx={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: selectedColor?.color,
            marginRight: 1,
          }}
        />
        {selectedColor?.label}
      </Box>
    );
  };

  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={e => onChange(e.target.value)}
      variant="standard"
      className="color-select"
      SelectProps={{
        renderValue: renderSelectedColor,
      }}>
      {options.map(option => (
        <MenuItem key={option.color} value={option.color}>
          <Box
            component="span"
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: option.color,
              marginRight: 1,
            }}
          />
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default ColorOption;
