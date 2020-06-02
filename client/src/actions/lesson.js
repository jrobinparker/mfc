import axios from 'axios';
import { setAlert } from './alert';
import { GET_LESSONS, GET_LESSON, LESSON_ERROR } from './types';

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
