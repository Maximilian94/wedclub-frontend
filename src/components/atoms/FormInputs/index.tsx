import React from 'react';
import TextField from '@material-ui/core/TextField';

interface FormInputsProps {
  name: string;
  label: string;
  value: string;
  handleChange: Function;
  helperText: string;
  autocomplete: string;
}

const FormInputs: React.FC<FormInputsProps> = ({
  name,
  label,
  value,
  handleChange,
  autocomplete,
  helperText = '',
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
    onChange={(e) => handleChange(e.target)}
    value={value}
    error={!!helperText}
    helperText={helperText || null}
  />
);

export default FormInputs;
