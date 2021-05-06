import { useIsFocused } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/custom/Button';
import { ThemeContext } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

const CameraScreen = ({ navigation }) => {
  const { t } = useTranslation('common');
  const theme = useContext(ThemeContext);
  const isFocused = useIsFocused();
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      const {
        status: galleryStatus,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus === 'granted');
    })();
  }, []);

  const handleTakePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  const handleFlipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }

  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={{ width, height: width }} />
          <Button onPress={() => setImage(null)}>{t('back')}</Button>
          <Button
            onPress={() => navigation.push('NewPostForm', { tempImage: image })}
          >
            {t('continue')}
          </Button>
        </>
      ) : (
        <>
          <View style={styles.cameraContainer}>
            {isFocused && (
              <Camera
                {...{ type }}
                style={styles.camera}
                ref={setCamera}
                ratio={'1:1'}
              />
            )}
          </View>
          <View style={styles.bottomBar}>
            <TouchableOpacity onPress={handlePickImage}>
              <Ionicons name={'md-images'} size={36} color={theme.label} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTakePicture}>
              <View
                style={[
                  styles.captureButtonBorder,
                  { borderColor: theme.label },
                ]}
              >
                <View
                  style={[
                    styles.captureButton,
                    { backgroundColor: theme.label },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFlipCamera}>
              <Ionicons
                name={'md-camera-reverse'}
                size={40}
                color={theme.label}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    width,
    height: width,
  },
  camera: {
    aspectRatio: 3 / 4,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 40,
  },
  captureButtonBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 74,
    height: 74,

    padding: 3,
    borderRadius: 37,
    borderWidth: 4,
  },
  captureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
