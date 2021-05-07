import {
  GET_USER_POSTS,
  SET_CURRENT_USER,
  SET_USER_CREDENTIALS,
} from '../constants';

const initialState = {
  userCredential: null,
  currentUser: null,
  posts: [],
  postsCount: 0,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_CREDENTIALS:
      return {
        ...state,
        userCredentials: action.userCredentials,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };

    case GET_USER_POSTS:
      return {
        ...state,
        posts: action.posts,
        postsCount: action.posts.length,
      };

    default:
      return state;
  }
};
