import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ThemeContext } from '../../contexts/ThemeContext';
import PostItemComment from './PostItemComment';
import PostItemHeader from './PostItemHeader';
import PostItemLeftAction from './PostItemLeftAction';
import PostItemPagination from './PostItemPagination';
import PostItemRightAction from './PostItemRightAction';

const { width } = Dimensions.get('window');

const slides = [
  { id: 0, uri: 'https://picsum.photos/1220' },
  { id: 1, uri: 'https://picsum.photos/1080' },
  { id: 2, uri: 'https://picsum.photos/1000' },
];

const FeedItem = ({ avatarUri, username }) => {
  const theme = useContext(ThemeContext);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <View style={styles.container}>
      <PostItemHeader userInfo={{ avatarUri, username }} />
      <Carousel
        data={slides}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={{ width, height: 300 }} />
        )}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <View
        style={[styles.actions, { marginTop: slides.length === 1 ? 16 : 0 }]}
      >
        <PostItemLeftAction color={theme.label} />
        <PostItemPagination
          dotsLength={slides.length}
          activeDotIndex={activeSlide}
          activeDotColor={theme.blue}
          inactiveDotColor={theme.secondaryLabel}
        />
        <PostItemRightAction color={theme.label} />
      </View>
      <View style={styles.feedInfo}>
        <Text style={[styles.boldLabel, { color: theme.label }]}>37 likes</Text>
        <View style={styles.status}>
          <Text style={[styles.boldLabel, { color: theme.label }]}>
            {username}{' '}
          </Text>
          <View>
            <Text style={{ color: theme.link, fontSize: 15 }}>#natural</Text>
          </View>
        </View>
        <PostItemComment
          avatarUri={avatarUri}
          username={'pe_chang'}
          content={'xink dạ ♥'}
        />
      </View>
    </View>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  feedInfo: {
    paddingHorizontal: 16,
  },
  status: {
    flexDirection: 'row',
    marginTop: 2,
  },
  boldLabel: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
