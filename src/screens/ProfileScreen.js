import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileUserInfo from '../components/profile/ProfileUserInfo';
import { ThemeContext } from '../contexts/ThemeContext';
import { getUserPosts } from '../redux/actions/user';
import { wait } from '../utils';
import FastImage from 'react-native-fast-image';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;
const HEIGHT = width / NUM_COLUMNS;

const ProfileScreen = ({ posts, getUserPosts }) => {
  const theme = useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUserPosts();
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.item}>
        <Image style={styles.itemImage} source={{ uri: item.downloadURL }} />
      </View>
    ),
    []
  );

  const keyExtraction = useCallback((item) => item.id, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getUserPosts();
      setRefreshing(false);
    });
  }, []);

  return (
    <>
      <ProfileHeader posts={posts.length} />
      <FlatList
        style={styles.grid}
        data={posts}
        {...{ keyExtraction }}
        {...{ renderItem }}
        numColumns={3}
        ListHeaderComponent={ProfileUserInfo}
        refreshControl={
          <RefreshControl
            {...{ refreshing }}
            {...{ onRefresh }}
            colors={[theme.blue]}
            progressBackgroundColor={theme.grey}
          />
        }
      />
    </>
  );
};

const mapStateToProps = ({ user }) => ({
  posts: user.posts,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getUserPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  grid: {
    paddingBottom: 10,
    height: 'auto',
  },
  item: {
    flex: 1 / 3,
    height: HEIGHT,
    margin: 1.5,
  },
  itemImage: {
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
