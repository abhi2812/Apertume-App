import React from 'react';
import '../styles/Login.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as countActions from '../actions/changeCount';
import API from '../api/api';
import { withRouter } from 'react-router-dom';

export class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    const token = localStorage.getItem('bearer');
    API.get('users/', {
      headers: {
        Authorization: 'Bearer ' + token 
      }
     }).then(
      (res) => {
        console.log(res);
      }
    ).catch((err) => {
      console.log(err);
    })
  }
  
  render() {
    console.log('dsfkdkf');
    return(
      <div>
        <div style={{color:'white'}}>sdfsvvbbvbdf</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  count: state.count.count,
  token: state.count.token,
  users: state.count.users
});

const ActionCreators = Object.assign(
  {},
  countActions,
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users))