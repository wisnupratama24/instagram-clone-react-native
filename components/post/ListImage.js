import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ModalAlbum from "./ModalAlbum";

import Media from "../../helpers/Image";
import { mediaList } from "../../redux/actions";

const ListImage = ({ source }) => {
  const mediaState = useSelector(({ addState }) => addState.media);
  const [listPhoto, setListPhoto] = useState(null);
  const albumName = useSelector(({ addState }) => addState.albumName);
  const selectedImage = useSelector(({ addState }) => addState.selectedImage);
  const [imageSelected, setImageSelected] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getSelectedImage() {
      const getPhotosFromAlbum = await Media.getPhotosFromAlbum(`${albumName}`);
      const photo = await Media.photo(getPhotosFromAlbum);
      dispatch(mediaList(photo.assets));
    }
    getSelectedImage();
  }, [albumName]);

  const listEmpty = (msg) => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.empty}> {msg} </Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => setImageSelected(item?.uri)}>
          {console.log(item.uri === imageSelected)}
          <Image source={{ uri: item.uri }} style={styles.image} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        {imageSelected ||
          (selectedImage && (
            <Image
              source={{ uri: imageSelected ?? selectedImage }}
              style={{ width: "100%", height: "100%" }}
            />
          ))}
      </View>
      <ModalAlbum />
      {mediaState.length > 0 ? (
        <>
          <View style={{ flex: 1 }}>
            <FlatList
              getItemLayout={(data, index) => ({
                length: 100,
                offset: 100 * index,
                index,
              })}
              removeClippedSubviews={true}
              data={mediaState}
              ListEmptyComponent={listEmpty("No file in here")}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={4}
              initialNumToRender={2}
            />
          </View>
        </>
      ) : (
        listEmpty("There are no photos in this folder")
      )}
    </>
  );
};

export default ListImage;

const styles = StyleSheet.create({
  imageContainer: {
    margin: 5,
  },
  image: {
    width: 92,
    height: 92,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  empty: {
    textAlign: "center",
  },
});
