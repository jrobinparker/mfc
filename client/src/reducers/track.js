import { GET_TRACKS, GET_TRACK, TRACK_ERROR, DISPLAY_TRACK_LESSONS, DELETE_TRACK, UPDATE_TRACK_COMPLETES } from '../actions/types';

const initialState = {
  tracks: [],
  track: null,
  trackLessons: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {

  const { type, payload } = action;

  switch(type) {
    case GET_TRACKS:
      return {
        ...state,
        tracks: payload,
        loading: false
      };
    case GET_TRACK:
      return {
        ...state,
        track: payload,
        loading: false
      };
  case DISPLAY_TRACK_LESSONS:
    return {
      ...state,
      trackLessons: action.payload,
      loading: false
    };
    case DELETE_TRACK:
      return {
        ...state,
        tracks: state.tracks.filter(track => track._id !== payload)
      };
    case UPDATE_TRACK_COMPLETES:
      return {
        ...state,
        completes: state.tracks.map(track => track._id === payload.id ? { ...track, completes: payload.completes } : track),
        loading: false
      };
    default:
      return state;
  }
};
