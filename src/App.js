import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as countActions from './actions/changeCount';
import Login from './components/Login';
import { withAuthentication } from './wrappers/withAuthentication';
import Users from './components/Users';

export class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    let token = null;
    if(isAuthenticated) {
      token = localStorage.getItem('bearer');
    }
    console.log('here',token);
    return (
      <Switch> 
        <Router>
          <Route exact path="/users" component={withAuthentication( Users, { isAuthenticated: token })} />
          <Route exact path="/login" component={withAuthentication( Login, { isAuthenticated: token })} />
          <Route exact path="/" component={withAuthentication( Login, { isAuthenticated: token })} />
        </Router>
      </Switch>
    );
  }
}
const mapStateToProps = state => ({
  count: state.count.count,
  isAuthenticated: state.count.isAuthenticated
});

const ActionCreators = Object.assign(
  {},
  countActions,
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
