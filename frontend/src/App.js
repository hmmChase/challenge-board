import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChallengePage from './pages/challenge';
import LoginPage from './pages/login';
import LoginDiscordPage from './pages/login-discord';
import ResetPasswordPage from './pages/reset-password';
import SignUpPage from './pages/signup';
import SignUpDiscordPage from './pages/signup-discord';
import IndexPage from './pages/index';
import useFetch from './api/useFetch';
import AppContext from './context/app';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [getData, { loading, error }] = useFetch('/users');

  useEffect(() => {
    (async () => {
      const data = await getData();

      if (!loading && !error && data && data.user && data.user.id)
        setCurrentUser(data.user);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AppContext.Provider value={{ currentUser, setCurrentUser }}>
        <Router>
          <div>
            <Switch>
              <Route path='/challenge/:questionId'>
                <ChallengePage />
              </Route>

              <Route path='/challenge'>
                <ChallengePage />
              </Route>

              <Route path='/login'>
                <LoginPage />
              </Route>

              <Route path='/login-discord'>
                <LoginDiscordPage />
              </Route>

              <Route path='/reset-password/:resetToken'>
                <ResetPasswordPage />
              </Route>

              <Route path='/reset-password'>
                <ResetPasswordPage />
              </Route>

              <Route path='/signup'>
                <SignUpPage />
              </Route>

              <Route path='/signup-discord'>
                <SignUpDiscordPage />
              </Route>

              <Route path='/'>
                <IndexPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </AppContext.Provider>
    </div>
  );
};

export default App;
