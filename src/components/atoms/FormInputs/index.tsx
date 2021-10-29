import React from 'react';
import TextField from '@material-ui/core/TextField';

interface FormInputsProps {
  name: string;
  label: string;
  value: string;
  change: Function;
  helperText: string;
  autocomplete: string;
}

const FormInputs: React.FC<FormInputsProps> = ({
  name,
  label,
  value,
  change,
  autocomplete,
  helperText,
}) => (
  <TextField
    autoComplete={autocomplete}
    name={name}
    variant="outlined"
    required
    fullWidth
    id={name}
    label={label}
    autoFocus
    onChange={(e) => change(e.target)}
    value={value}
    error={!!helperText}
    helperText={helperText || null}
  />
);

export default FormInputs;
