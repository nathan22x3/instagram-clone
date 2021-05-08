import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThemeContext } from '../../contexts/ThemeContext';
import { logout } from '../../redux/actions/auth';
import Button from '../custom/Button';

const ProfileBody = ({ postsCount, followingsCount, logout }) => {
  const { t } = useTranslation('common');
  const theme = useContext(ThemeContext);

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
            <Text style={[styles.counter, { color: theme.label }]}>
              {postsCount || 0}
            </Text>
            <Text style={{ color: theme.label }}>{t('posts')}</Text>
          </View>
          <View style={styles.postsAndFollowsItem}>
            <Text style={[styles.counter, { color: theme.label }]}>0</Text>
            <Text style={{ color: theme.label }}>{t('followers')}</Text>
          </View>
          <View style={styles.postsAndFollowsItem}>
            <Text style={[styles.counter, { color: theme.label }]}>
              {followingsCount || 0}
            </Text>
            <Text style={{ color: theme.label }}>{t('following')}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.name, { color: theme.label }]}>Nam Nguyễn</Text>
        <Text style={[styles.bio, { color: theme.label }]}>Grrr...</Text>
      </View>
      <Button
        style={[
          styles.editProfileButton,
          { borderColor: theme.secondaryLabel },
        ]}
        backgroundColor={'transparent'}
      >
        {t('editProfile')}
      </Button>
      <TouchableOpacity onPress={logout}>
        <Text style={{ color: theme.label }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = ({ user }) => ({
  postsCount: user.postsCount,
  followingsCount: user.followingsCount,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBody);

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
  editProfileButton: {
    height: 'auto',
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
  },
});
