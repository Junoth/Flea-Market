import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { SET_CURRENT_USER, GET_ERRORS, SET_CURRENT_AVATAR } from './types';

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch(getErrors(err.response.data));
    });
};

// Login user
export const loginUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localstorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      // jump to home page
      history.push('/home')
    })
    .catch(err => {
      dispatch(getErrors(err.response.data));
    })
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = (history) => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  // jump to login page
  history.push('/login');
}

// Change Avatar
export const changeAvatar = (avatar) => dispatch => {
  let data = new FormData();
  data.append('image', avatar);
  axios
    .post('/api/users/avatar', data)
    .then(res => {
      // Save to localstorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => console.log(err.response));
}

// Delete User
export const deleteUser = (history) => dispatch => {
  axios
    .delete('/api/users')
    .then(res => {
      // Log out current user
      logoutUser(history);
    })
}

// Get errors
export const getErrors = err => {
  return {
    type: GET_ERRORS,
    payload: err
  }
}