import axios from 'axios'
import { SET_CURRENT_USER, GET_ERRORS, GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types'

// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())

  axios.get('/api/profile')
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: {}
    }))
}

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(() => history.push('/dashboard'))
    .catch(err => dispatch({ 
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const setProfileLoading = () => {
  return { type: PROFILE_LOADING }
}

export const clearCurrentProfile = () => {
  return { type: CLEAR_CURRENT_PROFILE }
}

export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(() => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(() => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get('/api/profile/all')
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    })
    .catch(err => dispatch({
      type: GET_PROFILES,
      payload: null 
    }))
}

// Delete account and profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This action can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(() => dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
  }
}