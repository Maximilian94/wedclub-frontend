import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

//  Templates
import Appbar from '../../components/organisms/Appbar';
import SideBar from '../../components/organisms/SideBar';
import Costumers from '../../components/templates/Costumers';
import Account from '../../components/templates/Account';
import UserDetail from '../../components/templates/UserDetail';
import { useUser } from '../../context/user';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex' },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { token } = useUser();
  const history = useHistory();

  const isTokenExists = () => !!token;

  const invalidTokenRedirectsToLogin = () => {
    if (!isTokenExists()) {
      console.log('N é valido');
      return history.push('/');
    }
    console.log('É valido');
    return null;
  };

  useEffect(() => {
    invalidTokenRedirectsToLogin();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />
      <main className={clsx(classes.content, { [classes.contentShift]: open })}>
        <div className={classes.drawerHeader} />
        <Router>
          <Switch>
            <Route path="/dashboard/costumers" component={Costumers} />
            <Route path="/dashboard/account" component={Account} />
            <Route path="/dashboard/user/:id" component={UserDetail} />
            <Route path="/dashboard">Dashboard</Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}
