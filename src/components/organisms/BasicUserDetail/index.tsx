import React from 'react';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Paper,
  Button,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// icons
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import HeaderUserBox from '../../molecules/HeaderUserBox';

const useStyles = makeStyles(() => ({
  paper: { margin: 'auto' },
  avatar: { height: '150px', width: '150px', marginBottom: '10px' },
}));

const BasicUserDetail: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <HeaderUserBox title="Basic details" Icon={<AccountBoxIcon />} />
      <Divider />
      <Grid container>
        <Grid item sm={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            padding="10px"
          >
            <Avatar className={classes.avatar} />
            <Button variant="outlined" startIcon={<PhotoCameraIcon />}>
              Upload picture
            </Button>
          </Box>
        </Grid>
        <Grid item sm={7}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding="10px"
          >
            <TextField
              label="Full name"
              placeholder="Your full name here"
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{ margin: 8 }}
            />
            <TextField
              label="Email address"
              placeholder="Your Email here"
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{ margin: 8 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BasicUserDetail;
