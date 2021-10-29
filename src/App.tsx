import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/SignUp';

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route path="/" component={Login} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
