import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';

// Components
import BasicUserDetail from '../../organisms/BasicUserDetail';
import PersonalUserDetail from '../../organisms/PersonalUserDetail';

interface RouterParams {
  id: string;
}

const useStyles = makeStyles(() => ({
  // eslint-disable-line
  box: { maxWidth: 1080, margin: 'auto' },
}));

interface Props extends RouteComponentProps<RouterParams> {}

const UserDetail: React.FC<Props> = ({ match }) => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <BasicUserDetail />
      <PersonalUserDetail />
      User Detail{match.params.id}
    </Box>
  );
};

export default UserDetail;
