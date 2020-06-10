import { GET_TRACKS, GET_TRACK, TRACK_ERROR } from '../actions/types';

const initialState = {
  tracks: [],
  track: null,
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
    default:
      return state;
  }
};
