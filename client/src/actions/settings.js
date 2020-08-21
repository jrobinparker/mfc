import axios from 'axios';
import { setAlert } from './alert';
import { GET_SETTINGS, UPDATE_SETTINGS } from './types';

export const getSettings = () => async dispatch => {
  try {
    const res = await axios.get('/api/settings');
    dispatch({
      type: GET_SETTINGS,
      payload: res.data
    })
  } catch(err) {
    dispatch({
      type: SETTINGS_ERROR,
      payload: ({ msg: err.response.statusText, status: err.response.status })
    })
  }
}

export const createSettings = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/settings', formData, config)

    dispatch({
      type: GET_SETTINGS,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Settings updated!' : 'Settings created!', 'success'));

    history.push('/dashboard');
  } catch(err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    };

    dispatch({
      type: SETTINGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const editSettings = (id, formData, history, edit = true) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.patch(`/api/settings/${id}`, formData, config)

    dispatch({
      type: GET_SETTINGS,
      payload: res.data
    });

    dispatch(setAlert('Settings updated!', 'success'));

    history.push('/dashboard');
  } catch(err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    };

    dispatch({
      type: SETTINGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}
