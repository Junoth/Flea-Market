import axios from 'axios';

import { GET_PROFILE, GET_CURRENT_PROFILE, CLEAR_CURRENT_PROFILE, GET_ERRORS, CLEAR_ERRORS } from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  axios
    .get('/api/profiles')
    .then(res => {
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: res.data
      })
    })
};

// Get profile by Id
export const getProfile = (user_id) => dispatch => {
  axios
    .get(`/api/profiles/user/${user_id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    });
}

// Create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profiles', profileData)
    .then(res => {
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
}

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Clear errors
export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
}

