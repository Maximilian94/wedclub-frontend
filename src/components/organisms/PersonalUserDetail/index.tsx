import React, { useState } from 'react';

import FaceIcon from '@material-ui/icons/Face';
import { Box, Divider, Grid, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HeaderUserBox from '../../molecules/HeaderUserBox';
import BoxUserDetails from '../../atoms/BoxUserDetails';

const useStyles = makeStyles(() => ({ boxPadding: { padding: '10px' } }));

function PersonalUserDetail() {
  const [gender, setGender] = useState('Male');
  const classes = useStyles();

  const handleChange = (event: any) => {
    const {
      // eslint-disable-line
      target: { value },
    } = event;
    setGender(value);
  };

  return (
    <BoxUserDetails>
      <HeaderUserBox title="Personal details" Icon={<FaceIcon />} />
      <Divider />
      <Grid container className={classes.boxPadding}>
        <Grid item sm={6}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <TextField
              id="date"
              label="Birthday"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Grid>
        <Grid item sm={6}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <TextField
              id="standard-select-currency"
              select
              label="Gender"
              value={gender}
              onChange={(e) => handleChange(e)}
            >
              {['Male', 'Female'].map((option) => (
                <MenuItem value={option}>{option}</MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
      </Grid>
    </BoxUserDetails>
  );
}

export default PersonalUserDetail;
