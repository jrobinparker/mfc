import axios from 'axios';
import { setAlert } from './alert';
import { GET_TRACKS, GET_TRACK, TRACK_ERROR } from './types';

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

export const getTrack = id => async dispatch => {
  try {
    const res = await axios.get(`/api/tracks/${id}`);
    dispatch({
      type: GET_TRACK,
      payload: res.data
    })
  } catch(err) {
    dispatch({
      type: TRACK_ERROR,
      payload: ({ msg: err.response.statusText, status: err.response.status })
    })
  }
}
