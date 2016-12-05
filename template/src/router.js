

import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Link} from 'react-router';

// Import Components
import DefaultApp from './components/DefaultApp';

export default (
  <Router history={browserHistory}>
    <Route path='/' component={DefaultApp}>
      <Route path='poop' component={DefaultApp}/>
    </Route>
  </Router>
);
