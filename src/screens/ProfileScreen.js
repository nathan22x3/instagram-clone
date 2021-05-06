import React, { useCallback, useState } from 'react';
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
import { fetchUserPosts } from '../redux/actions/user';
import { wait } from '../utils';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;

const ProfileScreen = ({ posts, fetchUserPosts }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      fetchUserPosts();
      setRefreshing(false);
    });
  }, []);

  const formatData = (data, numColumns = NUM_COLUMNS) => {
    const numberOfFullRow = Math.floor(data.length / numColumns);
    let numberOfElementLastRow = data.length - numberOfFullRow * numColumns;
    while (
      numberOfElementLastRow !== numColumns &&
      numberOfElementLastRow !== 0
    ) {
      data.push({ id: Math.random().toString(36), hidden: true });
      numberOfElementLastRow++;
    }

    return data;
  };

  return (
    <>
      <ProfileHeader />
      <FlatList
        style={styles.grid}
        ListHeaderComponent={ProfileUserInfo}
        data={formatData(posts)}
        keyExtraction={(item) => item.id}
        refreshControl={
          <RefreshControl {...{ refreshing }} {...{ onRefresh }} />
        }
        renderItem={({ item }) => {
          if (item.hidden) {
            return <View style={[styles.item, styles.itemInvisible]} />;
          }

          return (
            <View style={styles.item}>
              <Image
                style={styles.itemImage}
                source={{ uri: item.downloadURL }}
              />
            </View>
          );
        }}
        numColumns={3}
      />
    </>
  );
};

const mapStateToProps = ({ user }) => ({
  posts: user.posts,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUserPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  grid: {
    paddingBottom: 10,
    height: 'auto',
  },
  item: {
    height: width / NUM_COLUMNS,
    flex: 1,
    aspectRatio: 1,
    margin: 1.5,
  },
  itemImage: {
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
