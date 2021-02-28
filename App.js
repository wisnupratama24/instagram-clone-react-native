import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useFonts } from "expo-font";

import { LoadingScreen, AddScreen } from "./screen";
import MainScreen from "./screen/Main";
import { AddScreenName, MainScreenName } from "./constants/routes";
import { View } from "react-native";

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
import Landing from "./screen/auth/Landing";

const store = createStore(rootReducers, applyMiddleware(thunk));

export default function App() {
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
    const Stack = createStackNavigator();

    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <View style={globalStyles.global}>
              <Stack.Navigator>
                <Stack.Screen
                  name={MainScreenName}
                  component={MainScreen}
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name={AddScreenName}
                  component={AddScreen}
                  options={{
                    title: "Overview",
                    headerStyle: {
                      backgroundColor: "#fff",
                    },
                  }}
                />
              </Stack.Navigator>
            </View>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }

  return <Landing />;
}
