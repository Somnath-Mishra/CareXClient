// import React, { useId, forwardRef } from 'react';

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//     label?: string;
//     type: string;
//     className?: string;
// }

// const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
//     { label, type, className = "", ...props },
//     ref
// ) {
//     const id = useId();
//     return (
//         <div>
//             {label && (<label htmlFor={id} className="form-label">{label}</label>)}
//             <input
//                 type={type}
//                 id={id}
//                 ref={ref}
//                 {...props}
//                 className={`${className}`}
//             />
//         </div>
//     )
// });

// export default Input;

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

