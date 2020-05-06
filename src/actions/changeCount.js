import { COUNTER_CHANGE, SET_AUTHENTICATION } from '../constants';
export function changeCount(count) {
  return {
    type: COUNTER_CHANGE,
    payload: count
  }
}
export function setAuthentication(auth) {
  return {
    type: SET_AUTHENTICATION,
    payload: {...auth}
  }
}