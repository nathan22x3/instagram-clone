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
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const Post = ({ navigation, route }) => {
  const { t } = useTranslation('common');
  const theme = useContext(ThemeContext);
  const { avatarUri, username, likeCount, caption, image, createAt } =
    route.params.post;

  const time = moment(createAt?.toDate());
  time.locale(i18n.language);

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
        <PostComment avatarUri={'https://i.ibb.co/qdzxPjf/user-2.jpg'} />
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
  time: {
    fontSize: 10,
    marginTop: 6,
  },
});
