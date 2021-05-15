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
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ThemeContext } from '../../contexts/ThemeContext';
import PostAction from './PostAction';
import PostHeader from './PostHeader';
import firebase from 'firebase';

const { width } = Dimensions.get('window');

const Post = ({ navigation, route }) => {
  const { t } = useTranslation('common');
  const theme = useContext(ThemeContext);
  const { id, uid, username, userAvatar, caption, image, createdAt } =
    route.params.post;

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  dayjs.locale(i18next.languages[0]);
  dayjs.extend(require('dayjs/plugin/relativeTime'));
  const time = dayjs().to(dayjs(createdAt?.toDate()));

  const handleNavigateToComment = () =>
    navigation.push('Comments', {
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name={'arrowleft'} color={theme.label} size={27} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.label }]}>
          {t('post')}
        </Text>
      </View>
      <PostHeader
        userInfo={{
          avatarUri: 'https://i.ibb.co/qdzxPjf/user-2.jpg',
          username,
        }}
      />
      <Image
        source={{ uri: image }}
        style={{ width, height: width }}
        resizeMethod='resize'
      />
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
          {time}
        </Text>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Roboto_500Medium',
    marginLeft: 36,
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
  createAt: {
    fontSize: 10,
    marginTop: 6,
  },
});
