import React from 'react';
import { connect } from 'react-redux';
import { Users } from '../components/Users';
import { Login } from '../components/Login';
import { withRouter, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as countActions from '../actions/changeCount';

export function withAuthentication(Component, props) {
  return class checkAuth extends React.Component {
    render() {
      const token = localStorage.getItem('bearer');
      //console.log(props.isAuthenticated)
      return(
        token ? <Component /> : <Redirect to="/" />
      )
    }
  }
}
