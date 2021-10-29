import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={Login} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
