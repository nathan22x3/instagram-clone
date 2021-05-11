import { FETCH_POSTS } from '../constants';

const initialState = {
  list: [],
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        list: action.list,
      };

    default:
      return state;
  }
};
