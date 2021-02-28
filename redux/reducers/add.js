import {
  GET_ALBUM_LIST,
  SET_ALBUM_NAME,
  SET_MEDIA_LIST,
} from "../../constants/types";

const initialState = {
  media: {},
  selectedImage: "",
  albumName: "Camera",
  albumList: [],
};

export const addReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALBUM_LIST:
      return {
        ...state,
        albumList: action.albumList,
      };
    case SET_ALBUM_NAME:
      return {
        ...state,
        albumName: action.albumName,
      };
    case SET_MEDIA_LIST:
      return {
        ...state,
        selectedImage: action.selectedImage,
        media: action.media,
      };
    default:
      return state;
  }
};
