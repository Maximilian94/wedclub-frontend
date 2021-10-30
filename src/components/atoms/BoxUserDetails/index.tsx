import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(() => ({ paper: { margin: 'auto', marginBottom: '20px' } }));

interface Props {
  children: React.ReactChild | React.ReactChild[];
}

const BoxUserDetails: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return <Paper className={classes.paper}>{children}</Paper>;
};

export default BoxUserDetails;
