import { GET_SETTINGS, UPDATE_SETTINGS, } from '../actions/types';

const initialState = {
  settings: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {

  const { type, payload } = action;

  switch(type) {
    case GET_SETTINGS:
      return {
        ...state,
        settings: payload,
        loading: false
      };
    case SETTINGS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};
