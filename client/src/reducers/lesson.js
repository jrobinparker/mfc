import { GET_LESSONS, GET_LESSON, LESSON_ERROR, UPDATE_LIKES } from '../actions/types';

const initialState = {
  lessons: [],
  lesson: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {

  const { type, payload } = action;

  switch(type) {
    case GET_LESSONS:
      return {
        ...state,
        lessons: payload,
        loading: false
      };
    case GET_LESSON:
      return {
        ...state,
        lesson: payload,
        loading: false
      };
    case LESSON_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        likes: state.lessons.map(lesson => lesson._id === payload.id ? { ...lesson, likes: payload.likes } : lesson),
        loading: false
      };
    default:
      return state;
  }
};
