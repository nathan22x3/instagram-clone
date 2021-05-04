import { SET_CURRENT_USER, GET_USER_POSTS } from '../constants';

const initialState = {
  currentUser: null,
  posts: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };

    case GET_USER_POSTS:
      return {
        ...state,
        posts: action.posts,
      };

    default:
      return state;
  }
};
