import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputAdornment, TextField } from '@mui/material';

const SearchField = ({ width = '100px', onChange, value = '' }) => {
  return (
    <div>
      <FormControl
        sx={{
          "& .MuiTextField-root": {
            width: { width },
            backgroundColor: "white",
          },
        }}
      >
        <TextField
          onChange={onChange}
          value={value}
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="large" className="cursor-pointer" />
              </InputAdornment>
            ),
          }}
          placeholder="Tìm kiếm..."
        />
      </FormControl>
    </div>
  );
};

export default SearchField;
