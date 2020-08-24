import { GET_SETTINGS, GET_SETTING, UPDATE_SETTINGS, SETTINGS_ERROR } from '../actions/types';

const initialState = {
  settings: [],
  setting: null,
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
    case GET_SETTING:
      return {
        ...state,
        setting: payload,
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
