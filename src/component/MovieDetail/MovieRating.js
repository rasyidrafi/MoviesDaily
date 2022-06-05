import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import { white, yellow } from "../../helper/Color";

import Icon from "react-native-vector-icons/FontAwesome";

const MovieRating = ({ rating, style, textColor, runtime }) => {
  const Runtime = () => {
    if (!runtime) return null;
    const totalMinutes = runtime;

    // render total minutes to format 2h 30m
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const hoursString = hours > 0 ? `${hours}h ` : "";
    const minutesString = minutes > 0 ? `${minutes}m` : "";

    return (
      <Text>
        | {hoursString}
        {minutesString}
      </Text>
    );
  };

  const Rating = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Star color={white} />
        <Star color={yellow} rating={rating} />
        <Text style={[_styles.ratingText, { color: textColor }]}>
          {rating.toFixed(1)} <Runtime />
        </Text>
      </View>
    );
  };

  const Star = ({ color, rating = 10 }) => {
    const items = [];
    for (let i = 1; i <= 5; i++) {
      items.push(<Icon key={i} name="star" size={15} color={color} />);
    }
    return <View style={[_styles.star, { width: 75 * (rating / 10) }]}>{items}</View>;
  };

  return <View style={{ flexDirection: "row", ...style }}>{rating !== 0 && <Rating />}</View>;
};

export default MovieRating;

MovieRating.propTypes = {
  rating: PropTypes.number,
  style: PropTypes.object,
  textColor: PropTypes.string,
  color: PropTypes.string,
  runtime: PropTypes.number,
};

MovieRating.defaultProps = {
  textColor: white,
};

const _styles = StyleSheet.create({
  star: {
    position: "absolute",
    flexDirection: "row",
    overflow: "hidden",
  },

  ratingText: {
    color: white,
    marginLeft: 75,
    fontFamily: "Montserrat-Medium",
  },
});
