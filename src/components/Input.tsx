

import { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface InputProps extends Omit<TextFieldProps, "ref"> {
  label?: string;
  className?: string;
  accept?: string; // Add accept to InputProps
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, className = "", accept, type = "text", ...props },
  ref
) {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      className={className}
      InputProps={{
        inputRef: ref,
        ...(type === "file" && { inputProps: { accept } }), // Pass accept if type is 'file'
      }}
      type={type}
      {...props}
    />
  );
});

export default Input;

