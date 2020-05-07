import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


export function withAuthentication(Component, props) {
  class checkAuth extends React.Component {
    render() {
      const { token } = this.props;
      return(
        token ? <Component /> : <Redirect to="/" />
      )
    }
  }

  const mapStateToProps = (state) => ({
    token: state.count.token
  })

  return connect(mapStateToProps)(checkAuth);
}
