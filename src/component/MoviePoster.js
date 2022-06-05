import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import FastImage from "react-native-fast-image";

import { getImageUrl } from "../api/url";
import { gray } from "../helper/Color";
import NoImagePoster from "../assets/img/no-image-poster.png";

const MoviePoster = ({ item, navigation, height, width, type }) => {
  const imageUrl = item.poster_path == null ? NoImagePoster : getImageUrl(item.poster_path);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (type === "tv") {
          navigation.navigate("TVDetail", { id: item.id });
        } else {
          navigation.navigate("MovieDetail", { id: item.id });
        }
      }}
    >
      <View style={[styles.imageContainer, { height, width }]}>
        <FastImage style={{ height, width }} resizeMode="cover" source={imageUrl} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MoviePoster;

MoviePoster.propTypes = {
  item: PropTypes.any,
  height: PropTypes.number,
  width: PropTypes.number,
  navigation: PropTypes.any,
  type: PropTypes.oneOf(["tv", "movie"]),
};

MoviePoster.defaultProps = {
  height: 180,
  width: 120,
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: gray,
    borderRadius: 12,
    overflow: "hidden",
  },
});
