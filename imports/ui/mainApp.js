import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './app';
import Settings from './settings';
import  FindHmis from './findHmis';
import Reports from './reports';
import DailyEntry from './dailyEntry';


// App component - represents the whole app
class MainApp extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={ FindHmis } />
          <Route path="/daily/:hmisId" component={DailyEntry} />
          <Route path="/settings" component={Settings}/>
          <Route path="/reports" component={Reports} />
        </Route>
      </Router>
    )
  }
}

export default MainApp;
