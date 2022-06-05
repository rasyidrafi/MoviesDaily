import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { white, orange } from "../../helper/Color";
import { Styles } from "./Styles";

const MovieTagline = ({ tagline }) => {
  if (!tagline) return null;
  return (
    <View>
      <Text
        numberOfLines={2}
        style={{ fontFamily: "Montserrat-Regular", fontSize: 14, color: white, width: "80%", marginBottom: 8 }}
      >
        {tagline}
      </Text>
    </View>
  );
};

export default MovieTagline;

MovieTagline.propTypes = {
  title: PropTypes.string,
};
