import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, TextInput, View, StyleSheet } from "react-native";

import Screen from "../component/Screen";
import { requestSearchMovie, requestSearchTv } from "../api/api";
import { orange, lightGray } from "../helper/Color";
import MovieList from "../component/MovieList";

import Icon from "react-native-vector-icons/Ionicons";
import BackIcon from "../component/Utils/BackIcon";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {},
      param: "",
      isLoading: false,
    };
  }

  renderHeaderTitle = () => {
    const { type } = this.props.route.params;
    const { navigation } = this.props;
    const title = type === "tv" ? "TV Shows" : "Movies";

    return (
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} navigation={navigation} />
          <Text style={_styles.headerTitle}>{`Search ${title}`}</Text>
          <View style={{ flex: 1, paddingRight: 12 }}></View>
        </View>
        <View style={_styles.titleBar} />
        <Text style={_styles.subTitle}>
          {`We'll help you find your favorite ${title.toLowerCase()}. Discover wonderful ${title.toLowerCase()}.`}
        </Text>
      </View>
    );
  };

  renderSearchText = () => {
    const { param } = this.state;
    const randomPlaceholder = ["Avengers: Endgame", "The Irishman", "Titanic", "Interstellar"];
    const placeholder = randomPlaceholder[Math.floor(Math.random() * randomPlaceholder.length)];
    const searchRef = React.createRef();

    return (
      <View style={_styles.searchContainer}>
        <View style={{ alignSelf: "center", flex: 1, justifyContent: "center" }}>
          <TextInput
            style={_styles.searchInput}
            placeholder={placeholder}
            value={param}
            onSubmitEditing={() => {
              if (!param) return;
              this.requestMovie(this.state.param);
            }}
            onChangeText={(text) => this.setState({ param: text })}
            returnKeyType={"search"}
            autoCorrect={false}
            ref={searchRef}
          />
        </View>
        <Icon
          name={"close-outline"}
          onPress={() => {
            this.setState({ param: "" });
            searchRef.current.focus();
          }}
          size={28}
          style={{
            paddingVertical: 8,
            paddingLeft: 10,
            paddingRight: 5,
            backgroundColor: "#e9e9e9",
          }}
        />
        <Icon
          name={"search"}
          onPress={() => {
            if (!param) return;
            this.requestMovie(this.state.param);
            searchRef.current.blur();
          }}
          size={20}
          style={{
            padding: 12,
            paddingLeft: 5,
            backgroundColor: "#e9e9e9",
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
          }}
        />
      </View>
    );
  };

  renderListMovies = () => {
    const { results = [] } = this.state.search;
    const { isLoading } = this.state;
    const { type } = this.props.route.params;
    const { navigation } = this.props;
    return (
      <>
        {isLoading || results.length == 0 ? (
          <View>
            <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 16, textAlign: "center", marginTop: 14 }}>
              {!isLoading ? "No result found" : "Loading..."}
            </Text>
          </View>
        ) : (
          <MovieList results={results} navigation={navigation} type={type} />
        )}
      </>
    );
  };

  render() {
    return (
      <Screen>
        {this.renderHeaderTitle()}
        {this.renderSearchText()}
        {this.renderListMovies()}
      </Screen>
    );
  }

  renderMovies = () => {
    const { results = [] } = this.state.search;
    return results.map((item) => <Text key={item.id}>{item.title}</Text>);
  };

  requestMovie = async (text) => {
    if (this.state.isLoading) return;
    const { type } = this.props.route.params;
    this.setState({ isLoading: true });
    const requestSearch = type === "tv" ? requestSearchTv : requestSearchMovie;
    if (text !== "") {
      const search = await requestSearch(text);
      if (search) this.setState({ search, isLoading: false });
    }
  };
}

export default SearchScreen;

SearchScreen.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.object,
};

const _styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    flex: 8,
    textAlign: "center",
    alignSelf: "center",
  },

  titleBar: {
    width: 40,
    height: 5,
    backgroundColor: orange,
    marginTop: 4,
    marginBottom: 12,
    alignSelf: "center",
  },

  subTitle: {
    margin: 16,
    marginTop: 5,
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center",
    width: "70%",
  },

  searchContainer: {
    marginHorizontal: 16,
    backgroundColor: lightGray,
    borderRadius: 24,
    flexDirection: "row",
  },

  searchInput: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    flex: 1,
    marginLeft: 12,
  },
});
