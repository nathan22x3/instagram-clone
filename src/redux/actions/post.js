import firebase from 'firebase';
import { FETCH_POSTS } from '../constants';

export const fetchPosts = () => (dispatch) => {
  firebase
    .firestore()
    .collection('followings')
    .doc(firebase.auth().currentUser.uid)
    .collection('userFollowings')
    .onSnapshot((snapshot) => {
      const followings = snapshot.docs.map((post) => {
        const id = post.id;
        return id;
      });

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

      Promise.all(result).then((res) => {
        firebase
          .firestore()
          .collection('posts')
          .doc(firebase.auth().currentUser.uid)
          .collection('userPosts')
          .onSnapshot((snapshot) => {
            const posts = snapshot.docs.map((post) => {
              const id = post.id;
              const data = post.data();
              return { id, ...data };
            });

            const list = [...res.flat(), ...posts].sort((a, b) => {
              return b.createdAt - a.createdAt;
            });

            dispatch({ type: FETCH_POSTS, list });
          });
      });
    });
};
