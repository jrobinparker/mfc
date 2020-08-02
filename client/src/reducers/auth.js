import {REGISTER_SUCCESS, REGISTER_FAILED, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  newUser: false
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch(type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
      case REGISTER_SUCCESS:
        localStorage.setItem('token', payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
          newUser: true
        };
      case LOGIN_SUCCESS:
        localStorage.setItem('token', payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
          newUser: false
        };
      case REGISTER_FAILED:
      case AUTH_ERROR:
      case LOGIN_FAILED:
      case LOGOUT:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          newUser: false
        };
      default:
        return state;
  }
}
