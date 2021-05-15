import firebase from 'firebase';
import {
  FETCH_USER_POSTS,
  GET_USER_FOLLOWINGS,
  SET_CURRENT_USER,
  SET_USER_CREDENTIALS,
  SET_USER_FOLLOWINGS,
} from '../constants';

export const setUserCredentials = (user) => (dispatch) => {
  dispatch({ type: SET_USER_CREDENTIALS, userCredentials: user });
};

export const getUserInfo = () => (dispatch) => {
  firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshopt) => {
      dispatch({ type: SET_CURRENT_USER, currentUser: snapshopt.data() });
    });
};

export const fetchUserPosts = () => (dispatch) => {
  firebase
    .firestore()
    .collection('posts')
    .doc(firebase.auth().currentUser.uid)
    .collection('userPosts')
    .orderBy('createdAt', 'desc')
    .get()
    .then((snapshot) => {
      const posts = snapshot.docs.map((post) => {
        const id = post.id;
        const data = post.data();
        return { id, ...data };
      });

      dispatch({ type: FETCH_USER_POSTS, posts });
    });
};

export const getUserFollowings = () => (dispatch) => {
  firebase
    .firestore()
    .collection('followings')
    .doc(firebase.auth().currentUser.uid)
    .collection('userFollowings')
    .get()
    .then((snapshot) => {
      const followings = snapshot.docs.map((post) => {
        const id = post.id;
        return id;
      });

      dispatch({ type: GET_USER_FOLLOWINGS, followings });
    });
};

export const followingUser = (uid) => (dispatch) => {
  firebase
    .firestore()
    .collection('followings')
    .doc(firebase.auth().currentUser.uid)
    .collection('userFollowings')
    .doc(uid)
    .set({})
    .then(() =>
      dispatch({ type: SET_USER_FOLLOWINGS, uid, isFollowing: false })
    );
};

export const unfollowingUser = (uid) => (dispatch) => {
  firebase
    .firestore()
    .collection('followings')
    .doc(firebase.auth().currentUser.uid)
    .collection('userFollowings')
    .doc(uid)
    .delete()
    .then(() =>
      dispatch({ type: SET_USER_FOLLOWINGS, uid, isFollowing: true })
    );
};
