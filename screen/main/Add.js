import React, { useEffect } from "react";
import { ListImage, ModalAlbum } from "../../components";

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
      <ListImage />
      <ModalAlbum />
    </>
  );
}
