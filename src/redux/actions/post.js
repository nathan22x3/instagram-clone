import firebase from 'firebase';
import { FETCH_POSTS } from '../constants';
import { getUserFollowings } from '../actions/user';

export const fetchPosts = () => async (dispatch, getState) => {
  await dispatch(getUserFollowings());
  const { followings } = await getState().user;

  const list = [];

  await followings.forEach((userId) => {
    firebase
      .firestore()
      .collection('posts')
      .doc(userId)
      .collection('userPosts')
      .get()
      .then((snapshot) => {
        const posts = snapshot.docs.map((post) => {
          const id = post.id;
          const data = post.data();
          return { id, ...data };
        });
        list.push(...posts);
      });
  }, []);

  await dispatch({ type: FETCH_POSTS, list });
};
