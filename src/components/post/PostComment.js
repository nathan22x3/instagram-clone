import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';

const PostComment = ({ avatarUri, username, content }) => {
  const { t } = useTranslation('common');
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <>
      {content && (
        <View style={styles.comment}>
          <Text style={[styles.boldLabel, { color: theme.label }]}>
            {username}{' '}
          </Text>
          <View>
            <Text
              style={{ color: theme.label, fontSize: 15 }}
              numberOfLines={1}
            >
              {content}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.addComment}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Comments')}
        >
          <Text style={{ color: theme.secondaryLabel, fontSize: 15 }}>
            {t('addComment')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PostComment;

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  boldLabel: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  addComment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
});
