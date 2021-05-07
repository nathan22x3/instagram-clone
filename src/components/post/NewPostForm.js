import { CommonActions, useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../contexts/ThemeContext';
import TextInput from '../custom/TextInput';

const NewPostForm = ({ route, navigation }) => {
  const { t } = useTranslation('common');
  const theme = useContext(ThemeContext);
  const tabNavigation = useNavigation();
  const { tempImage } = route.params;
  const [caption, setCaption] = useState('');

  const handleAddNewPost = async () => {
    const res = await fetch(tempImage);
    const blob = await res.blob();

    const childPath = `posts/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`Transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref
        .getDownloadURL()
        .then((image) => {
          firebase
            .firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection('userPosts')
            .add({
              downloadURL: image,
              caption,
              createAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
        })
        .then(() => {
          navigation.dispatch(
            CommonActions.reset({ index: 0, routes: [{ name: 'Camera' }] })
          );
          tabNavigation.navigate('Home');
        })
        .catch(console.error);
    };

    task.on('state_changed', taskProgress, console.error, taskCompleted);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name={'arrowleft'} color={theme.label} size={27} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.label }]}>
            {t('newPost')}
          </Text>
        </View>
        <TouchableOpacity onPress={handleAddNewPost}>
          <Ionicons name={'checkmark'} color={theme.blue} size={36} />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Image source={{ uri: tempImage }} style={styles.image} />
        <TextInput
          style={styles.caption}
          placeholder={t('writeCaption')}
          multiline={true}
          onChangeText={(value) => setCaption(value)}
        />
      </View>
    </View>
  );
};

export default NewPostForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Roboto_500Medium',
    marginLeft: 36,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    aspectRatio: 1,
  },
  caption: {
    flex: 1,
    height: 'auto',
    marginBottom: 0,
    backgroundColor: 'transparent',
    fontSize: 15,
  },
});
