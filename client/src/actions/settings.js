import axios from 'axios';
import { setAlert } from './alert';
import { GET_SETTINGS, GET_SETTING, UPDATE_SETTINGS, SETTINGS_ERROR } from './types';

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
};

export const getSetting = id => async dispatch => {
  try {
    const res = await axios.get(`/api/settings/${id}`);
    dispatch({
      type: GET_SETTING,
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

    dispatch(
      getSettings()
    )

    dispatch(setAlert(edit ? 'Settings updated!' : 'Settings created!', 'success'));

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

    dispatch(
      getSettings()
    )

    dispatch(setAlert('Settings updated!', 'success'));

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
