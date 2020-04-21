import React from 'react';
import './App.css';
import Login from './components/login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import SignUp from './components/signup';
import Dashboard from './components/main/dashboard';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Login />

        <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
