import React, { useEffect } from "react";
import { ListImage } from "../../components";

import { View } from "react-native";
import Media from "../../helpers/Image";

export default function Add() {
  useEffect(() => {
    async function cameraPermission() {
      return await Media.askCameraRollPermission();
    }
    cameraPermission();
  }, []);

  return (
    <>
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <ListImage />
      </View>
    </>
  );
}
