import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Snackbar from './components/organisms/SnackbarFeedback';

import { UserProvider } from './context/user';
import { SnackbarProvider } from './context/snackbar';

function App() {
  return (
    <UserProvider>
      <SnackbarProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
        <Snackbar />
      </SnackbarProvider>
    </UserProvider>
  );
}

export default App;
