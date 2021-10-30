import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({ paperHead: { padding: '5px 10px' } }));

interface Props {
  title: string;
  Icon: any;
}

const HeaderUserBox: React.FC<Props> = ({ title, Icon }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      className={classes.paperHead}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="150px"
      >
        {Icon}
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Typography variant="caption">* All fields are mandatory</Typography>
    </Box>
  );
};

export default HeaderUserBox;
