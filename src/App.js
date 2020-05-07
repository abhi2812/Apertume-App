import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as countActions from './actions/changeCount';
import Login from './components/Login';
import { withAuthentication } from './wrappers/withAuthentication';
import Users from './components/Users';

export class App extends React.Component {
  render() {
    const { token } = this.props;
    return (
      <Switch> 
        <Router>
          <Route exact path="/users" component={withAuthentication( Users, { isAuthenticated: token })} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Login} />
        </Router>
      </Switch>
    );
  }
}
const mapStateToProps = state => ({
  count: state.count.count,
  isAuthenticated: state.count.isAuthenticated,
  token: state.count.token
});

const ActionCreators = Object.assign(
  {},
  countActions,
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
