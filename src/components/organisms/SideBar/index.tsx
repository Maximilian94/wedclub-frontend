import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Avatar, Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/user';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: { width: drawerWidth },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  avatar: {
    height: '100px',
    width: '100px',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  userInfoBox: { padding: '10px 0' },
  link: { textDecoration: 'none', color: theme.palette.text.primary },
}));

interface Props {
  open: boolean;
  handleDrawerClose: Function;
}

const navigation = [
  { title: 'Dashboad', icon: <DashboardIcon />, href: '/dashboard' },
  { title: 'Costumers', icon: <GroupIcon />, href: '/dashboard/costumers' },
  { title: 'Account', icon: <PersonIcon />, href: '/dashboard/account' },
];

const SideBar: React.FC<Props> = ({ open, handleDrawerClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { userData } = useUser();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => handleDrawerClose()}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        className={classes.userInfoBox}
      >
        <Avatar alt={userData.firstName} className={classes.avatar} src="." />
        <Typography variant="h6">
          {`${userData.firstName} ${userData.lastName}`}
        </Typography>
        <Typography variant="caption">{userData.role}</Typography>
      </Box>
      <Divider />
      <List>
        {navigation.map(({ title, icon, href }) => (
          <Link to={{ pathname: href }} className={classes.link}>
            <ListItem button key={title}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['Log out'].map((text) => (
          <Link to="/" className={classes.link}>
            <ListItem button key={text} href="/">
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
