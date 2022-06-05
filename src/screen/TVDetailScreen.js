import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native";

import { requestTvDetailScreen } from "../api/api";

import MovieBackdrop from "../component/MovieDetail/MovieBackdrop";
import MovieOverview from "../component/MovieDetail/MovieOverview";
import MovieImages from "../component/MovieDetail/MovieImages";
import MovieCast from "../component/MovieDetail/MovieCast";
import MovieRecommendations from "../component/MovieDetail/MovieRecommendations";
import MovieGenres from "../component/MovieDetail/MovieGenres";
import MovieRating from "../component/MovieDetail/MovieRating";
import MoviePlayButton from "../component/MovieDetail/MoviePlayButton";
import MovieTitle from "../component/MovieDetail/MovieTitle";
import { black, white } from "../helper/Color";
import BackIcon from "../component/Utils/BackIcon";
import MovieSeason from "../component/MovieDetail/MovieSeason";
import LoadingScreen from "./LoadingScreen";
import MovieTagline from "../component/MovieDetail/MovieTagline";

import { Styles as StylesRoot } from "../component/MovieDetail/Styles";

class TVDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: {},
      credit: {},
      images: {},
      videos: {},
      recommendations: {},
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.requestInfoDetail();
  }

  requestInfoDetail = async () => {
    const { id } = this.props.route.params;
    console.log("tv id", id);

    await requestTvDetailScreen(id, this.callbackRequest);
  };

  callbackRequest = (response) => {
    const [movieData, credit, images, videos, recommendations] = response;
    this.setState({ movieData, credit, images, videos, recommendations, isLoaded: true });
  };

  movieInfoGeneral = () => {
    const { movieData, isLoaded } = this.state;
    return (
      <MovieBackdrop backdrop={movieData.backdrop_path}>
        {isLoaded && (
          <View>
            <MovieTitle title={movieData.name} />
            <MovieTagline tagline={movieData.tagline} />
            <MovieRating rating={movieData.vote_average} runtime={movieData.runtime} />
          </View>
        )}
      </MovieBackdrop>
    );
  };

  movieInfoDetail = () => {
    const { movieData, credit, isLoaded, images, recommendations, videos } = this.state;
    const { navigation } = this.props;
    return (
      <View style={Styles.movieDetailWrapper}>
        <View style={Styles.movieDetail}>
          {isLoaded && (
            <View>
              <MovieGenres genre={movieData.genres} />
              <MovieOverview overview={movieData.overview} />
              <MovieCast credit={credit} />
              <MovieSeason seasonData={movieData.seasons} navigation={navigation} movieid={movieData.id} />
              <MovieImages images={images} />
              <MovieRecommendations recommendations={recommendations} navigation={navigation} />
            </View>
          )}
        </View>
        <MoviePlayButton videoData={videos} navigation={navigation} />
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <>
        {this.state.isLoaded ? (
          <View style={{ flex: 1, backgroundColor: white }}>
            <ScrollView style={Styles.scrollview} contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
              {/* <StatusBar translucent backgroundColor={"transparent"} /> */}
              {this.movieInfoGeneral()}
              {this.movieInfoDetail()}
            </ScrollView>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <View
                style={{
                  position: "absolute",
                  top: 30,
                  left: 10,
                  height: 40,
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(252,107,2,0.8)",
                  borderRadius: 50,
                }}
              >
                <BackIcon navigation={navigation} color={white} />
                <Text
                  style={[
                    StylesRoot.bottomText,
                    { color: "white", marginTop: 0, width: 50, fontFamily: "Montserrat-SemiBold" },
                  ]}
                >
                  Back
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <LoadingScreen />
        )}
      </>
    );
  }
}

export default TVDetailScreen;

TVDetailScreen.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.object,
};

const Styles = StyleSheet.create({
  scrollview: {
    backgroundColor: white,
    flexGrow: 1,
  },

  movieDetailWrapper: {
    flex: 1,
    backgroundColor: black,
  },

  movieDetail: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: white,
  },
});
