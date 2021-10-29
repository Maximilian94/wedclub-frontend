import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FormInputs from '../../atoms/FormInputs';
import useStyles from '../../../Hooks/styles';

import logo from '../../../images/Logo.png';

const INICIAL_DATA = { email: '', password: '' };
interface FormData {
  email: string;
  password: string;
}

function SignIn() {
  const [formData, setFormData] = useState<FormData>(INICIAL_DATA);
  const classes = useStyles();

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
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;
