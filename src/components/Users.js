import React from 'react';
import '../styles/CardComponent.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as countActions from '../actions/changeCount';
import API from '../api/api';
import CardComponent from '../components/CardComponent';
import { Redirect } from 'react-router-dom';


export class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loggedOut: false,
      loading: true,
      nameLength: 100,
      startAge: 0,
      endAge: 120
    }
  }

  componentDidMount() {
    const { token } = this.props;
    API.get('users/', {
      headers: {
        Authorization: 'Bearer ' + token 
      }
     }).then(
      (res) => {
        this.setState({
          users: res.data,
          loading: false
        })
      }
    ).catch((err) => {
      this.logout();
      console.log(err);
    })
  }

  logout = () => {
    localStorage.removeItem('bearer');
    const { actions } = this.props;
    actions.logOut({ token: null, isAuthenticated: false });
    this.setState({
      loggedOut: true
    })
  }

  setText = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  filterUsers = (users) => {
    const { startAge, endAge, nameLength } = this.state;
    return users.filter((x => {
      let len = 0, age = -1;
      if(x.firstName) len += x.firstName.length;
      if(x.lastName) len += x.lastName.length;
      if(x.age) age = x.age;
      if(len <= nameLength) {
        if(age===-1) {
          return true;
        } else if(age >= startAge && age <=endAge ) return true;
      }        
      return false;
    }))
  }
  
  render() {
    const { users, loading } = this.state;
    return(
      <div>
        { this.state.loggedOut 
          ? <Redirect to="/login" />
          : loading 
          ? <div class="loader"></div>
          : <div>
              <div>
                <button onClick={this.logout}>logout!</button>  
              </div>
              <div className="filterMenu">
                <input type="number" placeholder="start age" name="startAge" onChange={(e)=>this.setText(e)} value={this.state.startAge}></input>
                <input type="number" placeholder="end age" name="endAge" onChange={(e)=>this.setText(e)} value={this.state.endAge}></input>
                <input type="number" placeholder="end age" name="nameLength" onChange={(e)=>this.setText(e)} value={this.state.nameLength}></input>
              </div>
              <div className="users">
                {this.filterUsers(users).map((user) => <CardComponent user={user}/>)}
              </div>
            </div>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Users)