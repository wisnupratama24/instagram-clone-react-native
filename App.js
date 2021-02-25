import React, { useEffect, useState } from "react";

import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { LoadingScreen, RegisterScreen, MainScreen } from "./screen";
import { RegisterScreenName } from "./constants/routes";
import { View, TouchableWithoutFeedback, Keyboard, Text } from "react-native";

import * as firebase from "firebase";
import { firebaseConfig } from "./config/firebase";

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    console.error("error", err.stack);
  }
}

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducers } from "./redux/reducers";
import thunk from "redux-thunk";
import { globalStyles } from "./assets";

const store = createStore(rootReducers, applyMiddleware(thunk));

export default function App() {
  const Stack = createStackNavigator();
  const [loggedIn, setloggedIn] = useState(false);

  const [loadFonts] = useFonts({
    "GrandHotel-Regular": require("./assets/fonts/GrandHotel-Regular.ttf"),
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setloggedIn(true);
      } else {
        setloggedIn(false);
      }
    });
  }, []);

  if (!loadFonts) {
    return <LoadingScreen />;
  }

  if (loggedIn) {
    return (
      <Provider store={store}>
        <View style={globalStyles.global}>
          <MainScreen />
        </View>
      </Provider>
    );
  }

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
}
