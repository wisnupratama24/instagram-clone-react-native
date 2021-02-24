import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ErrorMessage } from "..";
import { color } from "../../constants/color";

const Input = ({ isValid, errorMessage, ...props }) => {
  return (
    <>
      <TextInput
        style={[styles.textInput, isValid ? styles.textInputError : null]}
        {...props}
      />
      {isValid ? <ErrorMessage message={errorMessage} /> : null}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
  },
  textInputError: {
    borderColor: color.red[600],
  },
});
