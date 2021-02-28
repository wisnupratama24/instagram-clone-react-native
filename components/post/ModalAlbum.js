import React, { useEffect, useRef } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Modalize } from "react-native-modalize";

import { useSelector, useDispatch } from "react-redux";
import Constants from "expo-constants";

import Media from "../../helpers/Image";
import { getAllAlbumNames, setAlbumName } from "../../redux/actions";

const ModalAlbum = ({ cameraHandle }) => {
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
      <View style={styles.container}>
        <TouchableOpacity onPress={onOpen} style={styles.touchable}>
          <Text style={styles.albumName}>{albumName} </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialCommunityIcons name='camera' color='black' size={26} />
        </TouchableOpacity>
      </View>
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

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingVertical: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  albumName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
