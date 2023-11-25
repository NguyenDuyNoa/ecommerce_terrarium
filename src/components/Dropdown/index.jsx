import { Box, FormControl, MenuItem, Select } from '@mui/material';
import React from 'react';

const SingleSelect = ({
  name,
  width = '200px',
  options,
  value = '',
  onChange,
  placeholder
}) => {
  return (
    <div className='text-base font-medium'>
      <Box
        sx={{
          '& .MuiInputBase-root': { width: width, marginBottom: '20px', backgroundColor: 'white' }
        }}
      >
        <FormControl fullWidth>
          <p className="font-semibold text-sm my-2">{name}</p>
          <Select
            size='small'
            placeholder={placeholder || name}
            value={value}
            onChange={onChange}
            displayEmpty
            renderValue={
              value !== '' ? undefined : () => <ul className='text-ct4-gray-5'>{placeholder ? placeholder : name}</ul>
            }
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224
                }
              }
            }}
          >
            {options.length > 0 &&
              options.map((item, index) => (
                <MenuItem value={item.value} key={index}>
                  {item.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default SingleSelect;
