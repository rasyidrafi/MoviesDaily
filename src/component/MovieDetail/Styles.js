import { StyleSheet } from "react-native";
import { gray } from "../../helper/Color";

export const Styles = StyleSheet.create({
  titleText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    marginBottom: 4,
    marginTop: 24,
  },

  textOverview: {
    fontFamily: "Montserrat-Regular",
  },

  bottomText: {
    width: 75,
    fontFamily: "Montserrat-Light",
    fontSize: 14,
    marginTop: 4,
  },

  castImageContainer: {
    overflow: "hidden",
    height: 85,
    width: 85,
    borderRadius: 10,
    // marginRight: 8,
    backgroundColor: gray,
  },

  imagePlaceholder: {
    backgroundColor: gray,
  },

  castImage: {
    width: 85,
    height: 85,
  },

  movieImages: {
    height: 100,
    borderRadius: 10,
  },

  movieRecommImages: {
    height: 150,
    width: 100,
    borderRadius: 10,
  },
});
