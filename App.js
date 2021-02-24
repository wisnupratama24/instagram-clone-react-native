import React, { useEffect, useState } from "react";

import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LandingScreen, LoadingScreen, RegisterScreen } from "./screen";
import { LandingScreenName, RegisterScreenName } from "./constants/routes";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";

import * as firebase from "firebase";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";

const firebaseConfig = {
  apiKey: `${API_KEY}`,
  authDomain: `${AUTH_DOMAIN}`,
  databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
  projectId: `${PROJECT_ID}`,
  storageBucket: `${STORAGE_BUCKET}`,
  messagingSenderId: `${MESSAGING_SENDER_ID}`,
  appId: `${APP_ID}`,
};

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    console.error("error", err.stack);
  }
}
export default function App() {
  const Stack = createStackNavigator();
  const [user, setUser] = useState({
    loggedIn: false,
  });

  const [loadFonts] = useFonts({
    "GrandHotel-Regular": require("./assets/fonts/GrandHotel-Regular.ttf"),
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({
          loggedIn: true,
        });
      } else {
        setUser({
          loggedIn: false,
        });
      }
    });
  }, []);

  if (!loadFonts) {
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
