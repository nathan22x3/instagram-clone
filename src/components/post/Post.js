import React, { useContext } from 'react';
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
import PostComment from './PostComment';
import PostHeader from './PostHeader';
import moment from 'moment';
import i18n from 'i18next';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Post = ({
  username,
  userAvatar,
  likeCount,
  caption,
  downloadURL,
  createAt,
}) => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  const time = moment(createAt?.toDate());
  time.locale(i18n.language);

  return (
    <View style={styles.container}>
      <PostHeader
        userInfo={{
          avatarUri: 'https://i.ibb.co/qdzxPjf/user-2.jpg',
          username,
        }}
      />
      <TouchableOpacity
        style={styles.image}
        onPress={() =>
          navigation.navigate('PostDetail', {
            post: {
              username,
              userAvatar,
              likeCount,
              caption,
              downloadURL,
              createAt,
            },
          })
        }
        activeOpacity={0.9}
      >
        <Image
          style={{ flex: 1 }}
          source={{ uri: downloadURL }}
          resizeMethod='resize'
        />
      </TouchableOpacity>

      <PostAction />
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
        <PostComment
          avatarUri={'https://i.ibb.co/qdzxPjf/user-2.jpg'}
          // username={'pe_chang'}
          // content={'xink dạ ♥'}
        />
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
  time: {
    fontSize: 10,
    marginTop: 6,
  },
});
