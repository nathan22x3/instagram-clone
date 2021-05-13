import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

const CommentScreen = ({ uid, postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('posts')
      .doc(uid)
      .collection('userPosts')
      .doc(postId)
      .collection('comments')
      .get()
      .then((snapshot) => {
        const comments = snapshot.docs.map((item) => {
          const id = item.id;
          const data = item.data();
          return { id, ...data };
        });

        setComments(comments);
      });
  }, []);

  return (
    <View>
      {comments.map((comment) => (
        <Text>{comment.content}</Text>
      ))}
    </View>
  );
};

export default CommentScreen;
