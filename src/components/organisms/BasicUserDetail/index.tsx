import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Button,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

// icons
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import HeaderUserBox from '../../molecules/HeaderUserBox';
import BoxUserDetails from '../../atoms/BoxUserDetails';

import { useUser } from '../../../context/user';

const useStyles = makeStyles(() => ({
  paper: { margin: 'auto' },
  avatar: { height: '150px', width: '150px', marginBottom: '10px' },
}));

const BasicUserDetail: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { userToUpdateData, getUserToUpdateData, useToUpdateHandleChange } = useUser();

  useEffect(() => {
    getUserToUpdateData(id); // eslint-disable-line
  }, []);

  useEffect(() => {}, [userToUpdateData]);

  return (
    <BoxUserDetails>
      <HeaderUserBox title="Basic details" Icon={<AccountBoxIcon />} />
      <Divider />
      <Grid container>
        <Grid item sm={3}>
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
            <Grid
              container
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item sm={5}>
                <TextField
                  name="firstName"
                  label="First name"
                  placeholder="Your first name here"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  style={{ margin: 8 }}
                  onChange={(e) => {
                    useToUpdateHandleChange(e.target);
                  }}
                  value={userToUpdateData.firstName}
                />
              </Grid>
              <Grid item sm={5}>
                <TextField
                  name="lastName"
                  label="Last name"
                  placeholder="Your last name here"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  style={{ margin: 8 }}
                  onChange={(e) => {
                    useToUpdateHandleChange(e.target);
                  }}
                  value={userToUpdateData.lastName}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item sm={12}>
                <TextField
                  name="email"
                  label="Email address"
                  placeholder="Your Email here"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  style={{ margin: 8 }}
                  value={userToUpdateData.email}
                  onChange={(e) => useToUpdateHandleChange(e.target)}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </BoxUserDetails>
  );
};

export default BasicUserDetail;
