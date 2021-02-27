import React, { useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import {
  FeedScreenName,
  ProfileScreenName,
  AddScreenName,
} from "../constants/routes";
import {
  AddScreen,
  EmptyScreen,
  FeedScreen,
  LoadingScreen,
  ProfileScreen,
} from ".";

import Landing from "./auth/Landing";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";
import { color } from "../constants/color";

const Tab = createMaterialBottomTabNavigator();

const Main = ({ fetchUser, currentUser }) => {
  useEffect(() => {
    fetchUser();
  }, [currentUser?.name]);

  if (currentUser === undefined) {
    return <Landing />;
  }

  return (
    <Tab.Navigator
      labeled={false}
      barStyle={{ backgroundColor: color.gray[100] }}>
      <Tab.Screen
        name={FeedScreenName}
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name='Add Container'
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(AddScreenName);
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='plus-box' color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name={ProfileScreenName}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-circle'
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
