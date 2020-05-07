import React from 'react';
import '../styles/Login.css';
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
      errorMessage: 'Error logging in, please try again',
      isAuthenticated: false,
      authenticating: false,
      maskedPassword: ''
    }
    const tokenExists = localStorage.getItem('bearer');
    if(tokenExists) {
      this.props.actions.setAuthentication({isAuthenticated: true, token: tokenExists });
    }
  }

  setValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    if (e.keyCode === 13) {
      this.authenticate();
    }
  }

  authenticate = () => {
    const { userName, password } = this.state;
    if(!userName) {
      this.setState({
        authenticateFail: true,
        errorMessage: 'username cannot be blank'
      })
      return
    }
    if(!password) {
      this.setState({
        authenticateFail: true,
        errorMessage: 'password cannot be blank'
      })
      return
    }
    const { actions } = this.props;
    this.setState({ authenticating: true },
      () => API.post(`user/login`, { accountId: userName, pswd: password })
      .then(res => {
        if(res.status === 200 && res.data && res.data.token) {
          this.setState({
            authenticateFail: false
          })
          actions.setAuthentication({isAuthenticated: true, token: res.data.token });
          localStorage.setItem('bearer', res.data.token);
        } else {
          this.setState({
            authenticateFail: true,
            authenticating: false,
            failCount: this.state.failCount+1,
            errorMessage: res.error_message ? res.error_message : 'incorrect credentials, please try again'
          })
        }
      }).catch(err => {
        this.setState({
          authenticateFail: true,
          authenticating: false,
          failCount: this.state.failCount+1,
          errorMessage: err.error_message ? err.error_message : 'incorrect credentials, please try again'
        })
      })
    )
  }

  


  render() {
    const { token } = this.props;
    const { userName, password, authenticating, authenticateFail } = this.state;
    return (
      <div className="login-wrap">
        {token
        ? <Redirect to="/users" />
        : authenticating 
        ? <div class="loader"></div>
        : <div className="login">
            <div className="login-inner">
              {authenticateFail && <div className="login-error">{this.state.errorMessage}</div>}
              <div className="login-input">
                <label htmlFor ="username">Username:</label>
                <input type="text" name="userName" placeholder="username"
                  onKeyDown={(e) => this.handleSubmit(e)} onChange={(e) => this.setValue(e)} value={userName} /><br />
              </div>
              <div className="login-input">
                <label htmlFor ="password">Password:</label>
                <input type="password" name="password" placeholder="password" 
                  onKeyDown={(e) => this.handleSubmit(e)} onChange={(e) => this.setValue(e)} value={password} />
              </div>
              <button onClick={this.authenticate}>Login!</button>
            </div>
          </div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
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
