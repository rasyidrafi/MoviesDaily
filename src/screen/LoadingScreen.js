import React from "react";
import { ActivityIndicator, View } from "react-native";
import { orange } from "../helper/Color";

const LoadingScreen = ({ show = true }) => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size="large" color={orange} />
  </View>
);

export default LoadingScreen;
