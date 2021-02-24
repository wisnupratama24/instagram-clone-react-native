import React from "react";
import { StyleSheet, Text, View } from "react-native";

const loading = () => {
  return (
    <View style={styles.container}>
      <Text>Loading ... </Text>
    </View>
  );
};

export default loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
