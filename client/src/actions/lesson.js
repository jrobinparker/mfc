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

export const createLesson = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/lessons', formData, config)

    dispatch({
      type: GET_LESSON,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Lesson updated!' : 'Lesson created!', 'success'));

    history.push('/dashboard');
  } catch(err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    };

    dispatch({
      type: LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const editLesson = (id, formData, history, edit = true) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.patch(`/api/lessons/${id}`, formData, config)

    dispatch({
      type: GET_LESSON,
      payload: res.data
    });

    dispatch(setAlert('Lesson updated!', 'success'));

    history.push('/dashboard');
  } catch(err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    };

    dispatch({
      type: LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}
