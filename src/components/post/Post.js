import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import i18next from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import PostAction from './PostAction';
import PostHeader from './PostHeader';
import firebase from 'firebase';

const { width } = Dimensions.get('window');

const Post = (props) => {
  const { id, uid, username, userAvatar, caption, image, createdAt } = props;
  const { t } = useTranslation('common');
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  dayjs.locale(i18next.languages[0]);
  dayjs.extend(require('dayjs/plugin/relativeTime'));
  const createAt = dayjs().to(dayjs(createdAt?.toDate()));

  const handleNavigateToComment = () =>
    navigation.navigate('Comments', {
      uid,
      postId: id,
      avatar: 'https://i.ibb.co/qdzxPjf/user-2.jpg',
      username,
      caption,
      createdAt,
    });

  const handleLike = () => {
    firebase
      .firestore()
      .collection('posts')
      .doc(uid)
      .collection('userPosts')
      .doc(id)
      .collection('likes')
      .doc(firebase.auth().currentUser.uid)
      .set({});
  };

  const handleUnlike = () => {
    firebase
      .firestore()
      .collection('posts')
      .doc(uid)
      .collection('userPosts')
      .doc(id)
      .collection('likes')
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection('posts')
      .doc(uid)
      .collection('userPosts')
      .doc(id)
      .collection('likes')
      .onSnapshot((snapshot) => {
        const likes = snapshot.docs.map((item) => item.id);
        setIsLiked(likes.includes(firebase.auth().currentUser.uid));
        setLikeCount(snapshot.docs.length);
      });
  }, []);

  return (
    <View style={styles.container}>
      <PostHeader
        userInfo={{
          avatarUri: 'https://i.ibb.co/qdzxPjf/user-2.jpg',
          username,
        }}
      />
      <View style={styles.image}>
        <Image
          style={{ flex: 1 }}
          source={{ uri: image }}
          resizeMethod='resize'
        />
      </View>
      <PostAction
        {...{ isLiked }}
        {...{ handleLike }}
        {...{ handleUnlike }}
        {...{ handleNavigateToComment }}
      />
      <View style={styles.feedInfo}>
        <Text
          style={[
            styles.boldLabel,
            { color: theme.label, textTransform: 'lowercase' },
          ]}
        >
          {likeCount} {t(likeCount > 1 ? 'likes' : 'like')}
        </Text>
        <View style={styles.caption}>
          <Text style={[styles.boldLabel, { color: theme.label }]}>
            {username || 'test'}{' '}
          </Text>
          <Text style={{ color: theme.label, fontSize: 15 }}>{caption}</Text>
        </View>
        <View style={styles.addComment}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleNavigateToComment}
          >
            <Text style={{ color: theme.secondaryLabel, fontSize: 15 }}>
              {t('showComments')}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.createAt, { color: theme.secondaryLabel }]}>
          {createAt}
        </Text>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  image: {
    width,
    height: width,
  },

  feedInfo: {
    paddingHorizontal: 16,
  },
  caption: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 6,
  },
  boldLabel: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  addComment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  createAt: {
    fontSize: 10,
    marginTop: 6,
  },
});
