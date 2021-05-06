import React from 'react';
import { Pagination } from 'react-native-snap-carousel';

const FeedItemPagination = ({
  dotsLength,
  activeDotIndex,
  activeDotColor,
  inactiveDotColor,
}) => {
  return (
    <Pagination
      {...{ dotsLength }}
      {...{ activeDotIndex }}
      dotStyle={{
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: activeDotColor,
      }}
      inactiveDotStyle={{ backgroundColor: inactiveDotColor }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
      containerStyle={{ flex: 1 }}
    />
  );
};

export default FeedItemPagination;
