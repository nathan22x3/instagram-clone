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

const FeedItemComment = ({ avatarUri, username, content }) => {
  const { t } = useTranslation('common');
  const theme = useContext(ThemeContext);

  return (
    <>
      <View style={styles.comment}>
        <Text style={[styles.boldLabel, { color: theme.label }]}>
          {username}{' '}
        </Text>
        <View>
          <Text style={{ color: theme.label, fontSize: 15 }} numberOfLines={1}>
            {content}
          </Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.addComment}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
          <TextInput
            style={{ color: theme.label, fontSize: 15 }}
            placeholder={t('addComment')}
            placeholderTextColor={theme.secondaryLabel}
          />
        </View>
      </TouchableOpacity>
      <Text style={[styles.time, { color: theme.secondaryLabel }]}>
        6 days ago
      </Text>
    </>
  );
};

export default FeedItemComment;

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
  time: {
    fontSize: 10,
    marginTop: 6,
  },
});
