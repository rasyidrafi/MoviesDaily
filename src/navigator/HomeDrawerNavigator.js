import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "react-native";

import { white, orange } from "../helper/Color";
import TVShowScreen from "../screen/TVShowScreen";
import MovieScreen from "../screen/MovieScreen";

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Movies"
      drawerType={"front"}
      drawerStyle={{ width: "50%", backgroundColor: "rgba(0,0,0, 0.8)" }}
      drawerContentOptions={{
        activeBackgroundColor: "transparent",
        activeTintColor: orange,
        inactiveTintColor: white,
      }}
    >
      <Drawer.Screen
        name="Movies"
        component={MovieScreen}
        options={{
          drawerLabel: ({ color, focused }) => CustomDrawerStyle(color, focused, "Movies"),
        }}
      />
      <Drawer.Screen
        name="TV Show"
        component={TVShowScreen}
        options={{
          drawerLabel: ({ color, focused }) => CustomDrawerStyle(color, focused, "TV Shows"),
        }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerStyle = (color, focused, title) => {
  return (
    <Text
      style={{
        fontSize: focused ? 20 : 16,
        fontWeight: null,
        color: color,
        fontFamily: focused ? "Montserrat-Bold" : "Montserrat-Light",
      }}
    >
      {title}
    </Text>
  );
};

export default HomeDrawerNavigator;
