import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwtDecode from 'jwt-decode' 

import { GET_ERRORS, SET_CURRENT_USER } from './types'

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const loginUser = (userData) => dispatch => {
  axios.post('/api/user/login', userData)
    .then(res => {
      //save token to local storage
      const { token } = res.data
      localStorage.setItem('jwtToken', token)

      //Set token to Auth header
      setAuthToken(token)
      //Decode token to get user data
      const decoded = jwtDecode(token)
      //Set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Set current user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}