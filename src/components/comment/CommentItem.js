import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import i18next from 'i18next';
import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';

const CommentItem = ({ username, content, createdAt }) => {
  const theme = useContext(ThemeContext);

  dayjs.locale(i18next.languages[0]);
  dayjs.extend(require('dayjs/plugin/relativeTime'));
  const createAt = dayjs().to(dayjs(createdAt?.toDate()));
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://i.ibb.co/qdzxPjf/user-2.jpg',
        }}
        style={styles.avatar}
      />
      <View style={styles.body}>
        <Text style={[styles.content, { color: theme.label }]}>
          <Text style={styles.username}>{username} </Text>
          {content}
        </Text>
        <Text style={[styles.createAt, { color: theme.secondaryLabel }]}>
          {createAt}
        </Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 8,
    marginRight: 15,
  },
  body: {
    justifyContent: 'space-between',
  },
  content: {
    maxWidth: 300,
  },
  username: {
    fontFamily: 'Roboto_700Bold',
  },
  createAt: {
    marginTop: 5,
    fontSize: 11,
    fontFamily: 'Roboto_700Bold',
  },
});
