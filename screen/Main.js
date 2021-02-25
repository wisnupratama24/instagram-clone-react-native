import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../assets";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";

import { LoadingScreen } from "./index";

const Main = ({ currentUser, fetchUser }) => {
  useEffect(() => {
    fetchUser();
  }, [currentUser.name, currentUser.email]);

  if (currentUser === undefined) {
    return <LoadingScreen />;
  }

  return (
    <View style={globalStyles.container}>
      <Text>USER WELCOME {currentUser.name}</Text>
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);

const styles = StyleSheet.create({});
