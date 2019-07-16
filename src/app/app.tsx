import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';

import Game from './routes/game/game';

import './app.scss';

const App: React.FC = () => {
  return (
    <Provider store={store()}>
      <Router>
        <Switch>
          <Route path="/game" component={Game} />
          <Redirect to="/game" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
