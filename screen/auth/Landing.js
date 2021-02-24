import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { globalStyles } from "../../assets";
import { RegisterScreenName } from "../../constants/routes";

const Landing = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <Text>Landing Page</Text>
      <Button
        title='Go to'
        onPress={() => navigation.navigate(RegisterScreenName)}
      />
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({});
