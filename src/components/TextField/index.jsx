/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function TextFields({ width, name, type = "text", placeholder, value, onChange, required, helperText, error }) {
  return (
    <div className="mb-5">
      <p className="font-semibold text-sm my-2">{name}</p>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            width: width,
            height: "40px",
            bgcolor: '#F9FAFB'
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          size="small"
          placeholder={placeholder || name}
          variant="outlined"
          type={type}
          value={value}
          onChange={onChange}
          required={required ?? null}
          helperText={helperText}
          error={error}
        />
      </Box>
    </div>
  );
}

export default TextFields;
