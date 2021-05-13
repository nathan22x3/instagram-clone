import firebase from 'firebase';
import i18next from 'i18next';
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import CommentItem from '../components/comment/CommentItem';
import Button from '../components/custom/Button';
import TextInput from '../components/custom/TextInput';
import { ThemeContext } from '../contexts/ThemeContext';

const CommentScreen = ({ navigation, route, currentUser }) => {
  const { t } = useTranslation('common');
  const theme = useContext(ThemeContext);
  const { uid, postId, avatar, username, caption, createdAt } = route.params;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const flatList = useRef(null);

  const time = moment(createdAt?.toDate());

  const renderItem = ({ item }) => <CommentItem {...item} />;
  const keyExtractor = (item) => item.id;

  const handleAddComment = () => {
    Keyboard.dismiss();
    setComment('');
    firebase
      .firestore()
      .collection('posts')
      .doc(uid)
      .collection('userPosts')
      .doc(postId)
      .collection('comments')
      .add({
        content: comment,
        username: currentUser.username,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  useEffect(() => {
    time.locale(i18next.languages[0]);
    const unsubscriber = firebase
      .firestore()
      .collection('posts')
      .doc(uid)
      .collection('userPosts')
      .doc(postId)
      .collection('comments')
      .orderBy('createdAt', 'asc')
      .onSnapshot((snapshot) => {
        const comments = snapshot.docs.map((item) => {
          const id = item.id;
          const data = item.data();
          return { id, ...data };
        });

        setComments(comments);
      });

    return () => unsubscriber();
  }, []);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name={'arrowleft'} color={theme.label} size={27} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.label }]}>
          {t('comments')}
        </Text>
      </View>
      <View style={[styles.body, { borderBottomColor: theme.grey }]}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={[styles.caption, { color: theme.label }]}>
            <Text style={styles.username}>{username} </Text>
            {caption}
          </Text>
          <Text style={[styles.time, { color: theme.secondaryLabel }]}>
            {time.fromNow()}
          </Text>
        </View>
      </View>
      <FlatList
        ref={flatList}
        style={styles.comments}
        data={comments}
        {...{ renderItem }}
        {...{ keyExtractor }}
        onContentSizeChange={() =>
          flatList.current.scrollToEnd({ animated: true })
        }
        onLayout={() => flatList.current.scrollToEnd({ animated: true })}
      />
      <View style={[styles.addComment, { backgroundColor: theme.textInput }]}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <TextInput
          style={styles.addCommentInput}
          value={comment}
          placeholder={t('addComment')}
          onChangeText={setComment}
          // autoFocus
          blurOnSubmit
        />
        <Button
          style={styles.postButton}
          backgroundColor='transparent'
          color={theme.blue}
          activeOpacity={0.7}
          disabled={!comment}
          onPress={handleAddComment}
        >
          {t('postComment')}
        </Button>
      </View>
    </>
  );
};

const mapStateToProps = ({ user }) => ({ currentUser: user.currentUser });

export default connect(mapStateToProps, null)(CommentScreen);

const styles = StyleSheet.create({
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
  body: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.75,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 5,
    marginRight: 15,
  },
  info: {
    justifyContent: 'space-between',
  },
  caption: {
    maxWidth: 300,
  },
  username: {
    fontFamily: 'Roboto_700Bold',
  },
  time: {
    marginTop: 5,
    fontSize: 11,
    fontFamily: 'Roboto_700Bold',
  },
  comments: {
    paddingHorizontal: 20,
  },
  addComment: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 3,
  },
  addCommentInput: {
    flex: 1,
    marginBottom: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  postButton: {
    width: 70,
    marginBottom: 0,
    fontFamily: 'Roboto_700Bold',
  },
});
