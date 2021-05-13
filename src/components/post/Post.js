import { useNavigation } from '@react-navigation/native';
import i18n from 'i18next';
import moment from 'moment';
import React, { useContext } from 'react';
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

const { width } = Dimensions.get('window');

const Post = (props) => {
  const {
    id,
    uid,
    username,
    userAvatar,
    likeCount,
    caption,
    image,
    createdAt,
  } = props;
  const { t } = useTranslation('common');
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  const time = moment(createdAt?.toDate());
  time.locale(i18n.language);

  const handleNavigateToComment = () =>
    navigation.navigate('Comments', {
      uid,
      postId: id,
      avatar: 'https://i.ibb.co/qdzxPjf/user-2.jpg',
      username,
      caption,
      createdAt,
    });

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
      <PostAction {...{ handleNavigateToComment }} />
      <View style={styles.feedInfo}>
        <Text style={[styles.boldLabel, { color: theme.label }]}>
          {likeCount || 0} like
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
        <Text style={[styles.time, { color: theme.secondaryLabel }]}>
          {time.fromNow()}
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
  time: {
    fontSize: 10,
    marginTop: 6,
  },
});
