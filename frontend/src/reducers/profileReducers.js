import { GET_PROFILE, GET_CURRENT_PROFILE, CLEAR_CURRENT_PROFILE } from '../actions/types';

const initialState = {
  profile: null,
  currentProfile: null
};

export default function profileReducers(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: action.payload
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: null
      };
    default:
      return state;
  }
}

