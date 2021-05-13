import firebase from 'firebase';
import { FETCH_POSTS } from '../constants';

export const fetchPosts = (followings) => (dispatch) => {
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

      return followings;
    })
    .then((followings) => {
      const result = followings.map(async (uid) => {
        const snapshot = await firebase
          .firestore()
          .collection('posts')
          .doc(uid)
          .collection('userPosts')
          .get();

        const posts = snapshot.docs.map((post) => {
          const id = post.id;
          const data = post.data();
          return { id, ...data };
        });

        return posts;
      });

      Promise.all(result).then((res) =>
        dispatch({ type: FETCH_POSTS, list: res.flat() })
      );
    });
};
