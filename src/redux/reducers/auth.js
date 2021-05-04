import { SET_AUTH_ERRORS } from '../constants';

const initialState = {
  errors: null,
};

export const authReducer = async (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.errors,
        },
      };

    default:
      return state;
  }
};
