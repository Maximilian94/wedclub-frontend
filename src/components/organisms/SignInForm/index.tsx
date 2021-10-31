import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import MuiAlert from '@material-ui/lab/Alert';

import { useHistory } from 'react-router-dom';
import { LinearProgress, Snackbar } from '@material-ui/core';
import FormInputs from '../../atoms/FormInputs';
import useStyles from '../../../Hooks/styles';

import logo from '../../../images/Logo.png';

import { userLogin } from '../../../services/api';

const INICIAL_DATA = { email: '', password: '' };
interface FormData {
  email: string;
  password: string;
}

function SignIn() {
  const [formData, setFormData] = useState<FormData>(INICIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState('');
  const classes = useStyles();
  const history = useHistory();

  const loginRedirect = async () => {
    setIsLoading(true);
    if (loginFeedback) {
      setLoginFeedback('');
    }

    const response = await userLogin(formData.email, formData.password);
    if (response.status === 200) {
      setIsLoading(false);
      return history.push('/dashboard');
    }
    if (response.status !== 200) {
      const { message } = await response.json();
      setLoginFeedback(message);
      setIsLoading(false);
    }
    return '';
  };

  const handleChange = (target: any) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const userName = () => (
    <FormInputs
      name="email"
      label="Email Address"
      value={formData.email}
      handleChange={handleChange}
      autocomplete="email"
      helperText=""
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
      value={formData.password}
    />
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <div className={classes.paper}>
          <img src={logo} alt="logo" />
        </div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {userName()}
            </Grid>
            <Grid item xs={12}>
              {password()}
            </Grid>
          </Grid>
          {isLoading ? <LinearProgress className={classes.loading} /> : null}
          <Snackbar
            open={loginFeedback !== ''}
            autoHideDuration={6000}
            // onClose={handleClose}
          >
            <MuiAlert elevation={6} variant="filled" severity="error">
              {loginFeedback}
            </MuiAlert>
          </Snackbar>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // href="/dashboard"
            onClick={() => loginRedirect()}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/signup" variant="body2">
            Dont have an account? Sign up
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignIn;
