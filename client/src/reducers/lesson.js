import { GET_LESSONS, GET_LESSON, LESSON_ERROR, UPDATE_LIKES, UPDATE_COMPLETES, ADD_COMMENT, DELETE_COMMENT, UPLOAD_VIDEO, DELETE_LESSON } from '../actions/types';

const initialState = {
  lessons: [],
  lesson: null,
  loading: true,
  video: null,
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
    case UPDATE_COMPLETES:
      return {
        ...state,
        completes: state.lessons.map(lesson => lesson._id === payload.id ? { ...lesson, completes: payload.completes } : lesson),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        lesson: { ...state.lesson, comments: payload },
        loading: false
      };
    case DELETE_COMMENT:
     return {
       ...state,
       lesson: { ...state.lesson, comments: state.lesson.comments.filter(comment => comment._id !== payload) }
     };
     case UPLOAD_VIDEO:
      return {
        ...state,
        video: payload
      };
    case DELETE_LESSON:
      return {
        ...state,
        lessons: state.lessons.filter(lesson => lesson._id !== payload)
      }
    default:
      return state;
  }
};
