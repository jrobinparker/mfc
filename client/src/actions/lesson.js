import axios from 'axios';
import { setAlert } from './alert';
import { GET_LESSONS, GET_LESSON, LESSON_ERROR, UPDATE_LIKES, UPDATE_COMPLETES, ADD_COMMENT, DELETE_COMMENT, UPLOAD_VIDEO, DELETE_LESSON, UPDATE_IN_PROGRESS } from './types';

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
    dispatch(
      getLesson(id)
    )
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
    dispatch(
      getLesson(id)
    )
  } catch(err) {
    dispatch({
      type: LESSON_ERROR,
      payload: ({ msg: err.response.statusText, status: err.response.status })
    })
  }
}

export const addInProgress = id => async dispatch => {
  try {
    const res = await axios.put(`/api/lessons/in-progress/${id}`);
    dispatch({
      type: UPDATE_IN_PROGRESS,
      payload: { id, inProgress: res.data }
    })
    console.log('lesson in progress')
  } catch(err) {
    dispatch({
      type: LESSON_ERROR,
      payload: ({ msg: err.response.statusText, status: err.response.status })
    })
  }
}

export const removeInProgress = id => async dispatch => {
  try {
    const res = await axios.put(`/api/lessons/remove-in-progress/${id}`);
    dispatch({
      type: UPDATE_IN_PROGRESS,
      payload: { id, inProgress: res.data }
    })
    dispatch(
      getLesson(id)
    )
  } catch(err) {
    dispatch({
      type: LESSON_ERROR,
      payload: ({ msg: err.response.statusText, status: err.response.status })
    })
  }
}

export const addComplete = id => async dispatch => {
  try {
    const res = await axios.put(`/api/lessons/complete/${id}`);
    dispatch({
      type: UPDATE_COMPLETES,
      payload: { id, completes: res.data }
    });
    dispatch(
      getLesson(id)
    )
    dispatch(
      setAlert('Lesson completed!', 'success')
    )
  } catch(err) {
    dispatch({
      type: LESSON_ERROR,
      payload: ({ msg: err.response.statusText, status: err.response.status })
    })
  }
}

export const removeComplete = id => async dispatch => {
  try {
    const res = await axios.put(`/api/lessons/uncomplete/${id}`);
    dispatch({
      type: UPDATE_COMPLETES,
      payload: { id, completes: res.data }
    })
    dispatch(
      getLesson(id)
    )
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

export const uploadVideo = videoData => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const res = await axios.post('/api/lessons/videos', videoData, config);

    dispatch({
      type: UPLOAD_VIDEO,
      payload: res.data
    });
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

export const addComment = (id, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post(`/api/lessons/comment/${id}`, formData, config);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(
      getLesson(id)
    );
  } catch(err) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    });
  }
};

export const deleteComment = (lessonId, commentId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/lessons/comment/${lessonId}/${commentId}`)

    dispatch({
      type: DELETE_COMMENT,
      payload: res.data
    });
    dispatch(
      getLesson(lessonId)
    );
  } catch(err) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}

export const deleteLesson = id => async dispatch => {
  const res = await axios.delete(`/api/lessons/${id}`)

    dispatch({
      type: DELETE_LESSON,
      payload: id
    });
    dispatch(setAlert('Lesson deleted', 'success'))
}
