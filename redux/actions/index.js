import firebase from "firebase";
import {
  GET_ALBUM_LIST,
  SET_ALBUM_NAME,
  USER_STATE_CHANGE,
  SET_MEDIA_LIST,
} from "../../constants/types";

import { useSelector } from "react-redux";

export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("does not exist");
        }
      });
  };
}

export const getAllAlbumNames = (albums) => {
  return (dispatch) => {
    const listOfAlbums = albums.map((album) => album.title);
    dispatch({ type: GET_ALBUM_LIST, albumList: listOfAlbums });
  };
};

export const setAlbumName = (album) => {
  return (dispatch) => {
    dispatch({ type: SET_ALBUM_NAME, albumName: album });
  };
};

export const mediaList = (albumList) => {
  return (dispatch) => {
    const setAlbumList = [];
    albumList.forEach((photos) => {
      setAlbumList.push({
        id: photos.id,
        uri: photos.uri,
      });
    });

    dispatch({
      type: SET_MEDIA_LIST,
      selectedImage: setAlbumList[0]?.uri,
      media: setAlbumList,
    });
  };
};
