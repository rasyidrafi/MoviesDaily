import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { View, StyleSheet, TouchableWithoutFeedback, Text, ActivityIndicator } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

import { orange, white } from "../../helper/Color";

class MoviePlayButton extends Component {
  state = {
    isModalShown: false,
  };

  toggleModal = (param) => {
    this.setState((prevState) => ({ isModalShown: param }));
  };

  renderPlayButton = () => {
    return (
      <TouchableWithoutFeedback onPress={() => this.setState({ isModalShown: true })}>
        <View style={_styles.wrapper}>
          <Icon name={"play"} size={20} color={white} style={_styles.icon} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  onPressPlay = (key) => {
    this.toggleModal(false);
    this.props.navigation.navigate("Webview", { id: key });
  };

  videoItem = () => {
    const results = this.props.videoData.results.slice(0, 7);
    return results.map((item) => (
      <View key={item.key} style={{ marginBottom: 8, flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ width: "80%" }}>
          <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 14 }}>{item.name}</Text>
          <Text style={{ fontFamily: "Montserrat-Light", fontSize: 12 }}>{item.type}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => this.onPressPlay(item.key)}>
          <View style={{ alignSelf: "flex-start", borderRadius: 6, overflow: "hidden" }}>
            <Text style={_styles.playText}>Play</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    ));
  };

  renderModal = () => {
    const { results = [] } = this.props.videoData;

    return (
      <Modal
        isVisible={this.state.isModalShown}
        style={{ justifyContent: "flex-end", margin: 0 }}
        swipeDirection={"down"}
        onBackButtonPress={() => this.setState({ isModalShown: false })}
        onBackdropPress={(e) => this.setState({ isModalShown: false })}
        onSwipeComplete={() => this.setState({ isModalShown: false })}
      >
        <View style={_styles.modalStyle}>
          <View style={_styles.bar} />
          <Text style={_styles.videoText}>Videos</Text>
          {results.length != 0 && this.videoItem()}
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <>
        {this.renderPlayButton()}
        {this.renderModal()}
      </>
    );
  }
}

export default MoviePlayButton;

MoviePlayButton.propTypes = {
  videoData: PropTypes.object,
  navigation: PropTypes.object,
};

const _styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    right: 0,
    top: -30,
    marginRight: 32,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: orange,
    justifyContent: "center",
  },

  icon: {
    alignSelf: "center",
  },

  modalStyle: {
    backgroundColor: white,
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 48,
    minHeight: "40%",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },

  bar: {
    width: 40,
    height: 5,
    backgroundColor: orange,
    marginBottom: 24,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
  },

  playText: {
    fontFamily: "Montserrat-SemiBold",
    textAlign: "right",
    backgroundColor: orange,
    color: white,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 14,
  },

  videoText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
    paddingBottom: 12,
  },
});
