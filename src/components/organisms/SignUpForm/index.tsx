import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormInputs from '../../atoms/FormInputs';
import useStyles from '../../../Hooks/styles';
import {
  passwordCreationValidation,
  emailValidation,
  nameValidation,
} from '../../../services/validations';

import { createAccount } from '../../../services/api';

import { useSnackbar } from '../../../context/snackbar';

interface ErrorObj {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const INICIAL_DATA = {
  firstName: '',
  lastName: '',
  password: '',
  email: '',
  confirmPassword: '',
};
const INICIAL_ERROR = {
  firstName: '',
  lastName: '',
  password: '',
  email: '',
  confirmPassword: '',
};

const invalidFielLabel: any = {
  firstName: 'Invalid name',
  lastName: 'Invalid last name',
  email: 'Invalid Email',
};

const SignUp: React.FC = () => {
  const [formsData, setFormsData] = useState(INICIAL_DATA);
  const [errors, setErrors] = useState<ErrorObj>(INICIAL_ERROR);
  const classes = useStyles();
  const { setOpen, setSeverity, setMessage } = useSnackbar();

  const handleChange = (target: any) => {
    const { name, value } = target;
    setFormsData({ ...formsData, [name]: value });
    if (value === '') return setErrors({ ...errors, [name]: '' });

    if (name === 'firstName' || name === 'lastName') {
      const regexNoNumber = /^[a-zA-Z ]{2,30}$/;
      if (!regexNoNumber.test(value)) {
        setErrors({ ...errors, [name]: invalidFielLabel[name] });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    }

    if (name === 'email') {
      // eslint-disable-next-line
      const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regexEmail.test(value)) {
        setErrors({ ...errors, [name]: invalidFielLabel[name] });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    }

    if (name === 'password') {
      if (value.length <= 7) {
        setErrors({
          ...errors,
          password: 'Password must have at least 8 characters',
        });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    }

    if (name === 'confirmPassword') {
      if (value !== formsData.password) {
        setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    }

    return null;
  };

  const firstName = () => (
    <FormInputs
      name="firstName"
      label="First Name"
      value={formsData.firstName}
      handleChange={handleChange}
      helperText={errors.firstName}
      autocomplete="fname"
    />
  );

  const lastName = () => (
    <FormInputs
      name="lastName"
      label="Last Name"
      value={formsData.lastName}
      handleChange={handleChange}
      helperText={errors.lastName}
      autocomplete="lname"
    />
  );

  const email = () => (
    <FormInputs
      name="email"
      label="Email Address"
      value={formsData.email}
      handleChange={handleChange}
      helperText={errors.email}
      autocomplete="email"
    />
  );

  const password = () => (
    <TextField
      variant="outlined"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
      onChange={(e) => handleChange(e.target)}
      value={formsData.password}
      error={!!errors.password}
      helperText={errors.password ? errors.password : null}
    />
  );

  const confirmPassword = () => (
    <TextField
      variant="outlined"
      required
      fullWidth
      name="confirmPassword"
      label="Confirm password"
      type="password"
      id="confirmPassword"
      onChange={(e) => handleChange(e.target)}
      value={formsData.confirmPassword}
      error={!!errors.confirmPassword}
      helperText={errors.confirmPassword ? errors.confirmPassword : null}
    />
  );

  const isAllDataValid = () => {
    const isFirstNameValid = nameValidation(formsData.firstName);
    const isLastNameValid = nameValidation(formsData.lastName);
    const isEmailValid = emailValidation(formsData.email);
    const isPasswordValid = passwordCreationValidation(
      formsData.password,
      formsData.confirmPassword,
    );
    if (
      isEmailValid && // eslint-disable-line
      isPasswordValid && // eslint-disable-line
      isFirstNameValid && // eslint-disable-line
      isLastNameValid
    ) {
      return true;
    }
    return false;
  };

  const resetForms = () => setFormsData(INICIAL_DATA);

  const fetchCreateAccount = async () => {
    if (!isAllDataValid()) {
      console.log('Some data is incorrect');
      return '';
    }

    const response: any = await createAccount(
      formsData.email,
      formsData.password,
      formsData.firstName,
      formsData.lastName,
    );

    console.log(response);

    if (response.status === 201) {
      const { message } = await response.json();
      setSeverity('success');
      setMessage(message);
      setOpen(true);
      resetForms();
    } else {
      const { message } = await response.json();
      setSeverity('error');
      setMessage(message);
      setOpen(true);
    }
    return '';
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {firstName()}
            </Grid>
            <Grid item xs={12} sm={6}>
              {lastName()}
            </Grid>
            <Grid item xs={12}>
              {email()}
            </Grid>
            <Grid item xs={12}>
              {password()}
            </Grid>
            <Grid item xs={12}>
              {confirmPassword()}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => fetchCreateAccount()}
            disabled={!isAllDataValid()}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
