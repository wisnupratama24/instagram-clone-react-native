import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { View, TouchableWithoutFeedback, Keyboard } from "react-native";

import { RegisterScreen } from "..";
import { globalStyles } from "../../assets";
import { RegisterScreenName } from "../../constants/routes";

const Landing = () => {
  const Stack = createStackNavigator();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyles.global}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={RegisterScreen}>
            <Stack.Screen
              name={RegisterScreenName}
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Landing;
