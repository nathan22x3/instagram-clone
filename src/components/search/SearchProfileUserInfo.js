import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThemeContext } from '../../contexts/ThemeContext';
import { followingUser, unfollowingUser } from '../../redux/actions/user';
import Button from '../custom/Button';

const SearchProfileUserInfo = ({
  userInfo,
  followings,
  followingUser,
  unfollowingUser,
}) => {
  const { t } = useTranslation('common');
  const theme = useContext(ThemeContext);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (followings.find((userId) => userId === userInfo.id))
      setIsFollowing(true);
  }, []);

  console.log(followings);

  const handleFollowing = () => {
    followingUser(userInfo.id);
    setIsFollowing(true);
  };

  const handleUnfollowing = () => {
    unfollowingUser(userInfo.id);
    setIsFollowing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image
          source={{
            uri: 'https://i.ibb.co/qdzxPjf/user-2.jpg',
          }}
          style={[styles.avatar, { borderColor: theme.label }]}
        />
        <View style={styles.postsAndFollows}>
          <View style={styles.postsAndFollowsItem}>
            <Text style={[styles.counter, { color: theme.label }]}>0</Text>
            <Text style={{ color: theme.label }}>{t('posts')}</Text>
          </View>
          <View style={styles.postsAndFollowsItem}>
            <Text style={[styles.counter, { color: theme.label }]}>0</Text>
            <Text style={{ color: theme.label }}>{t('followers')}</Text>
          </View>
          <View style={styles.postsAndFollowsItem}>
            <Text style={[styles.counter, { color: theme.label }]}>0</Text>
            <Text style={{ color: theme.label }}>{t('following')}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.name, { color: theme.label }]}>Nam Nguyễn</Text>
        <Text style={[styles.bio, { color: theme.label }]}>Grrr...</Text>
      </View>
      <View style={styles.actions}>
        {isFollowing ? (
          <Button
            style={[styles.button, { borderColor: theme.secondaryLabel }]}
            backgroundColor={'transparent'}
            onPress={handleUnfollowing}
          >
            {t('following')}
          </Button>
        ) : (
          <Button
            style={[styles.button]}
            backgroundColor={theme.blue}
            onPress={handleFollowing}
          >
            {t('follow')}
          </Button>
        )}
        <Button
          style={[
            styles.button,
            styles.lastButton,
            { borderColor: theme.secondaryLabel },
          ]}
          backgroundColor={'transparent'}
        >
          {t('message')}
        </Button>
      </View>
    </View>
  );
};

const mapStateToProps = ({ user }) => ({
  followings: user.followings,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ followingUser, unfollowingUser }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchProfileUserInfo);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 94,
    height: 94,
    borderRadius: 47,
    marginRight: 20,
  },
  postsAndFollows: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postsAndFollowsItem: {
    alignItems: 'center',
  },
  counter: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  bio: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    height: 'auto',
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    marginRight: 5,
  },
  lastButton: {
    marginRight: 0,
  },
});
