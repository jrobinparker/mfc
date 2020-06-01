import { GET_LESSONS, LESSON_ERROR } from '../actions/types';

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
      }
    case LESSON_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};
