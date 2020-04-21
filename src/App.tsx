import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Login from './components/login';
import SignUp from './components/signup';
import Dashboard from './components/main/dashboard';
import UserProfile from './components/user-profile';
import { UsernameVar } from './redux/actions';
import { useSelector } from 'react-redux';
import { AppState } from './redux/types';

const App = () => {
  const userName = useSelector((state: AppState) => state.logUserReducer)
  const user: UsernameVar = useSelector((state: AppState) => state.getUserReducer)

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path={`/${(user) || (userName)}`}>
            <UserProfile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
