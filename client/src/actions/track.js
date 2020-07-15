import axios from 'axios';
import { setAlert } from './alert';
import { GET_TRACKS, GET_TRACK, DISPLAY_TRACK_LESSONS, TRACK_ERROR } from './types';

export const getTracks = () => async dispatch => {
  try {
    const res = await axios.get('/api/tracks');
    dispatch({
      type: GET_TRACKS,
      payload: res.data
    })
  } catch(err) {
    dispatch({
      type: TRACK_ERROR,
      payload: ({ msg: err.response.statusText, status: err.response.status })
    })
  }
}

export const getTrack = id => dispatch => {
  try {
    let lessonIds = []
    axios.get(`/api/tracks/${id}`)
      .then(res =>
        dispatch({
          type: GET_TRACK,
          payload: res.data
        }))
      .then(res => lessonIds.concat(res.payload.lessons))
      .then(lessonIds => getTrackLessons(lessonIds))

    async function getTrackLessons(lessonIds) {
      let trackLessons = []
      for (let lessonId of lessonIds) {
        const { _id } = lessonId
        await axios.get(`/api/lessons/${_id}`)
          .then(res => trackLessons.push(res.data))
        }
      dispatch(displayTrackLessons(trackLessons))
    }
  } catch(err) {
    dispatch({
      type: TRACK_ERROR,
      payload: ({ msg: err.response.statusText, status: err.response.status })
    })
  }
}

export const displayTrackLessons = trackLessons => dispatch => {
  dispatch({
    type: DISPLAY_TRACK_LESSONS,
    payload: trackLessons
  })
}

export const createTrack = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/tracks', formData, config)

    dispatch({
      type: GET_TRACK,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Track updated!' : 'Track created!', 'success'));

    history.push('/tracks');
  } catch(err) {

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    };

    dispatch({
      type: TRACK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const editTrack = (id, formData, history, edit = true) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.patch(`/api/tracks/${id}`, formData, config)

    dispatch({
      type: GET_TRACK,
      payload: res.data
    });

    dispatch(setAlert('Track updated!', 'success'));

    history.push('/dashboard');
  } catch(err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    };

    dispatch({
      type: TRACK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}
