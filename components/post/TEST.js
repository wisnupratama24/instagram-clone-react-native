import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Image, Button } from "react-native";
import { Camera } from "expo-camera";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

import { color } from "../../constants/color";
import { FormButton } from "../../components";
import Media, { getAlbumList, getPhotosFromAlbum } from "../../helpers/Image";

export default function Add() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function getListAlbum() {
      const getAlbumList = await Media.getAlbumList();
    }
    getListAlbum();
  }, []);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");

      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === null) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync(null);
      setImage(photo.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("result", result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <FormButton
        validForm={true}
        label='Flip camera'
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />

      <FormButton
        validForm={true}
        label='Take a Picture'
        onPress={takePicture}
      />

      <Button title='Pick an image from camera roll' onPress={pickImage} />

      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
});
