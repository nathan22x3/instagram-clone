import firebase from 'firebase';
import { GET_USER_POSTS, SET_CURRENT_USER } from '../constants';

export const setCurrentUser = (user) => (dispatch) => {
  dispatch({ type: SET_CURRENT_USER, currentUser: user });
};

export const fetchUserPosts = () => async (dispatch) => {
  firebase
    .firestore()
    .collection('posts')
    .doc(firebase.auth().currentUser.uid)
    .collection('userPosts')
    .orderBy('createAt', 'asc')
    .get()
    .then((snapshot) => {
      const posts = snapshot.docs.map((post) => {
        const id = post.id;
        const data = post.data();
        return { id, ...data };
      });

      dispatch({ type: GET_USER_POSTS, posts });
    });
};
