import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { white, orange } from "../../helper/Color";

const MovieTitle = ({ title }) => {
  return (
    <View>
      <Text numberOfLines={2} style={{ fontFamily: "Montserrat-Bold", fontSize: 24, color: white }}>
        {title}
      </Text>
      <View style={{ width: 30, height: 5, backgroundColor: orange, marginTop: 4, marginBottom: 8, borderRadius: 50 }} />
    </View>
  );
};

export default MovieTitle;

MovieTitle.propTypes = {
  title: PropTypes.string,
};
