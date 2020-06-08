import axios from 'axios';
import { setAlert } from './alert';
import { GET_LESSONS, GET_LESSON, LESSON_ERROR, UPDATE_LIKES } from './types';

export const getLessons = () => async dispatch => {
  try {
    const res = await axios.get('/api/lessons');
    dispatch({
      type: GET_LESSONS,
      payload: res.data
    })
  } catch(err) {
    dispatch({
      type: LESSON_ERROR,
      payload: ({ msg: err.response.statusText, status: err.response.status })
    })
  }
}

export const getLesson = id => async dispatch => {
  try {
    const res = await axios.get(`/api/lessons/${id}`);
    dispatch({
      type: GET_LESSON,
      payload: res.data
    })
  } catch(err) {
    dispatch({
      type: LESSON_ERROR,
      payload: ({ msg: err.response.statusText, status: err.response.status })
    })
  }
}

export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/lessons/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    })
  } catch(err) {
    dispatch({
      type: LESSON_ERROR,
      payload: ({ msg: err.response.statusText, status: err.response.status })
    })
  }
}

export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/lessons/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    })
  } catch(err) {
    dispatch({
      type: LESSON_ERROR,
      payload: ({ msg: err.response.statusText, status: err.response.status })
    })
  }
}
