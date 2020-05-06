import React from 'react';
import '../styles/Login.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as countActions from '../actions/changeCount';
import { Redirect } from 'react-router-dom';
import API from '../api/api';

export class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      failCount: 0,
      authenticateFail: false,
      errorMessage: 'Error logging in',
      isAuthenticated: false
    }
  }

  setValue = (e) => {
    console.log(e.target);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  authenticate = () => {
    const { userName, password } = this.state;
    const { actions } = this.props;
    API.post(`user/login`, { accountId: userName, pswd: password })
      .then(res => {
        if(res.status === 200 && res.data && res.data.token) {
          console.log(res);
          actions.setAuthentication({isAuthenticated: true, token: res.data.token });
          localStorage.setItem('bearer', res.data.token);
        } else {
          this.setState({
            authenticateFail: true,
            failCount: this.state.failCount+1,
            errorMessage: res.error_message ? res.error_message : this.state.errorMessage
          })
        }
      }).catch(err => {
        this.setState({
          authenticateFail: true,
          failCount: this.state.failCount+1,
          errorMessage: err.error_message ? err.error_message : this.state.errorMessage
        })
      })
  }

  render() {
    const token = localStorage.getItem('bearer');
    const { userName, password } = this.state;
    console.log('fuecker',token);
    return (
      <div>
        {token
        ? <Redirect to="/users" />
        : <div className="Login">
          <input type="text" name="userName" autoFocus="autofocus" placeholder="username" onChange={(e) => this.setValue(e)} value={userName} />
          <input type="text" name="password" placeholder="password" onChange={(e) => this.setValue(e)} value={password} />
          <button onClick={this.authenticate}>Login!</button>
        </div>}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
