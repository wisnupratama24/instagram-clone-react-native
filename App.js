import React from "react";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LandingScreen, LoadingScreen, RegisterScreen } from "./screen";
import { LandingScreenName, RegisterScreenName } from "./constants/routes";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";

export default function App() {
  const Stack = createStackNavigator();

  const [loaded] = useFonts({
    "GrandHotel-Regular": require("./assets/fonts/GrandHotel-Regular.ttf"),
  });

  if (!loaded) {
    return <LoadingScreen />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#F4F5F6",
        }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={LandingScreenName}>
            <Stack.Screen
              name={LandingScreenName}
              component={LandingScreen}
              options={{
                headerShown: false,
              }}
            />
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
}
