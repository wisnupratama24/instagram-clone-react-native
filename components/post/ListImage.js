import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Media from "../../helpers/Image";
import { mediaList } from "../../redux/actions";

const ListImage = ({ source }) => {
  const mediaState = useSelector(({ addState }) => addState.media);
  const [listPhoto, setListPhoto] = useState(null);
  const albumName = useSelector(({ addState }) => addState.albumName);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getSelectedImage() {
      const getPhotosFromAlbum = await Media.getPhotosFromAlbum(`${albumName}`);
      const photo = await Media.photo(getPhotosFromAlbum);
      dispatch(mediaList(photo.assets));
    }
    getSelectedImage();
  }, [albumName]);

  const listEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.empty}> Not found file in here </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={mediaState}
        ListEmptyComponent={listEmpty}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={4}
      />
    </View>
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
    justifyContent: "center",
    flex: 1,
  },
  emptyContainer: {
    marginVertical: 10,
  },
  empty: {
    textAlign: "center",
  },
});
