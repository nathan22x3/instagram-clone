import React, { useCallback } from 'react';
import HomeHeader from '../components/home/HomeHeader';
import { FlatList } from 'react-native';
import Story from '../components/story/Story';
import Post from '../components/post/Post';

const data = [
  {
    id: 0,
    username: 'cyberbot_66',
    avatarUri: 'https://i.ibb.co/qdzxPjf/user-2.jpg',
  },
  {
    id: 1,
    username: 'pe_chang',
    avatarUri: 'https://i.ibb.co/W2QrMxg/user-1.jpg',
  },
];

const HomeScreen = () => {
  const renderItem = useCallback(({ item }) => <Post {...item} />, []);
  const keyExtractor = useCallback((item) => `${item.id}`, []);

  return (
    <>
      <HomeHeader />
      <FlatList
        ListHeaderComponent={Story}
        data={data}
        {...{ renderItem }}
        {...{ keyExtractor }}
      />
    </>
  );
};

export default HomeScreen;
