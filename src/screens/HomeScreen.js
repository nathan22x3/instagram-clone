import React, { useCallback, useContext, useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeHeader from '../components/home/HomeHeader';
import Post from '../components/post/Post';
import Story from '../components/story/Story';
import { ThemeContext } from '../contexts/ThemeContext';
import { fetchPosts } from '../redux/actions/post';
import { fetchUserPosts } from '../redux/actions/user';

const HomeScreen = ({ list, fetchPosts, posts, fetchUserPosts }) => {
  const theme = useContext(ThemeContext);

  const renderItem = useCallback(({ item }) => <Post {...item} />, []);
  const keyExtractor = useCallback((item) => `${item.id}`, []);

  useEffect(() => {
    fetchPosts();
    fetchUserPosts();
  }, []);

  return (
    <>
      <HomeHeader />
      {!list ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator color={theme.blue} size={45} />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={Story}
          data={list}
          {...{ renderItem }}
          {...{ keyExtractor }}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ post, user }) => ({
  list: post.list,
  postd: user.postd,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchPosts, fetchUserPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
