import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";

import { useSelector, useDispatch } from "react-redux";
import Constants from "expo-constants";

import Media from "../../helpers/Image";
import { getAllAlbumNames, setAlbumName } from "../../redux/actions";

const ModalAlbum = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const listAlbum = useSelector(({ addState }) => addState.albumList);
  const albumName = useSelector(({ addState }) => addState.albumName);

  useEffect(() => {
    async function getListAlbums() {
      const album = await Media.getAlbumList();
      dispatch(getAllAlbumNames(album));
    }
    getListAlbums();
  }, [dispatch]);

  const modalizeRef = useRef(Modalize);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  return (
    <>
      <TouchableOpacity onPress={onOpen}>
        <Text>{albumName}</Text>
      </TouchableOpacity>

      <Modalize
        ref={modalizeRef}
        modalStyle={{
          flex: 1,
          marginTop: Constants.statusBarHeight,
        }}>
        <View style={{ marginHorizontal: 20, paddingVertical: 20 }}>
          {listAlbum.length > 0 ? (
            listAlbum.map((title, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  dispatch(setAlbumName(title));
                  onClose();
                }}>
                <Text
                  style={{
                    lineHeight: 24,
                    paddingVertical: 3,
                  }}>
                  {title}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text> No album here </Text>
          )}
        </View>
      </Modalize>
    </>
  );
};

export default ModalAlbum;
