import { SET_AUTHENTICATION, LOG_OUT } from '../constants';
export function setAuthentication(auth) {
  return {
    type: SET_AUTHENTICATION,
    payload: {...auth}
  }
}

export function logOut(data) {
  return {
    type: LOG_OUT,
    payload: {...data}
  }
}