import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { color } from "../../constants/color";

function Button({ validForm, label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        validForm ? styles.buttonValid : styles.buttonNotValid,
      ]}>
      <Text style={styles.textButton}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textButton: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  buttonValid: {
    backgroundColor: color.primary,
  },
  buttonNotValid: {
    backgroundColor: color.blue[300],
  },
  button: {
    backgroundColor: "red",
    width: "100%",
    marginTop: 15,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});

export default Button;
