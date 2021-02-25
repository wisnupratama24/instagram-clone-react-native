import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { color } from "../constants/color";

function ErrorMessage({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textMessage}>{message}</Text>
    </View>
  );
}

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingHorizontal: 2,
    width: "100%",
    textAlign: "left",
  },
  textMessage: {
    justifyContent: "flex-start",
    color: color.red[600],
    fontSize: 12,
  },
});
