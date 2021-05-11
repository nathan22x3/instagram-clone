import {
  FETCH_USER_POSTS,
  GET_USER_FOLLOWINGS,
  SET_CURRENT_USER,
  SET_USER_CREDENTIALS,
  SET_USER_FOLLOWINGS,
} from '../constants';

const initialState = {
  userCredential: null,
  currentUser: null,
  posts: [],
  postsCount: 0,
  followings: [],
  followingsCount: 0,
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

    case FETCH_USER_POSTS:
      return {
        ...state,
        posts: action.posts,
        postsCount: action.posts.length,
      };

    case GET_USER_FOLLOWINGS:
      return {
        ...state,
        followings: action.followings,
        followingsCount: action.followings.length,
      };

    case SET_USER_FOLLOWINGS:
      const newState = {
        followings: [],
        followingsCount: 0,
      };

      if (!action.isFollowing) {
        newState.followings = [...state.followings, action.userId];
        newState.followingsCount = state.followingsCount + 1;
      } else {
        newState.followings = [...state.followings].filter(
          (userId) => userId !== action.userId
        );
        newState.followingsCount = state.followingsCount - 1;
      }

      return {
        ...state,
        ...newState,
      };

    default:
      return state;
  }
};
