import React from 'react';
import '../styles/CardComponent.css';
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
    const { users, loading, startAge, endAge, nameLength } = this.state;
    return(
      <div>
        { this.state.loggedOut 
          ? <Redirect to="/login" />
          : loading 
          ? <div className="loader"></div>
          : <div className="users-outer">
              <div className="logout-bar">
                <button onClick={this.logout}>Logout</button>  
              </div>
              <div className="info"><h1 className="info-inner">Users</h1></div>
              <div className="info-filter"><h3>Filter conditions</h3></div>
              <div className="filter-menu">
                <div>
                  <label htmlFor ="startAge">Filter by age<b>(at least)</b></label>
                  <input type="number" placeholder="start age" name="startAge" onChange={(e)=>this.setText(e)} value={startAge}></input>
                </div>
                <div>
                  <label htmlFor ="endAge">Filter by age<b>(at most)</b></label>
                  <input type="number" placeholder="end age" name="endAge" onChange={(e)=>this.setText(e)} value={endAge}></input>
                </div>
                <div>
                  <label htmlFor ="nameLength">Filter by max name length</label>
                  <input type="number" placeholder="max length" name="nameLength" onChange={(e)=>this.setText(e)} value={nameLength}></input>
                </div>
              </div>
              <div className="users">
                {this.filterUsers(users).map((user, index) => <CardComponent key = {index} user={user}/>)}
              </div>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.login.token,
  users: state.login.users
});

const ActionCreators = Object.assign(
  {},
  countActions,
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users)