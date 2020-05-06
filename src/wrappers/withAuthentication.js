import React from 'react';
import { connect } from 'react-redux';
import { Users } from '../components/Users';
import { Login } from '../components/Login';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as countActions from '../actions/changeCount';

export function withAuthentication(Component, props) {
  class checkAuth extends React.Component {
    render() {
      console.log('dfdfdfdf',props.isAuthenticated)
      return(
        props.isAuthenticated ? <Users {...this.props}/> : <Login {...this.props}/>
      )
    }
  }
  const mapStateToProps = state => ({
    count: state.count.count,
    isAuthenticated: state.count.isAuthenticated,
  });
  
const ActionCreators = Object.assign(
  {},
  countActions,
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(checkAuth));
}
